const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Post = sequelize.define('Post', {
  firstNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  secondNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  result: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sentence: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Post;
