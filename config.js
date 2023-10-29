const { Sequelize } = require('sequelize');
const DATABASE = "projecta_database";
const USER = "projecta_database_user";
const PASSWORD = "n1f4dmQddFWkzs5SzsX0H8YfRSTk3miU";
const HOST = "dpg-ckulm3ramefc73agr1eg-a.frankfurt-postgres.render.com";
const PORT = 5432;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'postgres',
    ssl: true, // Enable SSL/TLS
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Use for self-signed certificates
    },
  },
});

module.exports = sequelize;