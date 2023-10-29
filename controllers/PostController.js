const express = require('express');
const router = express.Router();
const PostService = require('../services/PostService');
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", (req, res) => {
    PostService.createPost(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/", (req, res) => {
    PostService.getPosts()
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/:id", (req, res) => {
    PostService.getPost(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.put("/:id", (req, res) => {
    PostService.updatePost(req.params.id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.delete("/:id", (req, res) => {
    PostService.deletePost(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

module.exports = router;