import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [newBill, setNewBill] = useState({
        hospitalName: '', date: new Date().toISOString().split('T')[0], amount: '', paymentStatus: 'Paid'
    });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('token');

    const fetchBills = async () => {
        try {
            const res = await axios.get('/api/patient/bills', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBills(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/patient/bills', newBill, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowForm(false);
            fetchBills();
        } catch (err) {
            alert('Failed to add bill');
        }
    };

    return (
        <div>
            <Header />
            <div className="container fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>My Bills</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : '+ New Bill'}
                    </button>
                </div>

                {showForm && (
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" value={newBill.date} onChange={e => setNewBill({ ...newBill, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Hospital Name</label>
                                <input className="form-control" value={newBill.hospitalName} onChange={e => setNewBill({ ...newBill, hospitalName: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Amount (INR)</label>
                                <input type="number" className="form-control" value={newBill.amount} onChange={e => setNewBill({ ...newBill, amount: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select className="form-control" value={newBill.paymentStatus} onChange={e => setNewBill({ ...newBill, paymentStatus: e.target.value })}>
                                    <option>Paid</option>
                                    <option>Pending</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Save Bill</button>
                        </form>
                    </div>
                )}

                {loading ? <p>Loading...</p> : (
                    <div className="card">
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Hospital</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.map(b => (
                                        <tr key={b._id}>
                                            <td>{new Date(b.date).toLocaleDateString()}</td>
                                            <td>{b.hospitalName}</td>
                                            <td>₹{b.amount}</td>
                                            <td>
                                                <span style={{
                                                    padding: '5px 10px',
                                                    borderRadius: '20px',
                                                    background: b.paymentStatus === 'Paid' ? '#d1fae5' : '#fee2e2',
                                                    color: b.paymentStatus === 'Paid' ? '#065f46' : '#991b1b',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {b.paymentStatus}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Download</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bills;
