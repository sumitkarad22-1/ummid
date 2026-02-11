const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    doctorName: { type: String, required: true },
    medicines: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        duration: { type: String, required: true }
    }],
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
