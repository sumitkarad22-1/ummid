import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Visits = () => {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newVisit, setNewVisit] = useState({
        doctorName: '', hospitalName: '', diagnosis: '', visitDate: new Date().toISOString().split('T')[0]
    });
    const [showForm, setShowForm] = useState(false);

    const fetchVisits = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/patient/visits', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVisits(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisits();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/patient/visits', newVisit, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowForm(false);
            fetchVisits();
        } catch (err) {
            alert('Failed to add visit');
        }
    };

    return (
        <div>
            <Header />
            <div className="container fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Visiting History</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : '+ Add Visit'}
                    </button>
                </div>

                {showForm && (
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" value={newVisit.visitDate} onChange={e => setNewVisit({ ...newVisit, visitDate: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Doctor Name</label>
                                <input className="form-control" value={newVisit.doctorName} onChange={e => setNewVisit({ ...newVisit, doctorName: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Hospital/Clinic</label>
                                <input className="form-control" value={newVisit.hospitalName} onChange={e => setNewVisit({ ...newVisit, hospitalName: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Diagnosis Summary</label>
                                <textarea className="form-control" rows="2" value={newVisit.diagnosis} onChange={e => setNewVisit({ ...newVisit, diagnosis: e.target.value })} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Save Visit</button>
                        </form>
                    </div>
                )}

                {loading ? <p>Loading...</p> : (
                    <div className="card">
                        {visits.length === 0 ? <p>No visits found.</p> : (
                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Doctor</th>
                                            <th>Hospital</th>
                                            <th>Diagnosis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visits.map(v => (
                                            <tr key={v._id}>
                                                <td>{new Date(v.visitDate).toLocaleDateString()}</td>
                                                <td>{v.doctorName}</td>
                                                <td>{v.hospitalName}</td>
                                                <td>{v.diagnosis}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Visits;
