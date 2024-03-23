const supabase = require("../model");
const {CATEGORIES, SUCCESSFUL, DATABASE_ERROR, UNKNOWN_ERROR, PRODUCTS} = require("../constants/constants");
const getProductList = async(filters) => {
    try {
        let response;
        let query = supabase.from(PRODUCTS)
        .select(`
            *,
            owner:user-details (
              user_id,
              firstName,
              lastName,
              email,
              mobile
            ) as owner
          `)
        .eq('active',true)
        .eq('approved',true)
        .eq('status','Active')
        .order('created_at', { ascending: filters?.sortBy == 'newest' ? false : true })

        if(filters?.categories?.length > 0) {
            query = query.in('category_id', filters.categories)
        }

        const {data, error,status,statusText} = await query
        // console.log(data)
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