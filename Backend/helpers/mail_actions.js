import User from '../Models/User.model.js';
import sendMail from '../helpers/mail_service.js';
import jwthelper from '../helpers/jwt_helper.js';
import * as crypto from 'crypto';
import ejs from 'ejs';


const mailActions = {
    auth:{
        sendEmailConfirmationMail : (async(savedUser,created)=>{
            
            const usermail = savedUser.email
            const accessToken = await jwthelper.signAccessToken(savedUser.id)
            const refreshToken = await jwthelper.signRefreshToken(savedUser.id)
            const confirmationLink = `${process.env.BACKEND_BASE_URL}/auth/confirm?token=${accessToken}`;
            const template = await ejs.renderFile('emailtemplates/emailConfirmation.html', { usermail,confirmationLink });
          
            const mailOptions = {
              from: 'info.bih@gmail.com',
              to: savedUser?.email,
              subject: 'Confirm your registration',
              text: `Click the following link to confirm your registration: ${confirmationLink}`,
              html: template
            };
            await sendMail(mailOptions)
            if(created)
              return {status:true, accessToken, refreshToken }
            
            else
              return {status:true, link: confirmationLink}
        }),
    
        sendPasswordResetMail : (async(result,savedUser)=>{
            const resetToken = crypto.randomBytes(20).toString('hex');
            const user = savedUser
            user.reset_password_token = resetToken;
            user.reset_password_expires = Date.now() + 3600000; // Token valid for 1 hour
            await user.save();
            const resetLink = `${process.env.FRONTEND_BASE_URL}/${process.env.PASSWORD_RESET_URL}?token=${resetToken}`;
            const mailOptions = {
              from: 'info.bih@gmail.com',
              to: savedUser?.email,
              subject: 'User Password Reset',
              text: `Click the following link to reset your your password: ${resetLink}`,
            };
            savedUser.res
            await sendMail(mailOptions)
            
        }),

    },
    transactions:{
      sendTransactionPlacedMail: (async(payload)=>{}),
      sendTransactionAcceptedMail : (async(payload)=>{}),
      sendTransactionConfirmedMail : (async(payload)=>{}),
      sendTransactionMutationMail : (async(payload)=>{}),
      disputes:{
        sendDisputesMail: (async(payload,user)=>{}),
      }
    }

}

export default mailActions