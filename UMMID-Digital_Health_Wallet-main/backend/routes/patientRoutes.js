const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const patientController = require('../controllers/patientController');
const multer = require('multer');
const path = require('path');

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!require('fs').existsSync(uploadPath)) {
            require('fs').mkdirSync(uploadPath, { recursive: true });
        }
        console.log(`Saving file to: ${uploadPath}`);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const sanitizedName = file.originalname.replace(/\s+/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;
        console.log(`Generated filename: ${fileName}`);
        cb(null, fileName);
    }
});

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
