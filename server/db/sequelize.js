const Sequelize = require('sequelize');

const sequelize = new Sequelize('dashboard', 'postgres', 'javascript6', {
  host: 'localhost',
  dialect: 'postgres',
})

const Customer = require('../models/Customer')(sequelize);
const Address = require('../models/Address')(sequelize, Customer);

Customer.hasMany(Address, {foreignKey: 'customer_id'});
Address.belongsTo(Customer, {foreignKey: 'customer_id'});

module.exports = {
  sequelize,
  Customer,
  Address
};
