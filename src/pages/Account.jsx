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

    const handlePrintCertificate = (order) => {
        const printWindow = window.open('', '_blank');
        const starName = order.starName || order.customization?.starName || 'Unnamed Star';
        const date = order.dedicationDate || order.customization?.dedicationDate || new Date().toLocaleDateString();
        const registryId = (order._id || 'unknown').toString().toUpperCase();

        printWindow.document.write(`
            <html>
                <head>
                    <title>Certificate Of Registry - ${starName}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;700&display=swap');
                        
                        body { 
                            margin: 0; 
                            background: #050816;
                            color: #fff;
                            font-family: 'Montserrat', sans-serif;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                        }
                        .certificate-container {
                            width: 1000px;
                            height: 700px;
                            padding: 60px;
                            background: radial-gradient(circle at center, #1e293b 0%, #050816 100%);
                            border: 2px solid #fbbf24;
                            border-radius: 4px;
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                            box-shadow: 0 0 100px rgba(0,0,0,0.5);
                            overflow: hidden;
                        }
                        .certificate-container::before {
                            content: '';
                            position: absolute;
                            top: 0; left: 0; right: 0; bottom: 0;
                            background: url('https://www.transparenttextures.com/patterns/stardust.png');
                            opacity: 0.3;
                            pointer-events: none;
                        }
                        .border-pattern {
                            position: absolute;
                            top: 15px; left: 15px; right: 15px; bottom: 15px;
                            border: 1px solid rgba(251, 191, 36, 0.3);
                            pointer-events: none;
                        }
                        header h2 {
                            font-family: 'Cinzel', serif;
                            color: #fbbf24;
                            font-size: 1.2rem;
                            letter-spacing: 8px;
                            margin-bottom: 40px;
                            text-transform: uppercase;
                        }
                        .cert-title {
                            font-family: 'Cinzel', serif;
                            font-size: 3.5rem;
                            margin: 20px 0;
                            background: linear-gradient(to bottom, #fff, #94a3b8);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                        .presentation {
                            font-weight: 300;
                            font-size: 1.2rem;
                            color: #94a3b8;
                            margin: 20px 0;
                        }
                        .star-name {
                            font-family: 'Cinzel', serif;
                            font-size: 5rem;
                            color: #fbbf24;
                            margin: 30px 0;
                            text-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
                        }
                        .registry-details {
                            margin-top: 40px;
                            border-top: 1px solid rgba(255,255,255,0.1);
                            padding-top: 30px;
                            width: 80%;
                            display: flex;
                            justify-content: space-around;
                        }
                        .detail-item h4 {
                            font-size: 0.7rem;
                            color: #fbbf24;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            margin-bottom: 5px;
                        }
                        .detail-item p {
                            font-size: 1rem;
                            color: #fff;
                        }
                        .seal {
                            position: absolute;
                            bottom: 50px;
                            right: 70px;
                            width: 120px;
                            height: 120px;
                            border: 4px double #fbbf24;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fbbf24;
                            font-family: 'Cinzel', serif;
                            font-weight: bold;
                            font-size: 0.8rem;
                            transform: rotate(-15deg);
                            background: rgba(251, 191, 36, 0.05);
                        }
                        @media print {
                            body { background: #fff !important; color: #000 !important; }
                            .certificate-container { 
                                border: 1px solid #000 !important;
                                background: #fff !important;
                                box-shadow: none !important;
                                width: 100%; height: 100%;
                            }
                            .star-name, .cert-title, header h2, .seal { -webkit-text-fill-color: #000 !important; color: #000 !important; border-color: #000 !important; }
                        }
                    </style>
                </head>
                <body>
                    <div class="certificate-container">
                        <div class="border-pattern"></div>
                        <header>
                            <h2>The Official Celestial Registry</h2>
                        </header>
                        <div class="presentation">THIS ACCREDITATION CERTIFIES THAT</div>
                        <h1 class="cert-title">The Star</h1>
                        <div class="star-name">${starName}</div>
                        <div class="presentation">IS OFFICIALLY RECORDED AND REGISTERED IN OUR PERMANENT ARCHIVES</div>
                        
                        <div class="registry-details">
                            <div class="detail-item">
                                <h4>Registry ID</h4>
                                <p>${registryId}</p>
                            </div>
                            <div class="detail-item">
                                <h4>Registration Date</h4>
                                <p>${date}</p>
                            </div>
                        </div>
                        
                        <div class="seal">OFFICIAL<br>REGISTRY<br>SEAL</div>
                    </div>
                    <script>
                        window.onload = function() { 
                            setTimeout(() => {
                                window.print(); 
                                // window.close(); // Optional: close after print
                            }, 1000);
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
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
                                                        <td className="order-id">#{order._id?.slice(-6).toUpperCase() || 'N/A'}</td>
                                                        <td>{order.package?.name || 'Star Package'}</td>
                                                        <td><strong>{order.starName || order.customization?.starName || 'Unnamed Star'}</strong></td>
                                                        <td>
                                                            <span className={`badge-celestial ${order.paymentStatus}`}>
                                                                {order.paymentStatus}
                                                            </span>
                                                        </td>
                                                        <td className="order-price">₹{(order.totalAmount || order.totalPrice || 0).toLocaleString()}</td>
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
                                                                            <p><strong>Name:</strong> {order.starName || order.customization?.starName}</p>
                                                                            <p><strong>Dedication:</strong> {order.dedicationMessage || order.customization?.dedicationMessage || 'No message'}</p>
                                                                            <p><strong>Date:</strong> {order.dedicationDate || order.customization?.dedicationDate || 'Universal Time'}</p>
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
                                                                                        <p className="cert-star-name">{order.starName || order.customization?.starName}</p>
                                                                                        <div className="cert-footer">Official Seal</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex gap-2 mt-2">
                                                                                    <button className="btn btn-outline-primary btn-sm flex-grow-1" onClick={() => handlePrintCertificate(order)}>
                                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                                                        PDF
                                                                                    </button>
                                                                                    <button className="btn btn-primary btn-sm flex-grow-1" onClick={() => handlePrintCertificate(order)}>
                                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                                                                        Print
                                                                                    </button>
                                                                                </div>
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
