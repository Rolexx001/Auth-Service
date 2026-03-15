const roleallowed=(...allowedrole)=>{
    return (req,res,next)=>{
        try{
            const userRole=req.user?.role;
            if(!userRole){
                return res.status(403).json({
                    status:false,
                    message:'Access Denied. No user role found.',
                });
            }
            if(!allowedrole.includes(userRole)){
                return res.status(403).json({
                    status:false,
                    message:'Access Denied. You are not authorized to perform this action.',
                });
            }
            next();
        } catch(error){
            next(error);
        }

    };
};

module.exports=roleallowed;