const passwordResetModel=require('../models/password-reset-model');

const createResetToken=async(data)=>{
    return await passwordResetModel.create(data);
};

const findResetToken=async(token)=>{
    return await passwordResetModel.findOne({token});
};

const deleteToken=async(token)=>{
    return await passwordResetModel.deleteOne({token});
};

const deleteTokenbyUser=async(userId)=>{
    return await passwordResetModel.deleteMany({user:userId});
};


module.exports={
    createResetToken,
    findResetToken,
    deleteToken,
    deleteTokenbyUser,

}