const UserService = require('./UserService');
const Share = require('../models/share');

const functions = {
    createShare : async (shareInfo) => {
        try {
            const isUserExist = await UserService.getUser(shareInfo.ownerId);
            if(!isUserExist) {
                throw  Error("User is not exist");
            }
            const createdShare = await Share.create(shareInfo);
            return {
                newShare: createdShare
            };
        } catch (err) {
            throw Error(err);
        }
    }, 
    getShares: async () => {
        try {
            const shares = await Share.findAndCountAll();
            return shares;
        } catch (err) {
            throw Error(err);
        }
    },
    getShare: async (id) => {
        try {
            const share = await Share.findByPk(id);
            return share;
        } catch (err) {
            throw Error(err);
        }
    },
    updateShare: async (id, newShareInfo) => {
        try {
            const user = await UserService.getUser(newShareInfo.ownerId);
            const share = await Share.findByPk(id);
            if(!user) {
                throw Error("User is not exist");
            }
            if(!share){
                throw Error("Share is not exist")
            }

            await Share.update(newShareInfo, { where: { id: id } });

            return {result: "Successfully updated."};
        } catch (err) {
            throw Error(err);
        }
    },
    deleteShare: async (id) => {
        try {
            const share = await Share.findByPk(id);
            if(!share) {
                throw Error("Share is not exist");
            }
            await Share.destroy({ where: { id: id }});
            return {result: "Successfully deleted."};
        } catch (err) {
            throw Error(err);
        }
    }
};

module.exports = functions;