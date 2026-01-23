// Example: Updated Packages.jsx to fetch from backend API
// This shows how to integrate your backend with the existing Packages component

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Packages.css';

const Packages = ({ onAddToCart }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch packages from backend on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await api.getPackages();

                // Transform backend data to match your component's format
                const transformedPackages = response.data.packages.map(pkg => ({
                    id: pkg._id,
                    name: pkg.name.toUpperCase(),
                    subtitle: getSubtitle(pkg.name),
                    description: pkg.description,
                    price: pkg.price,
                    features: pkg.features || [],
                    delivery: {
                        digital: pkg.deliveryTime || '24-48 hours',
                        physical: 'Arrives in 2–4 days'
                    },
                    badge: pkg.isPopular ? 'Most Popular' : null,
                    gradient: getGradient(pkg.name)
                }));

                setPackages(transformedPackages);
                setError(null);
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError('Failed to load packages. Please try again later.');

                // Fallback to hardcoded packages if backend fails
                setPackages(getFallbackPackages());
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Helper function to get subtitle based on package name
    const getSubtitle = (name) => {
        const subtitles = {
            'Silvernova': 'Our Entry Package',
            'Supernova': 'Our Most Popular Package',
            'Duonova': 'A Star Pair'
        };
        return subtitles[name] || 'Premium Package';
    };

    // Helper function to get gradient based on package name
    const getGradient = (name) => {
        const gradients = {
            'Silvernova': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'Supernova': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'Duonova': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        };
        return gradients[name] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    // Fallback packages if backend is not available
    const getFallbackPackages = () => [
        {
            id: 'silvernova',
            name: 'SILVERNOVA',
            subtitle: 'Our Entry Package',
            description: 'A meaningful gift at an unbeatable price – start your journey to the stars!',
            price: 1499,
            features: [
                'Name a guaranteed visible star',
                'Lifetime registration in the International Space Registry',
                'Digital or Physical Package – Includes certificate & documents',
                'Localize your star anytime with our AR app'
            ],
            delivery: {
                digital: 'Ready in 15 minutes',
                physical: 'Arrives in 2–4 days'
            },
            badge: null,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'supernova',
            name: 'SUPERNOVA',
            subtitle: 'Our Most Popular Package',
            description: 'A best-selling gift that shines bright – perfect for any occasion!',
            price: 2499,
            features: [
                'Name a guaranteed visible star in a constellation of your choice',
                'Easier to locate in the night sky',
                'Lifetime registration in the International Space Registry',
                'Digital or Physical Package – Includes certificate & documents',
                'Localize your star anytime with our AR app'
            ],
            delivery: {
                digital: 'Ready in 15 minutes',
                physical: 'Arrives in 2–4 days'
            },
            badge: 'Most Popular',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 'duonova',
            name: 'DUONOVA',
            subtitle: 'A Star Pair',
            description: 'A unique celestial bond – because some stars are meant to shine together!',
            price: 3999,
            features: [
                'Name two guaranteed visible stars that orbit together – a rare and meaningful pairing',
                'Perfect for couples, best friends, or a symbol of eternal connection',
                'Two personalized certificates featuring both stars\' coordinates',
                'Lifetime registration in the International Space Registry',
                'Digital or Physical Package – Includes all documents & certificates',
                'Localize your stars anytime with our AR app'
            ],
            delivery: {
                digital: 'Ready in 15 minutes',
                physical: 'Arrives in 2–4 days'
            },
            badge: null,
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    ];

    // Loading state
    if (loading) {
        return (
            <section id="packages" className="packages section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Discover Our Gift Sets</h2>
                        <p>Loading packages...</p>
                    </div>
                    <div className="loading-spinner">
                        {/* Add your loading spinner here */}
                        <div className="spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state (still shows fallback packages)
    if (error) {
        console.warn('Using fallback packages:', error);
    }

    return (
        <section id="packages" className="packages section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Discover Our Gift Sets</h2>
                    <p>Choose the perfect package to create an unforgettable memory</p>
                </div>

                <div className="packages-grid">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="package-card">
                            {pkg.badge && (
                                <div className="package-badge" style={{ background: pkg.gradient }}>
                                    {pkg.badge}
                                </div>
                            )}

                            <div className="package-header">
                                <h3 className="package-name">{pkg.name}</h3>
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
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="package-delivery">
                                <div className="delivery-info">
                                    <strong>Delivery:</strong>
                                    <div>Digital Documents: {pkg.delivery.digital}</div>
                                    <div>Gift Package: {pkg.delivery.physical}</div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary package-btn"
                                onClick={() => onAddToCart({
                                    id: pkg.id,
                                    name: pkg.name,
                                    price: pkg.price,
                                    type: 'digital'
                                })}
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
