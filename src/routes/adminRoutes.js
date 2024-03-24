const express = require('express');
const {unapprovedProductListController, approveProductController, rejectProductController} = require("../controller/productsController");

const router = express.Router();
//Admin Dashboard
router.get('/getUnApprovedProducts',unapprovedProductListController)
router.get(`/approve`,approveProductController)
router.get(`/reject`,rejectProductController)

module.exports = router;