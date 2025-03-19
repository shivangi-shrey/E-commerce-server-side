const  Category = require('../../models/categoryModel')
const slugCategory = async(req,res)=>{
    try{
        const {slug} =req.params;
        const categories = await Category.findOne({slug});
        if(!categories){
            return res.status(400).json({msg:'Category not found'})

        }
        res.status(200).json({categories})
    }
    catch(err){

        res.status(500).json({msg:err.msg})

    }
}
module.exports = {slugCategory}