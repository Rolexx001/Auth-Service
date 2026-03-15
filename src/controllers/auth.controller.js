const authService=require('../services/auth.service');

//REGISTER

const register=async(req,res,next)=>{
    try {
        const user=await authService.registerUser(req.body);

        res.status(200).json({
            success:true,
            message:'User Registered Successfully',
        });
    } catch (error) {
        next(error);
    }   
};

//LOGIN

const login=async(req,res,next)=>{
    try{
        const user=await authService.loginUser(req.body);
        console.log("Token to be set:", user.accessToken);
        res.cookie('accessToken',user.accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:15*60*1000,
        });
        res.cookie('refreshToken',user.refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:7*24*60*60*1000,
        });
        res.status(200).json({
            success:true,
            message:'User Logged In Successfully',
            data:user,
        });
        
    }
    catch(error){
        next(error);
    }
};

//LOGOUT

const logout=async(req,res,next)=>{
    try{

        const refreshToken=req.cookies.refreshToken;
        if(refreshToken){
            await authService.logoutUser(refreshToken);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({
            success:true,
            message:'user logged out successfully'
        });
    }
    catch(error){
        next(error);
    }
};

const logoutAll=async(req,res,next)=>{
    try{
        const userId=req.user.userId;
        await authService.logoutAllUser(userId);

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({
            success:true,
            message:'user logged out from all devices successfully'
        });

    } catch(error){
        next(error);
    }

};


const refreshAccessToken=async(req,res,next)=>{
    try{
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                success:false,
                message:'no refresh token provided'
            
            });
        }
        const data=await authService.refreshTokenService(refreshToken);
        res.cookie('accessToken',data.accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:15*60*1000,

        });
        res.cookie('refreshToken',data.refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:7*24*60*60*1000,

        });
        res.status(200).json({
            success: true,
            message: 'Access token refreshed successfully'
        });

    }    
    catch(error){
        next(error);
    }
};

const verifyEmail=async(req,res,next)=>{
    try{
        const {token}=req.params;
        const result=await authService.verifyEmailService(token);
        res.status(200).json(result);
    } catch(error){
        next(error);
    }
};

const resendVerification=async(req,res,next)=>{
    try{
        const{email}=req.body;
        const result=await authService.resendVerificationService(email);
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
};

const forgetPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const result=await authService.forgetPasswordService(email);
        res.status(200).json(result);


    } catch(error){
        next(error);
    }
};

const resetPassword=async(req,res,next)=>{
    try{
        const {token}=req.params;
        const {newPassword}=req.body;
        const result=await authService.resetPasswordService(token,newPassword);
        res.status(200).json(result);
    } catch(error){
        next(error);
    }
};



module.exports={
    register,
    login,
    logout,
    refreshAccessToken,
    logoutAll,
    verifyEmail,
    resendVerification,
    forgetPassword,
    resetPassword,
};