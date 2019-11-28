const nodemailer = require('nodemailer');
const MailConfig = require('../config/mail');

module.exports = {
    async sendEmail(email, username) {
        const {host, port, auth} = MailConfig;

        const transport = nodemailer.createTransport({
            host,
            port,
            auth,
        });

        const emailEnviado = {
            from: 'Team Bitnow <noreply@bitnow.com>',
            to: email,
            subject: `Bem vindo ao time Bitnow, ${username}!`,
            html: '<h1>Bem vindo!</h1>'
        }
    
        await transport.sendMail(emailEnviado, (info, err) => {
            if(info) {console.log(info)} else {console.log(err)}
        });
    }
}