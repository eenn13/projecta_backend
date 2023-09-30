const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Log = sequelize.define('Log', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shareId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.ENUM('buy','sell','set'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
});

module.exports = Log;
