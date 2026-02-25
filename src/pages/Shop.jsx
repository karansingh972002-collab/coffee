import { useState, useEffect } from 'react';
import api from '../services/api';
import StarCustomizer from '../components/StarCustomizer';
import HeartsTouched from '../components/HeartsTouched';
import './Shop.css';

const Shop = ({ onAddToCart, onAddToWishlist }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('All');

    // Customization State
    const [selectedPkg, setSelectedPkg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('Shop: Fetching products...');
            try {
                const response = await api.getPackages();
                console.log('Shop: API Response:', response);
                if (response.success && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setError('Failed to load products: Invalid data format');
                }
            } catch (err) {
                console.error('Shop: Error fetching products:', err);
                setError(`Unable to connect to server: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = filterType === 'All'
        ? products
        : products.filter(p => p.type === filterType);

    if (loading) {
        return (
            <div className="shop-page d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shop-page d-flex justify-content-center align-items-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <div className="text-danger text-center">
                    <h4>{error}</h4>
                    <p className="text-muted">
                        Make sure the backend server is running on port 5000.
                    </p>
                    <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-page">
            <div className="shop-container">
                <section className="shop-hero">
                    <div className="container">
                        <div className="section-header text-center">
                            <span className="section-badge fade-in">Stellar Registry</span>
                            <div className="header-title-wrapper">
                                <div className="header-decoration left"></div>
                                <h2 className="premium-title">Celestial Gift Shop</h2>
                                <div className="header-decoration right"></div>
                            </div>
                            <p className="section-subtitle fade-in">Select the perfect package to <span className="magic-text">immortalize your star</span> in the night sky</p>
                        </div>
                    </div>
                </section>


                <div className="shop-grid">
                    <aside className="filters-sidebar">
                        <h5>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="21" x2="4" y2="14"></line>
                                <line x1="4" y1="10" x2="4" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12" y2="3"></line>
                                <line x1="20" y1="21" x2="20" y2="16"></line>
                                <line x1="20" y1="12" x2="20" y2="3"></line>
                                <line x1="1" y1="14" x2="7" y2="14"></line>
                                <line x1="9" y1="8" x2="15" y2="8"></line>
                                <line x1="17" y1="16" x2="23" y2="16"></line>
                            </svg>
                            Filters
                        </h5>
                        <div className="filter-group">
                            <label className="filter-label">Package Type</label>
                            <select className="custom-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="All">All Packages</option>
                                <option value="Standard">Standard (Silvernova)</option>
                                <option value="Premium">Premium (Supernova)</option>
                                <option value="Binary">Binary (Duonova)</option>
                                <option value="Luxury">Luxury (Diamondnova)</option>
                                <option value="Zodiac">Zodiac (Special)</option>
                                <option value="Kids">Kids (Little Star)</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Price Range</label>
                            <div className="price-pills">
                                <div className="price-pill">Under ₹2,000</div>
                                <div className="price-pill">₹2,000 - ₹3,000</div>
                                <div className="price-pill">₹3,000+</div>
                            </div>
                        </div>

                        <div className="filter-info">
                            <p className="showing-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'package' : 'packages'} available</p>
                        </div>
                    </aside>

                    <main className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-image-container">
                                    <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                                    {product.badge && <div className="product-badge">{product.badge}</div>}
                                    <button
                                        className="wishlist-btn-overlay"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToWishlist && onAddToWishlist(product);
                                        }}
                                    >
                                        ♥
                                    </button>
                                    <div className="product-overlay">
                                        <div className="overlay-features">
                                            {product.features.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="feature-item-overlay">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <button className="view-details-btn" onClick={() => {
                                            setSelectedPkg(product);
                                            setIsModalOpen(true);
                                        }}>
                                            Name Your Star
                                        </button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <p className="product-subtitle">{product.subtitle}</p>
                                    <div className="product-footer">
                                        <div className="product-price">₹{product.price.toLocaleString()}</div>
                                        <span className="pkg-type-tag">{product.type}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>

            <HeartsTouched />

            <StarCustomizer
                pkg={selectedPkg}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={(customized) => {
                    onAddToCart(customized);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
};

export default Shop;
