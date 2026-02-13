# UMMID - Digital Health Wallet

A comprehensive digital health record management system featuring a React frontend and Node.js/Express backend.

## Project Structure

- `frontend/`: React application (Vite)
- `backend/`: Node.js Express server with MongoDB

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

## Getting Started

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/ummid
PORT=5000
JWT_SECRET=your_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Features
- Patient & Doctor Registration
- File Uploads for Medical Records
- Digital Health Wallet Management

