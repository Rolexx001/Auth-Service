const jwt=require('jsonwebtoken');
const crypto=require('crypto');


//GENERATE ACCESS TOKEN

const generateAccessToken=(payload)=>{
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
        
    );
};

//GENERATE REFRESH TOKEN

const generateRefreshToken=(payload)=>{
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRE}
    );
};

//VERIFY REFRESH TOKEN

const verifyRefreshToken=(token)=>{
    try{
        return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
    }catch(error){
        console.log(error);
        return null;
    }
};

//VERIFY ACCESS TOKEN

const verifyAccessToken=(token)=>{
    try{
        return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }
    catch(error){
        console.log(error);
        return null;
    }
};

//GENERATE VERIFICATION TOKEN

const generateVerificationToken=()=>{
    const rawToken=crypto.randomBytes(32).toString('hex');
    
    const hashedToken=crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');

    return {
        rawToken,
        hashedToken,
    };
};

module.exports={
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    verifyAccessToken,
    generateVerificationToken,
};
