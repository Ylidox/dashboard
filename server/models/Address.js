const Sequelize = require('sequelize');

module.exports = function(sequelize, Customer){
  return sequelize.define('address', {
    address_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: 'customer_id'
      }
    },
    zipcode: {
      type: Sequelize.INTEGER,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    county: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    house: {
      type: Sequelize.INTEGER,
    },
    apartment: {
      type: Sequelize.INTEGER,
    },
    addition_date: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'address',
    timestamps: false,
  });
}