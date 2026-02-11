const Visit = require('../models/Visit');
const Prescription = require('../models/Prescription');
const Bill = require('../models/Bill');
const Report = require('../models/Report');

// In-memory data for demo mode
let mockVisits = [];
let mockPrescriptions = [];
let mockBills = [];
let mockReports = [];

exports.getVisits = async (req, res) => {
    try {
        if (!global.dbConnected) {
            return res.json(mockVisits.filter(v => v.userId === req.user.id));
        }
        const visits = await Visit.find({ userId: req.user.id });
        res.json(visits);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.addVisit = async (req, res) => {
    try {
        if (!global.dbConnected) {
            const newVisit = { _id: Date.now().toString(), ...req.body, userId: req.user.id };
            mockVisits.push(newVisit);
            return res.status(201).json(newVisit);
        }
        const visit = new Visit({ ...req.body, userId: req.user.id });
        await visit.save();
        res.status(201).json(visit);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.getPrescriptions = async (req, res) => {
    try {
        if (!global.dbConnected) {
            return res.json(mockPrescriptions.filter(p => p.userId === req.user.id));
        }
        const prescriptions = await Prescription.find({ userId: req.user.id });
        res.json(prescriptions);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.addPrescription = async (req, res) => {
    try {
        if (!global.dbConnected) {
            const newPrescription = { _id: Date.now().toString(), ...req.body, userId: req.user.id };
            mockPrescriptions.push(newPrescription);
            return res.status(201).json(newPrescription);
        }
        const prescription = new Prescription({ ...req.body, userId: req.user.id });
        await prescription.save();
        res.status(201).json(prescription);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.getBills = async (req, res) => {
    try {
        if (!global.dbConnected) {
            return res.json(mockBills.filter(b => b.userId === req.user.id));
        }
        const bills = await Bill.find({ userId: req.user.id });
        res.json(bills);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.addBill = async (req, res) => {
    try {
        if (!global.dbConnected) {
            const newBill = { _id: Date.now().toString(), ...req.body, userId: req.user.id };
            mockBills.push(newBill);
            return res.status(201).json(newBill);
        }
        const bill = new Bill({ ...req.body, userId: req.user.id });
        await bill.save();
        res.status(201).json(bill);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        if (!global.dbConnected) {
            return res.json(mockReports.filter(r => r.userId === req.user.id));
        }
        const reports = await Report.find({ userId: req.user.id });
        res.json(reports);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.addReport = async (req, res) => {
    try {
        if (!global.dbConnected) {
            const newReport = { _id: Date.now().toString(), ...req.body, userId: req.user.id };
            mockReports.push(newReport);
            return res.status(201).json(newReport);
        }
        const report = new Report({ ...req.body, userId: req.user.id });
        await report.save();
        res.status(201).json(report);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
