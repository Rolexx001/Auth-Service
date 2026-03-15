const oauthService=require('../services/oauth.service');
const {generateAccessToken,generateRefreshToken}=require('../utils/token.utils');

const googleCallback=async(req,res)=>{
    const profile=req.user;
    const user=await oauthService.oauthLogin(profile);
    const accessToken=generateAccessToken({
        userId:user._id,
        role:user.role,

    })
    const refreshToken=generateRefreshToken({
        userId:user._id,
        role:user.role,
    });
    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        maxAge:15*60*1000,
    });
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        maxAge:7*24*60*60*1000,
    });
    res.redirect(process.env.GOOGLE_CALLBACK_URL);
}

module.exports={
    googleCallback,
};