import Header from '../components/Header';
import { Link } from 'react-router-dom';
import {
    Activity, FileText, Pill, CreditCard, ClipboardList
} from 'lucide-react';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="container fade-in">
                <h2>Patient Dashboard</h2>
                <div className="dashboard-grid">
                    <Link to="/visits" className="card nav-card">
                        <Activity size={48} color="var(--primary-color)" />
                        <h3>Visiting History</h3>
                        <p style={{ marginTop: '10px', color: '#6b7280' }}>
                            View your past doctor visits and diagnoses.
                        </p>
                    </Link>

                    <Link to="/prescriptions" className="card nav-card">
                        <Pill size={48} color="#f59e0b" />
                        <h3>Prescriptions</h3>
                        <p style={{ marginTop: '10px', color: '#6b7280' }}>
                            Access your medical prescriptions and dosages.
                        </p>
                    </Link>

                    <Link to="/bills" className="card nav-card">
                        <CreditCard size={48} color="#dc2626" />
                        <h3>Billing</h3>
                        <p style={{ marginTop: '10px', color: '#6b7280' }}>
                            Check your payment history and download bills.
                        </p>
                    </Link>

                    <Link to="/reports" className="card nav-card">
                        <FileText size={48} color="#2563eb" />
                        <h3>Medical Reports</h3>
                        <p style={{ marginTop: '10px', color: '#6b7280' }}>
                            Upload and view your diagnostic reports safely.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
