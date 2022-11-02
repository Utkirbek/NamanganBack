const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    shouldPay: {
        type:String,
        required: true,
    },
},
{
    timestamps: true,
}); 

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
