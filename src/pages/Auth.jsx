import { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

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

                <form className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="auth-input" placeholder="Your name" />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="auth-input" placeholder="email@example.com" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="auth-input" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="auth-btn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        className="auth-toggle-btn"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
