const mongoose = require('mongoose');
const bitcoin = require('crypto-wallets');
const api = require('../services/apiBC')

const Wallet = mongoose.model('Wallet');
const User = mongoose.model('User')

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;

        const bctwallet = bitcoin.generateWallet('BTC');
        const address = bctwallet.address;
        const privatekey = bctwallet.privateKey;

        const { username } = await User.findById(user_id);

        const { id } = await Wallet.create({
            owner:{
                owner_id: user_id,
                owner_name: username,
            },
            address,
            privatekey,
        });

        const user = await User.findByIdAndUpdate(user_id, {
            wallet: {
                wallet_id: id,
                address,
                privatekey
            }
        }, { new: true });

        return res.status(200).json({
            user,
        });
    },

    async show(req, res) {

        const { wallet:{address} } = await User.findOne({username: req.params.username});

        const walletInfo = await api.get(`${address}`);

        const { final_balance } = walletInfo.data;
        return res.status(200).json({
            final_balance,
        });
    }
}