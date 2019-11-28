const mailConfig = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
        user: 'codephs',
        pass: '88495456paulo',
    },
    default: {
        from: 'Bitnow Tem <noreply@bitnow.com>'
    },
};

module.exports = mailConfig;