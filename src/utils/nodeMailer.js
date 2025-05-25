require("dotenv").config();
const nodemailer = require("nodemailer")

const sendOTPEmail = async (email, otp, isPasswordReset = false) => {
    try {
        // Create email transporter (configure with your actual SMTP details)
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.mailID,
                pass: process.env.mailPass,
            },
        });
        
        // Determine email subject and action text based on purpose
        const subject = isPasswordReset ? 'BookCritic - Password Reset OTP' : 'BookCritic - Verify Your Email';
        const actionText = isPasswordReset ? 'reset your password' : 'complete your registration';
        
        // Create email HTML content
        const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #2D2420;
          background-color: #F8F5F0;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #D4A373;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #5C4033;
        }
        .content {
          padding: 30px 0;
        }
        .otp-container {
          text-align: center;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #5C4033;
          padding: 15px 20px;
          background-color: #F0EAE2;
          border-radius: 8px;
          display: inline-block;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #D4A373;
          font-size: 12px;
          color: #766054;
        }
        .note {
          font-size: 14px;
          color: #766054;
          margin-top: 20px;
          padding: 10px;
          background-color: #F0EAE2;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">BookCritic</div>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Thank you for using BookCritic. To ${actionText}, please use the following verification code:</p>
          
          <div class="otp-container">
            <div class="otp-code">${otp}</div>
          </div>
         
          <div class="note">
            <p>If you didn't request this code, please ignore this email or contact support if you have concerns.</p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} BookCritic. All rights reserved.</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
    `;
        console.log("email started to send")
        // Send email
        transporter.sendMail({
            to: email,
            subject: subject,
            html: htmlContent,
        });
        console.log("email send successfully")
        return ;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = { sendOTPEmail };