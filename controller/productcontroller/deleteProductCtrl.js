const Products = require("../../models/productModule");

const deleteProduct = async(req,res)=>{
    try {
        const {product_id}=req.params;
        const product = await Products.findOne({product_id})
        if(!product){
            return res.status(400).json({msg:"product not found"})
        }
         await Products.deleteOne({product_id})
    } catch (error) {
        return res.status(500).json({msg:error.message}) 
    }
}
module.exports = {
    deleteProduct
}