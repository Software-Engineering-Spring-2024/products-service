const express = require('express');
const {unapprovedProductListController, approveProductController, rejectProductController, getStoreLocationsController} = require("../controller/productsController");

const router = express.Router();
//Admin Dashboard
router.get('/getUnApprovedProducts',unapprovedProductListController)
router.get(`/approve`,approveProductController)
router.get(`/reject`,rejectProductController)
router.get('/getStoreLocations', getStoreLocationsController)

module.exports = router;