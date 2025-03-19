const Category = require('../../models/categoryModel')
const updateCategory = async(req,res)=>{
    try{
        const {id} = req.params;
        const{name,description}=req.body;
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {name,description,updatedAt:Date.now() },

            {new: true}
        )
        if(!updateCategory){
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(200).json({msg:'Category updated'})



    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
}
module.exports = {updateCategory}