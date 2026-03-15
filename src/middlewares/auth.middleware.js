const { verifyAccessToken } = require("../utils/token.utils");


const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies?.accessToken;

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Unauthorized',
            
            });
        }
        const decoded=verifyAccessToken(token);

        req.user=decoded;
        next();
        
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized - Invalid or expired token'
        });
    }
};

module.exports=authMiddleware;