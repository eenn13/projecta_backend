const express = require("express");
const init = require('./init');
const app = express();
const PORT = 3000;
const cors = require("cors");


init();
app.use(cors());
app.use('/user', require('./controllers/UserController'));
app.use('/share', require('./controllers/ShareController'));
app.use('/transaction', require('./controllers/TransactionController'));

app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
})