import express from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import WalletController from './app/controllers/WalletController';

import Auth from './app/middlewares/auth';

const rotas = express.Router();

rotas.post('/register', UserController.store);

rotas.post('/login', SessionController.login);

rotas.use(Auth);

rotas.get('/accounts/:id', WalletController.show);
rotas.post('/wallet', WalletController.store);
rotas.put('/update/:id', WalletController.desative);

export default rotas;
