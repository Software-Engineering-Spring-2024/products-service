
const supabase = require("../model");
const {addProduct} = require("../services/addProduct");
const {INVALID_REQUEST, UNKNOWN_ERROR} = require("../constants/constants");
const {getCategories} = require("../services/getCategories");
const {getProductList} = require("../services/getProductList");
const {getProductById} = require("../services/getProductById");
const {setProductStatus} = require("../services/setProductStatus")
const {getProductByUserId} = require("../services/getProductByUserId");
const {getUnApprovedProductList} = require("../services/getUnApprovedProductList");
const {approveProduct} = require("../services/approveProduct");
const {rejectProduct} = require("../services/rejectProduct");
const {getLatestProductsList} = require("../services/getLatestProductsList")

const addProductController = async(req,res) => {

        const request = req.body;
        if(!request){res.status(400).send({code:400,message:INVALID_REQUEST})}
        try{
                const responseData = await addProduct(request);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const getCategoriesController = async(req,res) => {
        try{
                const responseData = await getCategories();
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const productListController = async(req,res) => {
        try{
                const filters = req.query
                // console.log('productListController filters', filters)
                const responseData = await getProductList(filters);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const productByIdController = async(req,res) => {
        const params = req.query;
        // if(!params && !params.productId){res.status(400).send({code:400,message:INVALID_REQUEST})}
        try{
                const responseData = await getProductById(params.productId);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const productActiveStatusController = async(req,res) => {
        try{
                const responseData = await setProductStatus(req.query.productId,req.query.status);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const productByUserIdController = async(req,res) => {
        const params = req.query;
        if(!params && !params.userId && (params.userId !== ''))
        {
                return res.status(400).send({code:400,message:INVALID_REQUEST})
        }
        try{
                const responseData = await getProductByUserId(params.userId);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }

}

const unapprovedProductListController = async(req,res) => {
        try{
                const responseData = await getUnApprovedProductList();
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const approveProductController = async(req,res) => {
        const params = req.query;
        if(!params && !params.productId && (params.productId !== '') && !params.city && (params.city !== ''))
        {
                return res.status(400).send({code:400,message:INVALID_REQUEST})
        }
        try{
                const responseData = await approveProduct(params.productId,params.city);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}
const rejectProductController = async(req,res) => {
        const params = req.query;
        if(!params && !params.userId && (params.userId !== ''))
        {
                return res.status(400).send({code:400,message:INVALID_REQUEST})
        }
        try{
                const responseData = await rejectProduct(params.userId);
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}

const latestProductListController = async(req, res) => {
        try{
                const responseData = await getLatestProductsList();
                res.status(responseData.code).send(responseData);
        }
        catch (e) {
                console.log(e);
                res.status(500).send(
                    {code:500,message:UNKNOWN_ERROR}
                );
        }
}
module.exports = {addProductController,getCategoriesController,productListController,productByIdController,productActiveStatusController,productByUserIdController,unapprovedProductListController,approveProductController,rejectProductController, latestProductListController}