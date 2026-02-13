const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const patientController = require('../controllers/patientController');
const multer = require('multer');
const path = require('path');

// Configure Multer for File Uploads
const { storage } = require('../config/cloudinary');

const upload = multer({ storage: storage });

router.get('/visits', auth, patientController.getVisits);
router.post('/visits', auth, patientController.addVisit);

router.get('/prescriptions', auth, patientController.getPrescriptions);
router.post('/prescriptions', auth, patientController.addPrescription);

router.get('/bills', auth, patientController.getBills);
router.post('/bills', auth, upload.single('file'), patientController.addBill);

router.get('/reports', auth, patientController.getReports);
router.post('/reports', auth, upload.single('file'), patientController.addReport);

module.exports = router;
