const Category = require("../../models/categoryModel");

const deleteCategory = async(req,res)=>{
    try{
        const {id} =req.params;
        const deleteCategory = await Category.findByIdAndDelete(id)
        if(!deleteCategory){
            return res.status(400).json({msg:'Catogary not found'})
        }
        res.status(200).json({msg:'Category deleted '})
    }
    catch(err){
       res.status(500).json({msg:err.message})
    }
}
module.exports = {deleteCategory}