class CustomerController{
  async getCustomer(req, res){}
  async addCustomer(req, res){
    console.log('add')
    res.status(200).json({message:'Пользователь добавлен'})
  }
  async changeCustomer(req, res){}
  async deleteCustomer(req, res){}
}

module.exports = new CustomerController();