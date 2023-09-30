const User = require('../models/user');
const bcrypt = require('bcrypt');
const mapper = require('../mappers/userInfoMapper');

const functions = {
    createUser : async (userInfo) => {
        try {
            const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
            // Hash the plain password
            userInfo.password = await bcrypt.hash(userInfo.password, saltRounds);
            let createdUser = await User.create(userInfo);
            return {
                newUser: mapper(createdUser)
            };
        } catch (err) {
            throw Error(err);
        }
    }, 
    getUsers: async () => {
        try {
            const users = await User.findAndCountAll({
                attributes: ['id','username', 'email','balance','createdAt','updatedAt'],
            });
            return {
                users: users
            };
        } catch (err) {
            throw Error(err);
        }
    },
    getUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            return mapper(user);
        } catch (err) {
            throw Error(err);
        }
    },
    updateUser: async (id, newUserInfo) => {
        try {
            const user = await User.findByPk(id);
            if(!user) {
                throw Error("User is not exist");
            }
            if(newUserInfo.password) {
                const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
                // Hash the plain password
                newUserInfo.password = await bcrypt.hash(newUserInfo.password, saltRounds);
            }

            await User.update(newUserInfo, { where: { id: id } });

            return {result: "Successfully updated."};
        } catch (err) {
            throw Error(err);
        }
    },
    deleteUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            if(!user) {
                throw Error("User is not exist");
            }
            await User.destroy({ where: { id: id }});
            return {result: "Successfully deleted."};
        } catch (err) {
            throw Error(err);
        }
    }
};

module.exports = functions;