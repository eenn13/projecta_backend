const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", (req, res) => {
    UserService.createUser(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/", (req, res) => {
    UserService.getUsers()
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.get("/:id", (req, res) => {
    UserService.getUser(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.put("/:id", (req, res) => {
    UserService.updateUser(req.params.id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

router.delete("/:id", (req, res) => {
    UserService.deleteUser(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message, stack: err.stack });
    });
});

module.exports = router;