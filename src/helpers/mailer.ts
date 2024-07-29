import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


export const sendEmail = async({email , emailType , userId} : any) => {
    try {

    const hashedToken = await bcryptjs.hash(userId.toString() , 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashedToken,
                    verifyTokenExpiry : Date.now() + 3600000
                } 
            )
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken : hashedToken,
                    ForgotPasswordExpiry : Date.now() + 3600000
                } 
            )
        }




        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1425c5b8348a0d",
              pass: "0152ad36f8ef1f"
            }
          });

      const mailoption = {
        from : 'prem@ai',
        to : email,
        subject : emailType === 'VERIFY' ?  "verify your email" : "Reset your password",
        html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token = ${hashedToken}">here</a> to ${emailType === "Verify" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
      }

     const mailresponse = await transport.sendMail(mailoption)

     return mailresponse

    } catch (error : any) {
        throw new Error(error.message)
    }
}