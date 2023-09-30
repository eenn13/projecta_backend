const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Share = sequelize.define('Share', {
  shareName: {
    type: DataTypes.STRING(3),
    allowNull: false,
    validate: {
        isUppercase: true
    }
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: { //latest price in the database will be rate
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
});

module.exports = Share;
