const userModel=require('../models/user-model');
const refreshTokenModel=require('../models/refresh-token-model');



const findByEmail=async(email)=>{
    return await userModel.findOne({email}).select('+password');
};
const createUser=async(userData)=>{
    return await userModel.create(userData);

};
const updateUser=async(userId,userData)=>{
    return await userModel.findByIdAndUpdate(userId,userData,{new:true});
};

const createRefreshToken=async(token)=>{
    return await refreshTokenModel.create(token);
};

const findRefreshToken=async(token)=>{
    return await refreshTokenModel.findOne({token});
};

const deleteRefreshToken=async(token)=>{
    return await refreshTokenModel.deleteOne({token});
};

const deleteAllRefreshToken=async(userId)=>{
    return await refreshTokenModel.deleteMany({user:userId});
};





module.exports={
    findByEmail,
    createUser,
    createRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteAllRefreshToken,
    updateUser,
};