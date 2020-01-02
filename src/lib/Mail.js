import nodemailer from 'nodemailer';
import MailConfig from '../config/mail';

class Mail {
    async sendEmail(email, username) {
        const { host, port, auth } = MailConfig;

        const transport = nodemailer.createTransport({
            host,
            port,
            auth,
        });

        const emailEnviado = {
            from: 'Team Bitnow <noreply@bitnow.com>',
            to: email,
            subject: `Bem vindo ao time Bitnow, ${username}!`,
            html: '<h1>Bem vindo!</h1>',
        };

        const response = await transport.sendMail(emailEnviado, (info, err) => {
            if (info) {
                console.log(info);
            } else {
                console.log(err);
            }
        });
    }
}

export default new Mail();
