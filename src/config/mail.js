const mailConfig = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
        user: 'username',
        pass: 'pass',
    },
    default: {
        from: 'Bitnow Tem <noreply@bitnow.com>'
    },
};

module.exports = mailConfig;