import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, logout } from '../services/api';
import './Account.css';

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user profile
                const userResponse = await api.getCurrentUser();
                if (userResponse.success) {
                    setUser(userResponse.data);
                }

                // Fetch orders
                const ordersResponse = await api.getOrders();
                if (ordersResponse.success) {
                    setOrders(ordersResponse.data);
                }
            } catch (err) {
                console.error('Error fetching account data:', err);
                setError('Failed to load account data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="account-page d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="account-page">
                <div className="container py-5 text-center">
                    <h3 className="text-danger">{error}</h3>
                    <p className="text-secondary mt-2">Your session may have expired.</p>
                    <div className="d-flex gap-3 justify-content-center mt-3">
                        <button className="btn btn-outline-danger" onClick={() => { logout(); navigate('/auth'); }}>
                            Login Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="account-page">
                <div className="container py-5 text-center">
                    <h3>Please log in to view your account</h3>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/auth')}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const memberSince = formatDate(user.createdAt || new Date());
    const starsNamed = orders.length;

    return (
        <div className="account-page">
            <div className="account-container">
                <header className="account-header">
                    <h1>User Dashboard</h1>
                    <p className="text-secondary">Manage your star naming portfolio and registry activity</p>
                </header>

                <div className="account-layout">
                    <aside className="profile-sidebar">
                        <div className="profile-avatar-container">
                            <div className="avatar-main">{user.name ? user.name[0].toUpperCase() : 'U'}</div>
                            <div className="avatar-ring"></div>
                        </div>
                        <h3 className="profile-name">{user.name}</h3>
                        <p className="profile-email">{user.email}</p>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <span>Stars Named</span>
                                <span>{starsNamed}</span>
                            </div>
                            <div className="stat-item">
                                <span>Member Since</span>
                                <span>{memberSince}</span>
                            </div>
                        </div>

                        <button className="logout-btn-premium" onClick={handleLogout}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout Account
                        </button>
                    </aside>

                    <main className="dashboard-content">
                        <div className="order-history-card">
                            <div className="card-title-group">
                                <h2>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    Celestial Order History
                                </h2>
                            </div>

                            <div className="premium-table-wrapper">
                                {orders.length === 0 ? (
                                    <div className="text-center py-5">
                                        <p className="text-secondary">No orders yet. Start naming your stars!</p>
                                        <button className="btn btn-primary mt-3" onClick={() => navigate('/shop')}>
                                            Browse Packages
                                        </button>
                                    </div>
                                ) : (
                                    <table className="premium-table">
                                        <thead>
                                            <tr>
                                                <th>Registry ID</th>
                                                <th>Star Name</th>
                                                <th>Date</th>
                                                <th>Payment</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <OrderRow key={order._id} order={order} formatDate={formatDate} />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const OrderRow = ({ order, formatDate }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <tr className={`order-row ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
                <td className="order-id">ORD-{order._id.slice(-6).toUpperCase()}</td>
                <td className="text-white fw-medium">{order.starName || 'Unnamed Star'}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td className="text-capitalize">{order.paymentMethod || 'COD'}</td>
                <td className="fw-bold text-white">₹{order.totalAmount.toLocaleString()}</td>
                <td>
                    <span className={`badge-celestial ${order.orderStatus || 'processing'}`}>
                        {order.orderStatus || 'Processing'}
                    </span>
                </td>
                <td>
                    <button className="btn-icon">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </td>
            </tr>
            {expanded && (
                <tr className="order-details-row">
                    <td colSpan="7">
                        <div className="order-details-content">
                            <div className="detail-grid">
                                <div className="detail-section">
                                    <h5>Dedication</h5>
                                    <p><strong>To:</strong> {order.recipientInfo?.name || 'N/A'}</p>
                                    <p><strong>Message:</strong> {order.dedicationMessage || 'No message'}</p>
                                </div>
                                <div className="detail-section">
                                    <h5>Shipping Details</h5>
                                    <p>{order.shippingAddress?.address}</p>
                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                                    <p>Phone: {order.recipientInfo?.phone}</p>
                                </div>
                                <div className="detail-section">
                                    <h5>Package Info</h5>
                                    <p><strong>Package ID:</strong> {order.package}</p>
                                    <p><strong>Payment Status:</strong> <span className={`status-text ${order.paymentStatus}`}>{order.paymentStatus}</span></p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default Account;
