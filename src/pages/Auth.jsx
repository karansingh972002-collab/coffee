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
            {/* Animated Background Blobs */}
            <div className="auth-bg-blob blob-1"></div>
            <div className="auth-bg-blob blob-2"></div>
            <div className="auth-bg-blob blob-3"></div>

            <div className="auth-container">
                <div className="auth-card glass-panel">
                    <div className="auth-header">
                        <div className="auth-icon-premium">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>

                        <h2 className="auth-title">
                            {isLogin ? (
                                <>Welcome <span className="title-highlight">Back</span></>
                            ) : (
                                <>Create <span className="title-highlight">Account</span></>
                            )}
                        </h2>
                        <p className="auth-subtitle">
                            {isLogin
                                ? 'Log in to manage your star registry and explore the cosmos.'
                                : 'Sign up to start naming your own stars and build your galaxy.'}
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error glass-error">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="error-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-fields">
                            {!isLogin && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <div className="input-wrapper">
                                            <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <input
                                                type="text"
                                                name="name"
                                                className="auth-input premium-input"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required={!isLogin}
                                            />
                                            <div className="input-focus-border"></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone <span className="optional-text">(Optional)</span></label>
                                        <div className="input-wrapper">
                                            <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="auth-input premium-input"
                                                placeholder="+91 Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            <div className="input-focus-border"></div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <input
                                        type="email"
                                        name="email"
                                        className="auth-input premium-input"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    <input
                                        type="password"
                                        name="password"
                                        className="auth-input premium-input"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength="6"
                                    />
                                    <div className="input-focus-border"></div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`auth-btn-premium ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            <span className="btn-text">{isLogin ? 'Access Dashboard' : 'Create Registry'}</span>
                            {loading && (
                                <svg className="btn-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                </svg>
                            )}
                            <div className="btn-glow"></div>
                        </button>
                    </form>

                    <div className="auth-footer text-center mt-4">
                        <span className="footer-text">{isLogin ? "New to Star Naming?" : "Already part of the cosmos?"}</span>
                        <button
                            className="auth-toggle-btn-premium"
                            onClick={toggleMode}
                            disabled={loading}
                        >
                            {isLogin ? 'Start your journey' : 'Access account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
