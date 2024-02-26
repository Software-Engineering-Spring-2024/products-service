
const supabase = require("../model");
const {addProduct} = require("../services/addProduct");
const {INVALID_REQUEST, UNKNOWN_ERROR} = require("../constants/constants");
const {getCategories} = require("../services/getCategories");
const {getProductList} = require("../services/getProductList");
const {getProductById} = require("../services/getProductById");
const {setProductStatus} = require("../services/setProductStatus")
const {getProductByUserId} = require("../services/getProductByUserId");

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
                const responseData = await getProductList();
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
        // const params = req.query;
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

module.exports = {addProductController,getCategoriesController,productListController,productByIdController,productActiveStatusController,productByUserIdController}