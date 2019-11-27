const nodemailer = require('nodemailer');
// const { resolve } = require('path');
// const exphbs = require('express-handlebars');
// const nodemailerhbs = require('nodemailer-express-handlebars');
const mailConfig = require('../../config/mail');

class Mail {
    constructor() {
        const { host, port, secure, auth } = mailConfig;

        this.transporter = nodemailer.transporter({
            host,
            port,
            secure,
            auth
        });
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message
        });
    }
}

module.exports = new Mail();