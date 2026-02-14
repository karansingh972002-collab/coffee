import './Account.css';

const Account = () => {
    const user = {
        name: 'Karan Singh',
        email: 'karan@example.com',
        memberSince: 'Feb 2026',
        starsNamed: 2
    };

    const orders = [
        { id: 'STR-A92J4N', date: 'Feb 13, 2026', total: 3499, status: 'Delivered' },
        { id: 'STR-B21X8M', date: 'Feb 10, 2026', total: 1999, status: 'Processing' }
    ];

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
                            <div className="avatar-main">{user.name[0]}</div>
                            <div className="avatar-ring"></div>
                        </div>
                        <h3 className="profile-name">{user.name}</h3>
                        <p className="profile-email">{user.email}</p>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <span>Stars Named</span>
                                <span>{user.starsNamed}</span>
                            </div>
                            <div className="stat-item">
                                <span>Member Since</span>
                                <span>{user.memberSince}</span>
                            </div>
                        </div>

                        <button className="logout-btn-premium">
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
                                <table className="premium-table">
                                    <thead>
                                        <tr>
                                            <th>Registry ID</th>
                                            <th>Purchase Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id} className="order-row">
                                                <td className="order-id">{order.id}</td>
                                                <td>{order.date}</td>
                                                <td className="fw-bold text-white">₹{order.total.toLocaleString()}</td>
                                                <td>
                                                    <span className={`badge-celestial ${order.status.toLowerCase()}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Account;
