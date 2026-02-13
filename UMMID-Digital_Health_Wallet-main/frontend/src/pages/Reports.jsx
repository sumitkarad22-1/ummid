import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
        reportType: '', date: new Date().toISOString().split('T')[0]
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('token');

    const fetchReports = async () => {
        try {
            const res = await axios.get('/api/patient/reports', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReports(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('reportType', newReport.reportType);
        formData.append('date', newReport.date);
        if (file) formData.append('file', file);

        try {
            await axios.post('/api/patient/reports', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowForm(false);
            fetchReports();
        } catch (err) {
            alert('Failed to add report');
        }
    };

    return (
        <div>
            <Header />
            <div className="container fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Medical Reports</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : '+ Upload Report'}
                    </button>
                </div>

                {showForm && (
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" value={newReport.date} onChange={e => setNewReport({ ...newReport, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Report Type</label>
                                <select className="form-control" value={newReport.reportType} onChange={e => setNewReport({ ...newReport, reportType: e.target.value })}>
                                    <option value="">Select Type</option>
                                    <option value="Blood Test">Blood Test</option>
                                    <option value="X-Ray">X-Ray</option>
                                    <option value="MRI">MRI</option>
                                    <option value="CT Scan">CT Scan</option>
                                    <option value="Prescription Scan">Prescription Scan</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Upload File</label>
                                <input type="file" className="form-control" onChange={handleFileChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Report</button>
                        </form>
                    </div>
                )}

                {loading ? <p>Loading...</p> : (
                    <div className="card">
                        <div className="dashboard-grid">
                            {reports.map((r, i) => (
                                <div key={i} className="card" style={{ border: '1px solid #eee', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📄</div>
                                    <h4>{r.reportType}</h4>
                                    <p className="text-muted">{new Date(r.date).toLocaleDateString()}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{r.filePath}</p>
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                                        <a
                                            href={r.filePath.startsWith('http') ? r.filePath : `/uploads/${r.filePath}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{ fontSize: '0.8rem', textDecoration: 'none' }}
                                        >
                                            View
                                        </a>
                                        <a
                                            href={r.filePath.startsWith('http') ? r.filePath : `/uploads/${r.filePath}`}
                                            download
                                            className="btn btn-secondary"
                                            style={{ fontSize: '0.8rem', textDecoration: 'none', background: '#6c757d' }}
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
