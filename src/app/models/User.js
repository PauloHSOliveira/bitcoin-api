const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    wallet: {
        wallet_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallet'
        },
        address: {
            type: String,
        },
        privatekey: {
            type: String
        }
    }
});

UserSchema.pre('save',
    async function hashPassword(next) {
        if (!this.isModified('password')) next();

        this.password = await bcrypt.hashSync(this.password, 10);
    },
);

UserSchema.methods = {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    },

    generateToken() {
        return jwt.sign({ id: this.id }, 'secret', {
            expiresIn: 86400
        });
    },    
}

mongoose.model('User', UserSchema);