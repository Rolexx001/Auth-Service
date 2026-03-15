const authRepository=require('../repositories/auth.repository');

const oauthLogin=async(profile)=>{
    let user=await authRepository.findByEmail(profile.email);
    if(user){
        if(!user.googleId){
            user.googleId=profile.id;
            await user.save();
        }
        return user;
    }
    user=await authRepository.createUser({
        name:profile.displayName,
        email:profile.email,
        googleId:profile.id,
        provider:'GOOGLE',
        isVerified:true,
    
    })
    return user;
};

module.exports={
    oauthLogin,

}