const express = require('express');
const router = express.Router();
const TransactionService = require('../services/TransactionService');
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", (req, res) => {
    TransactionService.createTransaction(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/", (req, res) => {
    TransactionService.getTransactions()
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/:transaction_id", (req, res) => {
    TransactionService.getTransaction(req.params.transaction_id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.put("/:transaction_id", (req, res) => {
    TransactionService.updateTransaction(req.params.transaction_id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.post("/buy/:userId/:shareId", (req, res) => {
    TransactionService.buyShare(req.params.userId, req.params.shareId)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.post("/sell/:userId/:shareId", (req, res) => {
    TransactionService.sellShare(req.params.userId, req.params.shareId)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.delete("/:transaction_id", (req, res) => {
    TransactionService.deleteTransaction(req.params.transaction_id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

module.exports = router;