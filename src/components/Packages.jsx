import './Packages.css';

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Packages.css';

const Packages = ({ onAddToCart, onCustomize }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.getPackages();
                if (response.success) {
                    setPackages(response.data);
                } else {
                    setError('Failed to load packages');
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError('Failed to load packages. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (loading) {
        return (
            <section id="packages" className="packages section text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="packages" className="packages section text-center py-5">
                <p className="text-danger">{error}</p>
            </section>
        );
    }

    return (
        <section id="packages" className="packages section">
            <div className="packages-container">
                <div className="section-header text-center">
                    <span className="section-badge fade-in">Premium Registry</span>
                    <div className="header-title-wrapper">
                        <div className="header-decoration left"></div>
                        <h2 className="premium-title">Discover Our Gift Sets</h2>
                        <div className="header-decoration right"></div>
                    </div>
                    <p className="section-subtitle fade-in">Choose the perfect package to create an <span className="magic-text">unforgettable memory</span></p>
                </div>

                <div className="packages-grid">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="package-card" style={{ '--pkg-gradient': pkg.gradient }}>
                            {pkg.badge && (
                                <div className="package-badge" style={{ background: pkg.gradient }}>
                                    {pkg.badge}
                                </div>
                            )}

                            <div className="package-header">
                                <h3 className="package-name" style={{ backgroundImage: pkg.gradient }}>{pkg.name}</h3>
                                <p className="package-subtitle">{pkg.subtitle}</p>
                                <p className="package-description">{pkg.description}</p>
                            </div>

                            <div className="package-price">
                                <span className="currency">₹</span>
                                <span className="amount">{pkg.price.toLocaleString()}</span>
                            </div>

                            <ul className="package-features">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="feature-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="package-delivery">
                                <div className="delivery-info">
                                    <strong>
                                        <span className="info-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="1" y="3" width="15" height="13"></rect>
                                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                            </svg>
                                        </span>
                                        Logistics & Delivery
                                    </strong>
                                    <div>
                                        <span>Digital Documents:</span>
                                        <strong>{pkg.delivery.digital}</strong>
                                    </div>
                                    <div>
                                        <span>Gift Package:</span>
                                        <strong>{pkg.delivery.physical}</strong>
                                    </div>
                                </div>
                            </div>


                            <button
                                className="btn btn-primary package-btn"
                                onClick={() => {
                                    if (onCustomize) {
                                        onCustomize(pkg);
                                    } else {
                                        onAddToCart({
                                            id: pkg._id,
                                            name: pkg.name,
                                            price: pkg.price,
                                            type: pkg.type,
                                            image: pkg.image || 'https://via.placeholder.com/150'
                                        });
                                    }
                                }}
                                style={{ background: pkg.gradient }}
                            >
                                Name Your Star
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;
