# UMMID - Patient Health Record Management System

UMMID is a comprehensive healthcare application designed to manage patient records securely. It features OTP-based login, a patient dashboard, and modules for visiting history, prescriptions, billing, and medical reports.

## System Architecture

The application follows a **Client-Server Architecture**:
- **Frontend (Client)**: Built with React.js (Vite) and Vanilla CSS for a responsive, modern UI. It communicates with the backend via REST APIs.
- **Backend (Server)**: Built with Node.js and Express.js. It handles business logic, authentication, and database interactions.
- **Database**: MongoDB is used to store user profiles, medical records, and reports.

## Technology Stack

- **Frontend**: React.js, React Router, Axios, Lucide React (Icons), Vanilla CSS
- **Backend**: Node.js, Express.js, Mongoose, Nodemailer, JWT
- **Database**: MongoDB
- **Tools**: Vite, Postman (for testing)

## Database Design

### Collections
1. **User**: Stores patient registration details (Name, Mobile, Email, Address, OTP).
2. **Visit**: Stores visiting history (Date, Doctor, Hospital, Diagnosis).
3. **Prescription**: Stores prescriptions (Medicines, Dosage, Duration).
4. **Bill**: Stores billing information (Amount, Status).
5. **Report**: Stores medical report metadata (Type, File Name).

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

### 1. Backend Setup
1. Navigate to `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (already created) with:
   ```
   MONGO_URI=mongodb://localhost:27017/ummid_phrms
   PORT=5000
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```
4. Start the server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Features Usage

1. **Registration**: Go to `/register` and fill in details.
2. **Login**: Go to `/login`, enter email. Check Backend Console for the OTP (Demo Mode). Enter OTP to login.
3. **Dashboard**: Access all modules from the home page.
4. **Modules**: Add/View Visits, Prescriptions, Bills, and Reports.

## API Endpoints

- **POST /api/auth/register**: Register new user.
- **POST /api/auth/send-otp**: Send OTP to email.
- **POST /api/auth/verify-otp**: Verify OTP and get Token.
- **GET /api/patient/visits**: Get all visits.
- **POST /api/patient/visits**: Add new visit.
- **GET /api/patient/prescriptions**: Get all prescriptions.
- **POST /api/patient/prescriptions**: Add prescription.
- **GET /api/patient/bills**: Get bills.
- **POST /api/patient/bills**: Add bill.
- **GET /api/patient/reports**: Get reports.
- **POST /api/patient/reports**: Add report metadata.

## Notes
- **Email Service**: For demo purposes, the backend logs the OTP to the console if email credentials are not provided or invalid.
- **File Upload**: Currently simulates file upload by storing the filename.

## Design
The application uses a clean, modern aesthetic with a curated color palette (Indigo & Emerald), smooth transitions using CSS animations (`fade-in`), and a responsive grid layout.
