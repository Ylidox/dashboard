const Router = require('express');
const router = new Router();
const addressController = require('../controllers/AddressController');

router.get('/get', addressController.getAddresses);
router.put('/change/:id', addressController.changeAddress);
router.post('/add', addressController.addAddress);
router.delete('/delete/:id', addressController.deleteAddress);

module.exports = router;