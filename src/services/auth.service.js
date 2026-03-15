const crypto=require('crypto');
const emailRepository=require('../repositories/emailVerification.repository');
const authRepository=require('../repositories/auth.repository');
const {hashPassword,comparePassword}=require('../utils/hash.util');
const {generateAccessToken, generateRefreshToken , verifyRefreshToken, verifyAccessToken}=require('../utils/token.utils');
const {sendVerificationEmail,sendResetPasswordEmail}=require('../utils/email.util');
const {generateVerificationToken}=require('../utils/token.utils');
const passwordRepository=require('../repositories/passwordReset.repository');





//REGISTER SERVICE

const registerUser=async({name,email,password}={})=>{

    // 🛡️ Validation
    if(!name || !email || !password){
        throw new Error('Name, email and password are required');
    }
    const existingUser=await authRepository.findByEmail(email);
    if(existingUser){
        throw new Error('User with this email already exists');
    }

    const hashedPassword=await hashPassword(password);
    const user=await authRepository.createUser({
        name,
        email,
        password:hashedPassword,
    });
    //generate verification token
    const {rawToken,hashedToken}=generateVerificationToken();

    //save token in db
    await emailRepository.createVerificationToken({
        user:user._id,
        token:hashedToken,
        expiresAt:Date.now() + 24 * 60 * 60 * 1000,
    });
    //verification link

    const verificationLink=`${process.env.BASE_URL}/api/auth/verify-email/${rawToken}`;
    //send verification email
    await sendVerificationEmail(email,verificationLink);
    

    return {
        user,
        message: "Registration successful. Please verify your email."
    };
    
};

//LOGIN SERVICE

const loginUser=async({email,password}={})=>{
    // 🛡️ Validation
    if(!email||!password){
        throw new Error('Email and password are required');
    }
    const user=await authRepository.findByEmail(email);
    if(!user){
        throw new Error('Invalid email or password');
    }
    const ismatch=await comparePassword(password,user.password);
    if(!ismatch){
        throw new Error('Invalid email or password');
    }
    if(!user.isVerified){
        throw new Error('Please verify your email');
    }

    const payload={
        userId:user._id,
        role:user.role,
    };

    const accessToken=generateAccessToken(payload);
    const refreshToken=generateRefreshToken(payload);

    await authRepository.createRefreshToken({
        user: user._id,
        token: refreshToken,
        expiresAt:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),//7days
    });


    return {
        accessToken,
        refreshToken,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
    };
};

//LOGOUT 

const logoutUser=async(refreshToken)=>{
    await authRepository.deleteRefreshToken(refreshToken);
};

//LOGOUT FROM ALL DEVICES

const logoutAllUser=async(userId)=>{
    await authRepository.deleteAllRefreshToken(userId);
    return {
        message:"Logged out of all devices",
    };
};

//REFRESH TOKEN SERVICE


const refreshTokenService=async(oldRefreshToken)=>{
    const storedToken=await authRepository.findRefreshToken(oldRefreshToken);
    if(!storedToken){
        throw new Error('Invalid refresh token');
    }

    const decoded= verifyRefreshToken(oldRefreshToken);
    if (!decoded){
        await authRepository.deleteRefreshToken(oldRefreshToken);
        throw new Error('Refresh token expired or invalid');
    }
    
    await authRepository.deleteRefreshToken(oldRefreshToken);

    const payload={
        userId:decoded.userId,
        role:decoded.role,
    };


    const newAccessToken=generateAccessToken(payload);
    const newRefreshToken=generateRefreshToken(payload);

    await authRepository.createRefreshToken({
        user:decoded.userId,
        token:newRefreshToken,
        expiresAt:new Date(Date.now()+7*24*60*60*1000),
    });

    return {
        accessToken:newAccessToken,
        refreshToken:newRefreshToken,
    };
    

    
};

const verifyEmailService=async(rawToken)=>{
    const hashedToken=crypto.createHash('sha256').update(rawToken).digest('hex');
    const record=await emailRepository.findVerificationToken(hashedToken);
    if(!record){
        throw new Error('Invalid or expired token');
    }
    if(record.expiresAt<Date.now()){
        throw new Error('Token has expired');
    }
    await authRepository.updateUser(record.user,{
        isVerified:true,
    });
    await emailRepository.deleteVerificationToken(hashedToken);
    return {
        message:'Email verified successfully',
    };
};

const resendVerificationService=async(email)=>{
    const user=await authRepository.findByEmail(email);
    if(!user){
        throw new Error('User not found');
    }
    if(user.isVerified){
        throw new Error('Email already verified');
    }
    await emailRepository.deleteTokenbyUser(user._id);
    const {rawToken,hashedToken}=generateVerificationToken();
    
    await emailRepository.createVerificationToken({
        user:user._id,
        token:hashedToken,
        expiresAt:Date.now() + 24 * 60 * 60 * 1000,
    });

    const verificationLink=`${process.env.BASE_URL}/api/auth/verify-email/${rawToken}`;
    
    await sendVerificationEmail(email,verificationLink);

    return {
        message:'Verification email resent successfully',
    };
};


const forgetPasswordService=async(email)=>{
    const user=await authRepository.findByEmail(email);
    if(!user){
        throw new Error('User not found');
    }
    await passwordRepository.deleteTokenbyUser(user._id);
    const {rawToken,hashedToken}=generateVerificationToken();
    await passwordRepository.createResetToken({
        user:user._id,
        token:hashedToken,
        expiresAt:Date.now() + 15* 60 * 1000,
    });
    const resetLink=`${process.env.BASE_URL}/api/auth/reset-password/${rawToken}`;

    await sendResetPasswordEmail(email,resetLink);

    return {
        message:"Password reset email sent successfully"
    };

};

const resetPasswordService=async(token,newPassword)=>{
    const hashedToken=crypto.createHash('sha256').update(token).digest('hex');
    const record=await passwordRepository.findResetToken(hashedToken);
    if(!record){
        throw new Error('Invalid or expired token');
    }
    if(record.expiresAt<Date.now()){
        throw new Error('Token has expired');
    }
    const hashedPassword=await hashPassword(newPassword);
    await authRepository.updateUser(record.user,{
        password:hashedPassword,
    });
    await passwordRepository.deleteToken(hashedToken);
    return {
        message:'Password reset successfully',
    };


}




module.exports={
    registerUser,
    loginUser,
    refreshTokenService,
    logoutUser,
    logoutAllUser,
    verifyEmailService,
    resendVerificationService,
    forgetPasswordService,
    resetPasswordService,

};