const express = require("express");
const init = require('./init');
const app = express();
const cors = require("cors");
const port = require("./config").PORT;


init();
app.use(cors());
app.use('/user', require('./controllers/UserController'));
app.use('/share', require('./controllers/ShareController'));
app.use('/transaction', require('./controllers/TransactionController'));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});