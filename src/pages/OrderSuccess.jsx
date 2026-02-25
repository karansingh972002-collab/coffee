import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './OrderSuccess.css';

const OrderSuccess = () => {
    // Get the latest order ID from sessionStorage (if set by checkout)
    const [orderId] = useState(() => sessionStorage.getItem('lastOrderId') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Clear the order ID from storage
        sessionStorage.removeItem('lastOrderId');
    }, []);

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="success-page">
            {/* CSS Confetti */}
            <div className="confetti-container">
                {[...Array(20)].map((_, i) => <div key={i} className="confetti"></div>)}
            </div>

            <div className="success-card glass">
                <div className="success-icon-container">
                    <div className="success-icon">✨</div>
                    <div className="icon-glow"></div>
                </div>
                <h2>A New Star Is Born!</h2>
                <p className="success-lead">
                    Your request to name a star has been registered in the eternal cosmic database.
                </p>

                <div className="order-id-box" onClick={copyOrderId} title="Click to copy">
                    <span className="id-label">Registration ID:</span>
                    <strong className="id-value">{orderId}</strong>
                    <div className="copy-action">
                        {copied ? <span className="text-success">✅</span> : <span className="text-primary-light">📋</span>}
                    </div>
                </div>

                <div className="success-features">
                    <h4>Next Celestial Steps</h4>
                    <ul className="steps-list">
                        <li>
                            <div className="step-num">01</div>
                            <div className="step-text">Check your email for an instant digital copy of your certificate.</div>
                        </li>
                        <li>
                            <div className="step-num">02</div>
                            <div className="step-text">Our cartographers are prepping your physical gift pack (2-4 days).</div>
                        </li>
                        <li>
                            <div className="step-num">03</div>
                            <div className="step-text">View your star coordinates and track delivery in your dashboard.</div>
                        </li>
                    </ul>
                </div>

                <div className="action-buttons">
                    <Link to="/account" className="btn-primary-glow">View My Star Registry</Link>
                    <Link to="/shop" className="btn-outline-celestial">Continue Exploring</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
