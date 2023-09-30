const express = require('express');
const router = express.Router();
const ShareService = require('../services/ShareService');
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", (req, res) => {
    ShareService.createShare(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/", (req, res) => {
    ShareService.getShares()
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/:id", (req, res) => {
    ShareService.getShare(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.put("/:id", (req, res) => {
    ShareService.updateShare(req.params.id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.delete("/:id", (req, res) => {
    ShareService.deleteShare(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

module.exports = router;