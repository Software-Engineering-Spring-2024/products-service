const {INVALID_REQUEST, UNKNOWN_ERROR} = require("../constants/constants");
const {addProduct} = require("../services/addProduct");
const bookProduct = require("../services/bookProduct");
const {getProductById} = require("../services/getProductById");
const {getProductByUserId} = require("../services/getProductByUserId");
const getRentedProductByUserId = require("../services/getRentedProductByUserId");
const reserveProduct = async(req,res) => {
    const request = req.body;
    if(!request){res.status(400).send({code:400,message:INVALID_REQUEST})}
    try{
        const responseData = await bookProduct(request);
        res.status(responseData.code).send(responseData);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(
            {code:500,message:UNKNOWN_ERROR}
        );
    }
}

const rentedProductByUserIdController = async(req,res) => {
    const params = req.query;
    if(!params && !params.userId && (params.userId !== ''))
    {
        return res.status(400).send({code:400,message:INVALID_REQUEST})
    }
    try{
        const responseData = await getRentedProductByUserId(params.userId);
        res.status(responseData.code).send(responseData);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(
            {code:500,message:UNKNOWN_ERROR}
        );
    }

}

module.exports = {reserveProduct,rentedProductByUserIdController}