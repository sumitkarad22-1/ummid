const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const patientController = require('../controllers/patientController');

router.get('/visits', auth, patientController.getVisits);
router.post('/visits', auth, patientController.addVisit);

router.get('/prescriptions', auth, patientController.getPrescriptions);
router.post('/prescriptions', auth, patientController.addPrescription);

router.get('/bills', auth, patientController.getBills);
router.post('/bills', auth, patientController.addBill);

router.get('/reports', auth, patientController.getReports);
router.post('/reports', auth, patientController.addReport);

module.exports = router;
