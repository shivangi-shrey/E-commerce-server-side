const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const { createAccessToken, createRefreshToken } = require('./tokenHelper');
const login =async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await Users.findOne({email})
        if(!user){
            return res.status(400).json({msg:'User does not exit'})
        };
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:'Incorrect password'})
        };
        const accesstoken  = createAccessToken({id:user._id})
        const refreshtoken = createRefreshToken({id:user._id})

const isProduction = process.env.NODE_ENV === 'production'

        res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            secure: isProduction,
            path:'/user/refresh_token',
            sameSite :'Strict',
        });
        res.json({accesstoken})
    }  catch (err){
        return res.status(500).json({msg:err.message })
        
    }
   
}
module.exports = {login}