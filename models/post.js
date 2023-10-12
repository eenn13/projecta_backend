const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    firstNumber: {
        type: Number,
        default: 0
    },
    secondNumber: {
        type: Number,
        default: 0
    },
    result: {
        type: Number,
        default: 0
    },
    userName: String,
    sentence: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;