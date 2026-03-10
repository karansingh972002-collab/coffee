import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStats = async () => {
        setLoading(true);
        setError('');
        try {
            // Verify admin access and fetch stats
            // We use the general api config to pass the token
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/auth');
                return;
            }

            const response = await fetch(`${api.baseURL}/admin/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch admin statistics');
            }

            setStats(data.data);
        } catch (err) {
            setError(err.message || 'An error occurred while loading the dashboard');
            // Check if it's an auth error (401/403) and redirect if necessary
            if (err.message.includes('authorized') || err.message.includes('role')) {
                navigate('/account'); // Redirect back to normal account if not admin
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [navigate]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${api.baseURL}/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update order status');
            }

            // Refresh stats to show updated status
            fetchStats();
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="admin-dashboard-page admin-loader">
                <div className="spinner"></div>
                <h2>Loading Control Center...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-dashboard-page">
                <div className="admin-error">
                    <h3>Access Denied / Error</h3>
                    <p>{error}</p>
                    <button onClick={() => navigate('/account')} className="btn-refresh mt-4" style={{ margin: '20px auto 0' }}>Return to Account</button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-page">
            <div className="admin-bg-blob admin-blob-1"></div>
            <div className="admin-bg-blob admin-blob-2"></div>

            <div className="admin-container">
                <header className="admin-header">
                    <div className="admin-title-box">
                        <div className="admin-icon-box">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <div>
                            <h1 className="admin-title">Control Center</h1>
                            <span className="admin-subtitle">Platform overview and management</span>
                        </div>
                    </div>

                    <div className="admin-actions">
                        <button onClick={fetchStats} className="btn-refresh" disabled={loading}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                            Refresh Data
                        </button>
                    </div>
                </header>

                {stats && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon revenue">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Revenue</span>
                                    <h3 className="stat-value">₹{(stats.totalRevenue || 0).toLocaleString()}</h3>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon orders">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Orders</span>
                                    <h3 className="stat-value">{stats.totalOrders || 0}</h3>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon users">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Users</span>
                                    <h3 className="stat-value">{stats.totalUsers || 0}</h3>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon packages">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Packages Configured</span>
                                    <h3 className="stat-value">{stats.totalPackages || 0}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-grid">
                            <section className="admin-section">
                                <div className="section-header">
                                    <h2 className="section-title">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        Recent Orders
                                    </h2>
                                    <span className="section-badge">Latest 5</span>
                                </div>

                                {stats.recentOrders && stats.recentOrders.length > 0 ? (
                                    <div className="admin-table-container">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Order Ref</th>
                                                    <th>Customer</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stats.recentOrders.map(order => (
                                                    <tr key={order._id || order.id}>
                                                        <td>
                                                            <span className="order-id">#{String(order._id || order.id).slice(-6).toUpperCase()}</span>
                                                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                        </td>
                                                        <td>
                                                            <span className="customer-name">{order.user?.name || 'Guest User'}</span>
                                                            <span className="customer-email">{order.user?.email || order.shippingAddress?.email || 'N/A'}</span>
                                                        </td>
                                                        <td>
                                                            <span className="order-amount">₹{(order.totalAmount || 0).toLocaleString()}</span>
                                                        </td>
                                                        <td>
                                                            <div className="status-cell">
                                                                <select
                                                                    className="status-select"
                                                                    value={order.status}
                                                                    onChange={(e) => handleStatusUpdate(order._id || order.id, e.target.value)}
                                                                >
                                                                    <option value="Processing">Processing</option>
                                                                    <option value="Confirmed">Confirmed</option>
                                                                    <option value="Shipped">Shipped</option>
                                                                    <option value="Delivered">Delivered</option>
                                                                    <option value="Cancelled">Cancelled</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <p>No orders found in the system yet.</p>
                                    </div>
                                )}
                            </section>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
