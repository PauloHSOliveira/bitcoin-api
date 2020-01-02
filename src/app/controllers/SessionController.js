import * as yup from 'yup';

import User from '../models/User';

class SessionController {
    async login(req, res) {
        const schema = yup.object().shape({
            email: yup
                .string()
                .email()
                .required(),
            password: yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const { id, username } = user;

        return res.status(200).json({
            message: 'Ok',
            user: {
                id,
                username,
                email,
            },
            token: user.generateToken(),
        });
    }
}

export default new SessionController();
