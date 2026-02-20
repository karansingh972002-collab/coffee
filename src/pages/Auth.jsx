import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // Login
                const response = await api.login({
                    email: formData.email,
                    password: formData.password
                });

                if (response.success) {
                    // Token is already stored by api.login
                    navigate('/account');
                }
            } else {
                // Register
                if (!formData.name) {
                    setError('Please enter your name');
                    setLoading(false);
                    return;
                }

                const response = await api.register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone || ''
                });

                if (response.success) {
                    // Token is already stored by api.register
                    navigate('/account');
                }
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            name: '',
            email: '',
            password: '',
            phone: ''
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-icon-simple">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>

                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="auth-subtitle">
                    {isLogin
                        ? 'Log in to manage your star registry'
                        : 'Sign up to start naming your own stars'}
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="auth-input"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="auth-input"
                                    placeholder="+91 1234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="auth-input"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="auth-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        className="auth-toggle-btn"
                        onClick={toggleMode}
                        disabled={loading}
                    >
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
