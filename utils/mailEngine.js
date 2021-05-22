const nodemailer = require('nodemailer');

exports.mailer = (mailer) =>{
    const transport = nodemailer.createTransport({
        host: process.env.HOST_NAME,
        port: 587,
        secure:false,
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.USER_PASS
        },

    });

     transport.sendMail(mailer, (err, res)=>{
        if(err){
            return {err: true, err_message:'Could not send mail.'}
        }else{
            return {err: false}
        }
    })
}




