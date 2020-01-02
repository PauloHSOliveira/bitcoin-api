import mongoose from 'mongoose';
//schema da carteira bitcoin
const WalletSchema = new mongoose.Schema({
    coin: {
        type: String,
        default: 'BitCoin',
    },
    owner: {
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        owner_name: {
            type: String,
        },
    },
    address: {
        type: String,
    },
    privatekey: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Wallet', WalletSchema);
