const { Sequelize } = require('sequelize');
const DATABASE = "eva_exchange";
const USER = "postgres";
const PASSWORD = "qwe123";
const HOST = "localhost";

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'postgres'
});



module.exports = sequelize;