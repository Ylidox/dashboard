let {sequelize, Address, QueryTypes} = require('../db/sequelize');

class AddressController{
  async getAddresses(req, res){
    try{
      let {customer_id} = req.query;
      let result = await sequelize.query(`select * from address where customer_id = ${customer_id}`, {
        raw: false,
        type: QueryTypes.SELECT,
      });
      res.json(result);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
  }
  async addAddress(req, res){
    try{
      let new_addres = req.body;
      await Customer.create(customer);
      res.json({message: 'Адрес добавлен'});
    }catch(e){
      console.log(e.message);
      res.status(200).json(e.message);
    }
  }
  async changeAddress(req, res){
    try{
      let address = req.body;
      await Address.update(
        address, 
        {where: {
          id: address.id
        }}
      );
      res.status(200).json({message: 'Адрес обновлен'});
    }catch(e){
      console.log(e.message);
      res.status(404).json({message:'Адрес не обновлен'});
    }
  }
  async deleteAddress(req, res){
    try{
      let {id} = req.params;
      await Address.destroy({where: {id}});
      res.status(200).json({message: 'Адрес удален'})
    }catch(e){
      console.log(e);
      res.status(404).json({message:'Адрес не удален'});
    }
  }
}

module.exports = new AddressController();