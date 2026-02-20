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

            <div className="success-card">
                <div className="success-icon">✨</div>
                <h2>Order Placed Successfully!</h2>
                <p>
                    Thank you for naming a star! Your celestial certificate will be prepared shortly.
                </p>

                <div className="order-id-box" onClick={copyOrderId} title="Click to copy">
                    <span>Order ID:</span>
                    <strong>{orderId}</strong>
                    <span className="copy-icon">
                        {copied ? '✅' : '📋'}
                    </span>
                    {copied && <span className="copy-tooltip">Copied!</span>}
                </div>

                <div className="success-features">
                    <h4>What Happens Next?</h4>
                    <ul>
                        <li>We'll prepare your personalized star certificate</li>
                        <li>Digital documents will be ready within 24 hours</li>
                        <li>Physical package ships within 2-4 business days</li>
                        <li>Track your order from your account dashboard</li>
                    </ul>
                </div>

                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
                    <Link to="/account" className="btn btn-outline-secondary">View Order History</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
