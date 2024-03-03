const supabase = require("../model");
const {CATEGORIES, SUCCESSFUL, DATABASE_ERROR, UNKNOWN_ERROR, PRODUCTS} = require("../constants/constants");
const getProductList = async() => {
    try {
        let response;
        const {data, error,status,statusText} = await supabase.from(PRODUCTS)
            .select()
            .eq('active',true);
        console.log(data)
        if(status===200){
            response =  {code:200,data:data,message:SUCCESSFUL};
        }
        else response= {code:500,data:{},message:DATABASE_ERROR}
        return response;
    }
    catch (e){
        console.log(e);
        return {code:500,data:{},message:UNKNOWN_ERROR};
    }
}

module.exports = {getProductList}