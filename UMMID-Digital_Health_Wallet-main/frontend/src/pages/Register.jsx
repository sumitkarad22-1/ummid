import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', mobile: '', email: '', address: '', zipCode: '', password: '', confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await axios.post('/api/auth/register', formData);
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
                    UMMID Patient Registration
                </h2>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="grid-2-col">
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="firstName" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastName" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="grid-2-col">
                        <div className="form-group">
                            <label>Mobile (10 digits)</label>
                            <input name="mobile" className="form-control" onChange={handleChange} required pattern="\d{10}" title="10 digit mobile number" />
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="grid-2-col">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} required minLength="6" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required minLength="6" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" className="form-control" rows="3" onChange={handleChange} required></textarea>
                    </div>

                    <div className="form-group">
                        <label>Zip Code</label>
                        <input name="zipCode" className="form-control" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
