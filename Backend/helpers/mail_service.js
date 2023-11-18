import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD
  }
});

const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error:', error);
          reject(error); 
        } else {
          console.log('Email sent:', info.response);
          resolve(info); 
        }
      });
    });
  };

export default sendMail
