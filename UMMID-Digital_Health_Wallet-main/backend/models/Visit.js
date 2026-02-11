const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visitDate: { type: Date, required: true },
    doctorName: { type: String, required: true },
    hospitalName: { type: String, required: true },
    diagnosis: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
