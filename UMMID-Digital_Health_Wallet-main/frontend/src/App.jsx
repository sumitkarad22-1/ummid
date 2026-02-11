import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Visits from './pages/Visits';
import Prescriptions from './pages/Prescriptions';
import Bills from './pages/Bills';
import Reports from './pages/Reports';
import { useState } from 'react';

// Simple Auth Context Logic (can be moved to Context later)
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <div className="app-container">
                <img src="/logo.jpg" alt="Watermark" className="watermark" />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/visits"
                        element={
                            <ProtectedRoute>
                                <Visits />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/prescriptions"
                        element={
                            <ProtectedRoute>
                                <Prescriptions />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/bills"
                        element={
                            <ProtectedRoute>
                                <Bills />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute>
                                <Reports />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <footer className="footer">
                    &copy; {new Date().getFullYear()} UMMID - Patient Health Record Management System. All Rights Reserved.
                </footer>
            </div>
        </Router>
    );
}

export default App;
