import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="success-page container py-5 text-center">
            <div className="success-card glass p-5 rounded d-inline-block mx-auto" style={{ maxWidth: '600px' }}>
                <div className="success-icon mb-4" style={{ fontSize: '5rem' }}>✅</div>
                <h2 className="mb-2">Order Placed Successfully!</h2>
                <p className="text-secondary mb-4">Thank you for your purchase. Your premium laptop will be prepared for shipping shortly.</p>

                <div className="order-id-box p-3 rounded mb-4" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px dashed var(--color-primary)' }}>
                    <span className="text-secondary">Order ID:</span>
                    <strong className="ms-2">{orderId}</strong>
                </div>

                <div className="d-flex gap-3 justify-content-center">
                    <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
                    <Link to="/account" className="btn btn-outline-secondary">View Order History</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
