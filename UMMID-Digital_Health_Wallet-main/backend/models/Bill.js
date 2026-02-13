const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    hospitalName: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], required: true },
    filePath: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
