const Users = require('../models/userModel')


const getUser =async(req,res)=>{
    try{
        const user =await Users.findById(req.user.id).select('-password')
        if(!user){
            return res.status(400).json({msg:'User Not Found'})
        }
        res.json(user)

    }
    catch(err){
    
    return res.status(500).json({msg: err.message})
    }
}
module.exports = {getUser}