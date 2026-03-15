const verificationTokenModel=require('../models/verification-token-model');

const createVerificationToken=async(data)=>{
    return await verificationTokenModel.create(data);
};

const findVerificationToken=async(token)=>{
    return await verificationTokenModel.findOne({token});
};

const deleteVerificationToken=async(token)=>{
    return await verificationTokenModel.deleteOne({token});
};
const deleteTokenbyUser=async(userId)=>{
    return await verificationTokenModel.deleteMany({user:userId});
};


module.exports={
    createVerificationToken,
    findVerificationToken,
    deleteVerificationToken,
    deleteTokenbyUser,

};