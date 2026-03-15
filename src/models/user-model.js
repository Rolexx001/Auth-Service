const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(    
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,

        },
        password:{
            type:String,
            required:true,
            select:false,
        },
        role:{
            type:String,
            enum:['USER','ADMIN'],
            default:'USER',
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        googleId:{
            type:String,
            select:false,
        },
        provider:{
            type:String,
            enum:['LOCAL','GOOGLE'],
            default:'LOCAL',
        },

    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model('User',userSchema);