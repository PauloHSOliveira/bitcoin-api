import Mail from '../lib/Mail';

const sendEmail = async (username, email) => {
    await Mail.sendMail({
        to: `${email}`,
        subject: 'Bem vindo á familia bitnow!',
    });
};

export default sendEmail();
