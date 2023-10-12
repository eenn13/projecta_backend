const UserService = require('./UserService');
const Post = require('../models/post');

const functions = {
    findPost : async (id) => {
        try {
            const post = await Post.find();
            if(!post) {
                throw  Error("User is not exist");
            }
            console.log(post);
            return {
                newShare: createdShare
            };
        } catch (err) {
            //res.status(404).json({ message: err.message});
            throw Error(err);
        }
    },
    createPost: async(post) => {
        const newPost = new Post(post);

        try {
            await newPost.save();

            return newPost;
        }
        catch(error) {
            throw Error(error);
        }
    }
};

module.exports = functions;