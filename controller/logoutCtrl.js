


const logout= async(req,res)=>{
    try{
        //clear the refresh token cookie
        res.clearCookie('refreshtoken',{
            httpOnly:true,
            secure: process.env.Node_ENV ==='production',
            path:'/user/refresh_token',
        });
    return res.json({msg:"logout sucessfully"})

    }
    catch(err){
      res.status(500).json({msg:err.message})
    }

}

module.exports = {logout};