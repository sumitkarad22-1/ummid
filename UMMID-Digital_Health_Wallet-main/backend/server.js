const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log("Loaded Environment Variables:", Object.keys(process.env).filter(key => !key.startsWith('npm_')));
console.log("Checking MONGO_URI:", process.env.MONGO_URI);

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Debug middleware for uploads
app.use('/uploads', (req, res, next) => {
    console.log(`Request for upload: ${req.url}`);
    next();
});

const uploadsPath = path.join(__dirname, 'uploads');
if (!require('fs').existsSync(uploadsPath)) {
    console.log(`Creating uploads directory at: ${uploadsPath}`);
    require('fs').mkdirSync(uploadsPath);
}
console.log(`Serving uploads from: ${uploadsPath}`);

app.use('/uploads', express.static(uploadsPath));
app.use('/uploads', (req, res) => {
    console.log(`404 Not Found: ${req.url}`);
    res.status(404).json({ error: 'File not found', path: req.url });
});

// Connect DB
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

module.exports = app;
