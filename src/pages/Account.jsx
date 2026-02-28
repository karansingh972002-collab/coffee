import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, logout } from '../services/api';
import './Account.css';

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);

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

    const toggleOrderDetails = (id) => {
        if (expandedOrder === id) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(id);
        }
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
    return (
        <div className="account-page">
            <div className="account-container">
                <header className="account-header">
                    <div className="header-content">
                        <h1 className="dashboard-title">
                            <span className="title-glow">User Dashboard</span>
                        </h1>
                        <p className="dashboard-subtitle">
                            Welcome back, <span className="user-name-highlight">{user?.name}</span>. Your universe is waiting.
                            <svg className="sparkle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                        </p>
                    </div>
                </header>

                <div className="account-layout">
                    <aside className="profile-sidebar glass">
                        <div className="profile-avatar-container">
                            <div className="avatar-main">{user?.name?.charAt(0)}</div>
                            <div className="avatar-ring"></div>
                        </div>
                        <h3 className="profile-name">{user?.name}</h3>
                        <p className="profile-email">{user?.email}</p>

                        <div className="sidebar-nav">
                            <button className="nav-item active">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                Overview
                            </button>
                            <button className="nav-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                Wishlist
                            </button>
                            <button className="nav-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                Security
                            </button>
                        </div>

                        <button className="logout-btn-premium" onClick={handleLogout}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </aside>

                    <div className="dashboard-content">
                        <section className="dashboard-stats-grid">
                            <div className="dashboard-stat-card glass">
                                <div className="stat-icon-wrapper orders">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{orders.length}</span>
                                    <span className="stat-label">Total Orders</span>
                                </div>
                            </div>
                            <div className="dashboard-stat-card glass">
                                <div className="stat-icon-wrapper stars">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{orders.filter(o => o.paymentStatus === 'completed').length}</span>
                                    <span className="stat-label">Named Stars</span>
                                </div>
                            </div>
                            <div className="dashboard-stat-card glass">
                                <div className="stat-icon-wrapper security">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">Verified</span>
                                    <span className="stat-label">Account Status</span>
                                </div>
                            </div>
                        </section>

                        <div className="order-history-card glass">
                            <div className="card-title-group">
                                <h2>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                        <polyline points="13 2 13 9 20 9"></polyline>
                                    </svg>
                                    Recent Registries
                                </h2>
                            </div>

                            {orders.length === 0 ? (
                                <div className="no-orders text-center py-5">
                                    <p>You haven't immortalized any stars yet.</p>
                                    <Link to="/shop" className="btn-premium-action">Start Naming</Link>
                                </div>
                            ) : (
                                <div className="premium-table-wrapper">
                                    <table className="premium-table">
                                        <thead>
                                            <tr>
                                                <th>Registry ID</th>
                                                <th>Package</th>
                                                <th>Star Name</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <React.Fragment key={order._id}>
                                                    <tr
                                                        className={`order-row ${expandedOrder === order._id ? 'expanded' : ''}`}
                                                        onClick={() => toggleOrderDetails(order._id)}
                                                    >
                                                        <td className="order-id">#{order._id.slice(-6).toUpperCase()}</td>
                                                        <td>{order.package?.name || 'Star Package'}</td>
                                                        <td><strong>{order.customization?.starName || 'Unnamed Star'}</strong></td>
                                                        <td>
                                                            <span className={`badge-celestial ${order.paymentStatus}`}>
                                                                {order.paymentStatus}
                                                            </span>
                                                        </td>
                                                        <td className="order-price">₹{order.totalPrice.toLocaleString()}</td>
                                                        <td className="text-right">
                                                            <button className="btn-icon">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M6 9l6 6 6-6"></path>
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {expandedOrder === order._id && (
                                                        <tr className="order-details-row">
                                                            <td colSpan="6">
                                                                <div className="order-details-content">
                                                                    <div className="detail-grid">
                                                                        <div className="detail-section">
                                                                            <h5>Star Information</h5>
                                                                            <p><strong>Name:</strong> {order.customization?.starName}</p>
                                                                            <p><strong>Dedication:</strong> {order.customization?.dedicationMessage || 'No message'}</p>
                                                                            <p><strong>Date:</strong> {order.customization?.dedicationDate || 'Universal Time'}</p>
                                                                        </div>
                                                                        <div className="detail-section">
                                                                            <h5>Order Details</h5>
                                                                            <p><strong>ID:</strong> {order._id}</p>
                                                                            <p><strong>Package:</strong> {order.package?.name}</p>
                                                                            <p><strong>Payment:</strong> <span className={`status-text ${order.paymentStatus}`}>{order.paymentStatus}</span></p>
                                                                        </div>

                                                                        {order.paymentStatus === 'completed' && (
                                                                            <div className="detail-section certificate-preview-section">
                                                                                <h5>Your Certificate</h5>
                                                                                <div className="certificate-thumbnail glass">
                                                                                    <div className="cert-inner">
                                                                                        <h4>Certificate of Registry</h4>
                                                                                        <p className="cert-star-name">{order.customization?.starName}</p>
                                                                                        <div className="cert-footer">Official Seal</div>
                                                                                    </div>
                                                                                </div>
                                                                                <button className="btn btn-outline-primary btn-sm w-100 mt-2">
                                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                                                    Download PDF
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
