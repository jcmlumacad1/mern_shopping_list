const Sequelize = require('sequelize');
const db = require('../config/database');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Item;