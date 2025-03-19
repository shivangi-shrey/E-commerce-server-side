const mongoose = require('mongoose')

const categoryScheme = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            trim:true,
            unique:true

        },
        slug: {
            type: String,
            unique: true,
            index: true,
        
        },
       
 },
{
    timestamps:true,
}
)
const Category = mongoose.model('Category',categoryScheme)
module.exports = Category;