import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newPrescription, setNewPrescription] = useState({
        doctorName: '', medicines: '', dosage: '', duration: '', date: new Date().toISOString().split('T')[0]
    });

    const token = localStorage.getItem('token');

    const fetchPrescriptions = async () => {
        try {
            const res = await axios.get('/api/patient/prescriptions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPrescriptions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Transform single fields to array for backend
            const payload = {
                ...newPrescription,
                medicines: [{
                    name: newPrescription.medicines,
                    dosage: newPrescription.dosage,
                    duration: newPrescription.duration
                }]
            };
            await axios.post('/api/patient/prescriptions', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowForm(false);
            fetchPrescriptions();
        } catch (err) {
            alert('Failed to add prescription');
        }
    };

    return (
        <div>
            <Header />
            <div className="container fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Prescriptions</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : '+ Add Prescription'}
                    </button>
                </div>

                {showForm && (
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" value={newPrescription.date} onChange={e => setNewPrescription({ ...newPrescription, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Doctor Name</label>
                                <input className="form-control" value={newPrescription.doctorName} onChange={e => setNewPrescription({ ...newPrescription, doctorName: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Medicine Name</label>
                                <input className="form-control" value={newPrescription.medicines} onChange={e => setNewPrescription({ ...newPrescription, medicines: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Dosage</label>
                                <input className="form-control" value={newPrescription.dosage} onChange={e => setNewPrescription({ ...newPrescription, dosage: e.target.value })} required placeholder="e.g. 1-0-1" />
                            </div>
                            <div className="form-group">
                                <label>Duration</label>
                                <input className="form-control" value={newPrescription.duration} onChange={e => setNewPrescription({ ...newPrescription, duration: e.target.value })} required placeholder="e.g. 5 days" />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Prescription</button>
                        </form>
                    </div>
                )}

                <div className="card">
                    {prescriptions.length === 0 ? <p>No prescriptions found.</p> : (
                        <div className="dashboard-grid">
                            {prescriptions.map(p => (
                                <div key={p._id} className="card" style={{ border: '1px solid #eee', background: '#fafafa' }}>
                                    <h4>{p.doctorName}</h4>
                                    <p className="text-muted">{new Date(p.date).toLocaleDateString()}</p>
                                    <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid #ddd' }} />
                                    {p.medicines.map((m, i) => (
                                        <div key={i}>
                                            <strong>{m.name}</strong> - {m.dosage} ({m.duration})
                                        </div>
                                    ))}
                                    <button className="btn btn-primary" style={{ marginTop: '10px', fontSize: '0.8rem' }}>Download</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Prescriptions;
