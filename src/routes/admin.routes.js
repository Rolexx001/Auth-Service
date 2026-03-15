const express=require('express');
const router=express.Router();

const authMiddleware=require('../middlewares/auth.middleware');
const adminController=require('../controllers/admin.controller');
const roleMiddleware=require('../middlewares/role.middleware');

router.get('/dashboard',authMiddleware,roleMiddleware('ADMIN'),adminController.getAdminDashboard);

module.exports=router;