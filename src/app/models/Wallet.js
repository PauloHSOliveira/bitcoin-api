const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    coin: {
        type:String,
    },
    owner: {
        owner_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        owner_name: {
            type: String,
        }
    },
    address: {
        type: String,
    },
    privatekey: {
        type: String,
    }
});

mongoose.model('Wallet', WalletSchema);