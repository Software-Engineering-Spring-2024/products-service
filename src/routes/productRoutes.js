const express = require('express');
const {addProductController, getCategoriesController, productListController, productByIdController,
     productActiveStatusController, productByUserIdController
} = require("../controller/productsController");
const validateAddProduct = require("../middleware/validateAddProduct");
const validateProductId = require("../middleware/validateProductId");
const verifyProductExists = require("../middleware/verifyProductExists");


const router = express.Router();

//Add Product

router.post('/add-product',validateAddProduct,addProductController);

//Get Products List
router.get('/product-list',productListController);

//get product Details By Id
router.get('/getProductById',validateProductId,productByIdController);
router.get('/getProductsByUserId',productByUserIdController);

//Get Categories List
router.get('/categories',getCategoriesController);

//Disable Product
router.get('/set-active-status',validateProductId,verifyProductExists,productActiveStatusController);
module.exports = router;