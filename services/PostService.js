const Post = require('../models/post');

const functions = {
    createPost : async (postInfo) => {
        try {
            const createdPost = await Post.create(postInfo);
            return {
                newPost: createdPost
            };
        } catch (err) {
            throw Error(err);
        }
    },
    getPosts: async () => {
        try {
            const posts = await Post.findAndCountAll();
            return posts;
        } catch (err) {
            throw Error(err);
        }
    },
    deletePost: async (id) => {
        try {
            const share = await Post.findByPk(id);
            if(!share) {
                throw Error("Post is not exist");
            }
            await Post.destroy({ where: { id: id }});
            return {result: "Successfully deleted."};
        } catch (err) {
            throw Error(err);
        }
    }
};

module.exports = functions;