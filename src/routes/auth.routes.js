const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');
const loginLimit=require('../middlewares/ratelimit.middleware');
const passport=require('../config/passport');
const oauthController=require('../controllers/oauth.controller');



router.use(loginLimit);

router.post('/register',authController.register);
router.post('/login',loginLimit,authController.login);
router.post('/logout',authController.logout);
router.post('/logout-all',authController.logoutAll);
router.post('/refresh',authController.refreshAccessToken);
router.get('/verify-email/:token',authController.verifyEmail);
router.post('/resend-verification',authController.resendVerification);
router.post('/forget-password',authController.forgetPassword);
router.post('/reset-password/:token',authController.resetPassword);
router.get('/google',passport.authenticate('google',{scope:["profile","email"]}));
router.get('/google/callback',passport.authenticate('google'),oauthController.googleCallback);



module.exports= router;

