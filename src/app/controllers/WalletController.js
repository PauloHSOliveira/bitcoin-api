import * as bitcoin from 'crypto-wallets';
import api from '../../config/apiBC';

import User from '../models/User';
import Wallet from '../models/Wallet';

class WalletController {
    async store(req, res) {
        const { user_id } = req.headers;

        const bctwallet = bitcoin.generateWallet('BTC');
        const address = bctwallet.address;
        const privatekey = bctwallet.privateKey;

        const { username } = await User.findById(user_id);

        const { id, active } = await Wallet.create({
            owner: {
                owner_id: user_id,
                owner_name: username,
            },
            address,
            privatekey,
        });

        const user = await User.findByIdAndUpdate(
            user_id,
            {
                wallet: {
                    wallet_id: id,
                    address,
                    privatekey,
                    active,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            user,
        });
    }

    async show(req, res) {
        const { user_id } = req.headers;

        const {
            wallet: { address },
        } = await User.findById(user_id);

        const walletInfo = await api.get(`${address}`);

        const { final_balance, total_received, total_sent } = walletInfo.data;

        return res.status(200).json({
            total_received,
            total_sent,
            final_balance,
        });
    }

    async desative(req, res) {
        const {
            wallet: { wallet_id },
        } = await User.findById(req.params.id);

        const walletExists = await Wallet.findById(wallet_id);

        if (!walletExists) {
            return res.status(400).json({ error: 'Wallet dont exists' });
        }

        const desativeWallet = await Wallet.findByIdAndUpdate(
            wallet_id,
            {
                active: false,
            },
            { new: true }
        );

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                wallet: {
                    active: false,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            Desatived: desativeWallet,
            user,
        });
    }
}

export default new WalletController();
