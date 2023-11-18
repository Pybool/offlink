import express from 'express';
const router = express.Router();
import { decode } from '../middlewares/jwt.js';
import { handleInvalidMethod } from '../middlewares/invalidrequest.js'
import authRoutes from '../Controllers/Auth.Controller.js';

router.post('/register', authRoutes.register)

router.get('/confirm', authRoutes.confirm)

router.post('/resend-confirmation-email', authRoutes.resendEmailConfirmation)

router.post('/send-password-resetlink', authRoutes.sendPasswordResetLink)

router.post('/reset-password', authRoutes.resetPassword)

router.post('/login', authRoutes.login)

router.post('/refresh-token', authRoutes.refreshToken)

router.delete('/logout', authRoutes.logout)

router.get('/user-profile', decode, authRoutes.getProfile)

router.put('/user-profile', decode, authRoutes.saveProfile)
router.patch('/buyer-account',  authRoutes.confirmBuyerAccount)


// Apply the middleware for unsupported methods
router.all('/register', handleInvalidMethod);
router.all('/confirm', handleInvalidMethod);
router.all('/resend-confirmation-email', handleInvalidMethod);
router.all('/send-password-resetlink', handleInvalidMethod);
router.all('/reset-password', handleInvalidMethod);
router.all('/login', handleInvalidMethod);
router.all('/refresh-token', handleInvalidMethod);
router.all('/logout', handleInvalidMethod);
router.all('/user-profile', handleInvalidMethod);
router.all('/user-profile', handleInvalidMethod);
router.all('/confirm-buyer-account', handleInvalidMethod);


export default router
