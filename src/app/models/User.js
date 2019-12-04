/* Aqui definimos o schema do Usuário e seus métodos,
desde criptografia de senha á autenticação com token jwt*/

const mongoose = require('mongoose'); //db
const bcrypt = require('bcrypt'); // pacote para criptografar as senhas
const jwt = require('jsonwebtoken'); // pacote para lidar com os tokens de autenticação

const authConfig = require('../../config/auth');// Configurações de autenticação

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
        },
        active: {
            type: Boolean,
        }
    }
});

UserSchema.pre('save',
    async function hashPassword(next) {
        if (!this.isModified('password')) next(); // aqui verifica se não há modificação da senha, se não tiver next();

        this.password = await bcrypt.hashSync(this.password, 10);// aqui asenha é criptografada antes de salvar
    },
);

UserSchema.methods = {
    checkPassword(password) { //método que vai comparar se a senha digitada se compara com a hash salva
        return bcrypt.compareSync(password, this.password);
    },

    generateToken() { //esse método gera o token de autenticação para o usuario navegar na aplicação
        return jwt.sign({ email: this.email, id: this.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });
    },    
}

mongoose.model('User', UserSchema);//aqui exportamos o schema