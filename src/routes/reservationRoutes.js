const express = require('express');
const {reserveProduct, rentedProductByUserIdController} = require("../controller/reservationController");
const {productByUserIdController} = require("../controller/productsController");

const router = express.Router();
//Admin Dashboard
router.post('/reserve',reserveProduct)

router.get('/getRentedProductsByUserId',rentedProductByUserIdController);

module.exports = router;