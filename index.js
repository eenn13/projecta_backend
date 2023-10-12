const express = require("express");
const { default: mongoose } = require('mongoose');
const init = require('./init');
const app = express();
const cors = require("cors");
const CONNECTION_URL = "mongodb+srv://jorcus:jorcus123@cluster0.hqxwhvy.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;


//init();
app.use(cors());
app.use('/post', require('./controllers/PostController'));
// app.use('/user', require('./controllers/UserController'));
// app.use('/share', require('./controllers/ShareController'));
// app.use('/transaction', require('./controllers/TransactionController'));

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
}))
.catch((err) => console.log(err.message));
