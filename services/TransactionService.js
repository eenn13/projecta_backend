const sequelize = require('../config');
const { Sequelize } = require('sequelize');
const Log = require('../models/log');
const UserService = require('./UserService');
const ShareService = require('./ShareService');

const createTransaction = async (transactionInfo) => {
    try {
        const user = await UserService.getUser(transactionInfo.userId);
        const share = await ShareService.getShare(transactionInfo.shareId);
        if(!user) {
            throw Error("User is not exist");
        }
        if(!share){
            throw Error("Share is not exist")
        }
        if(transactionInfo.action == 'set') {
            if(share.ownerId !== user.id) {
                throw Error(`User${user.id} can't set price of share${share.id}!`);
            }

            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            const freshLog = await Log.findOne({
                where: {
                  userId: transactionInfo.userId,
                  shareId: transactionInfo.shareId,
                  action: 'set',
                  createdAt: {
                    [Sequelize.Op.gte]: oneHourAgo,
                  },
                },
            });

            if(freshLog) {
                throw Error(`User${user.id} need to wait 1 hour at least to set price of share${share.id}!`);
            }
        }
        if(transactionInfo.action == 'sell') {
            if(share.ownerId !== user.id) {
                throw Error(`User${user.id} can't sell share${share.id}!`);
            }
        }
        if(transactionInfo.action == 'buy') {
            if(share.ownerId === user.id) {
                throw Error(`User${user.id} can't buy his own share!`);
            }

            const sellRecord = await Log.findOne({ where: { shareId: share.id, action: "sell" }});

            if(!sellRecord) {
                throw Error(`Share${share.id} can't be bought, because there is no sell transaction!`);
            }
        }

        const createdTransaction = await Log.create(transactionInfo);
        return {
            newTransaction: createdTransaction
        };
    } catch (err) {
        throw Error(err);
    }
};

const sellPriceOfShare = async (shareId) => { //The rate = latest price in the database
    try {
        const price = await Log.findOne({
            attributes: ['price'],
            order: [['createdAt', 'DESC']],
            where: { shareId: shareId, action: 'set' }
        })

        return price;

    } catch (err) {
        throw Error(err);
    }
}

const functions = {
    createTransaction: createTransaction, 
    getTransactions: async () => {
        try {
            const transactions = await Log.findAndCountAll();
            return transactions;
        } catch (err) {
            throw Error(err);
        }
    },
    getTransaction: async (id) => {
        try {
            const transaction = await Log.findByPk(id);
            return transaction;
        } catch (err) {
            throw Error(err);
        }
    },
    updateTransaction: async (id, newTransactionInfo) => {
        try {
            const user = await UserService.getUser(newTransactionInfo.userId);
            const share = await ShareService.getShare(newTransactionInfo.shareId);
            if(!user) {
                throw Error("User is not exist");
            }
            if(!share){
                throw Error("Share is not exist")
            }
            if(newTransactionInfo.action == 'set') {
                if(share.ownerId !== user.id) {
                    throw Error(`User${user.id} can't set price of share${share.id}!`);
                }

                const now = new Date();
                const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
                const freshLog = await Log.findOne({
                    where: {
                      userId: newTransactionInfo.userId,
                      shareId: newTransactionInfo.shareId,
                      action: 'set',
                      createdAt: {
                        [Sequelize.Op.gte]: oneHourAgo,
                      },
                    },
                });

                if(freshLog) {
                    throw Error(`User${user.id} need to wait 1 hour at least to set price of share${share.id}!`);
                }
            }
            if(newTransactionInfo.action == 'sell') {
                if(share.ownerId !== user.id) {
                    throw Error(`User${user.id} can't sell share${share.id}!`);
                }
            }
            if(newTransactionInfo.action == 'buy') {
                if(share.ownerId === user.id) {
                    throw Error(`User${user.id} can't buy his own share!`);
                }

                const sellRecord = await Log.findOne({ where: { shareId: share.id, action: "sell" }});

                if(!sellRecord) {
                    throw Error(`Share${share.id} can't be bought, because there is no sell transaction!`);
                }
            }

            await Log.update(newTransactionInfo, { where: { id: id } });

            return { result: "Successfully updated." };

        } catch (err) {
            throw Error(err);
        }
    },
    deleteTransaction: async (id) => {
        try {
            const log = await Log.findByPk(id);
            if(!log) {
                throw Error("Transaction is not exist");
            }

            if(log.action == 'sell'){
                await Log.destroy({ where: { shareId: log.shareId, action: 'buy' }});
            }
            
            await Log.destroy({ where: { id: id }});

            return {result: "Successfully deleted."};

        } catch (err) {
            throw Error(err);
        }
    },
    buyShare: async (buyerId, shareId) => {
        try {
            let buyer = await UserService.getUser(buyerId);
            if(!buyer) {
                throw Error(`Buyer (user${buyerId}) is not exist`);
            }

            const shareAndTransactions = await Log.findAll({
                attributes: ['action', [sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']],
                group: ['action'],
                where: {action: ['sell','buy'], shareId: shareId}
            });
            const resultObject = {};
            
            for (let i = 0; i < shareAndTransactions.length; i++) {
                resultObject[`${shareAndTransactions[i].dataValues.action}`] = parseFloat(shareAndTransactions[i].dataValues.totalPrice);
            }

            const latestPriceOfShareObj = await sellPriceOfShare(shareId);
            const latestPriceOfShare = parseFloat(latestPriceOfShareObj.dataValues.price)
            if(parseFloat(buyer.balance) < latestPriceOfShare) {
                throw Error("Balance is not enough to buy share!");
            }
            if (resultObject.sell <= resultObject.buy + latestPriceOfShare) {
                throw Error("There is no enough sell transaction");
            }
            
            const createdLog = await createTransaction({
                userId: buyerId,
                shareId: shareId,
                action: 'buy',
                price: latestPriceOfShare
            });
            const oldBalance = buyer.balance;
            buyer.balance -= latestPriceOfShare;

            await UserService.updateUser(buyerId, buyer);
            const newBalance = buyer.balance;

            return {
                result: "Buying is successfull!",
                oldBalance,
                price: latestPriceOfShare,
                newBalance,
                data: createdLog
            };

        } catch (err) {
            throw Error(err);
        }
    },
    sellShare: async (sellerId, shareId) => {
        try {
            let seller = await UserService.getUser(sellerId);

            if(!seller) {
                throw Error(`Seller (user${sellerId}) is not exist`);
            }

            const share = await ShareService.getShare(shareId);

            if(!share){
                throw Error(`Share${shareId} is not exist`);
            }

            const createdLog = await createTransaction({
                userId: sellerId,
                shareId: shareId,
                action: 'sell',
                price: share.price
            });

            return {
                result: "Selling transaction is recorded, waiting for buying process!",
                data: createdLog
            };

        } catch (err) {
            throw Error(err);
        }
    },
    sellPriceOfShare: sellPriceOfShare
};

module.exports = functions;