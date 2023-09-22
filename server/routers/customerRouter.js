const Router = require('express');
const router = new Router();
const customerController = require('../controllers/CustomerController');

router.get('/get', customerController.getCustomersByPage);
router.get('/get/expenses', customerController.getCustomersOnExpenses)
router.get('/get/address', customerController.getCustomersByAddressesCount);
router.get('/get/:id', customerController.getCustomerById);
router.put('/change', customerController.changeCustomer);
router.post('/add', customerController.addCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);

module.exports = router;

