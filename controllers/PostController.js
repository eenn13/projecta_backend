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


module.exports = router;