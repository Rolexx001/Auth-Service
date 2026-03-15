const rateLimit=require('express-rate-limit');

const loginLimit=rateLimit({
    windowMs:15*60*1000,
    max:500,
    message:{
        success: false,
        status: 429,
        message: "Too many login attempts. Please try again after 15 minutes."
    },
});

module.exports=loginLimit;