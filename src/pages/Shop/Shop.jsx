import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import StarCustomizer from './StarCustomizer';
import HeartsTouched from '../../components/HeartsTouched';
import './Shop.css';

const Shop = ({ onAddToCart, onAddToWishlist, minimal = false, limit = 0 }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('All');

    // Customization State
    const [selectedPkg, setSelectedPkg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.getPackages();
                if (response.success && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                setError(`Connection error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = filterType === 'All'
        ? products
        : products.filter(p => p.type === filterType);

    const displayedProducts = limit > 0 ? filteredProducts.slice(0, limit) : filteredProducts;

    if (loading) {
        return (
            <div className={`shop-loading ${minimal ? 'section-padding' : 'shop-page'}`}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`shop-error ${minimal ? 'section-padding' : 'shop-page'}`}>
                <div className="text-danger text-center">
                    <h4>{error}</h4>
                    <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    const renderHeader = () => {
        if (minimal) {
            return (
                <div className="section-header text-center mb-5">
                    <span className="section-badge fade-in">Premium Registry</span>
                    <div className="header-title-wrapper">
                        <div className="header-decoration left"></div>
                        <h2 className="premium-title">Discover Our Gift Sets</h2>
                        <div className="header-decoration right"></div>
                    </div>
                    <p className="section-subtitle fade-in">Choose the perfect package to create an <span className="magic-text">unforgettable memory</span></p>
                </div>
            );
        }
        return (
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
        );
    };

    const renderProductCard = (product) => (
        <div key={product._id} className="package-card" style={{ '--pkg-gradient': product.gradient }}>
            {product.badge && (
                <div className="package-badge" style={{ background: product.gradient }}>
                    {product.badge}
                </div>
            )}

            <div className="package-header">
                <h3 className="package-name" style={{ backgroundImage: product.gradient }}>{product.name}</h3>
                <p className="package-subtitle">{product.subtitle}</p>
                <p className="package-description">{product.description}</p>
            </div>

            <div className="package-price">
                <span className="currency">₹</span>
                <span className="amount">{product.price.toLocaleString()}</span>
            </div>

            <ul className="package-features">
                {product.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="feature-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="package-actions">
                <button
                    className="btn btn-primary package-btn"
                    onClick={() => {
                        setSelectedPkg(product);
                        setIsModalOpen(true);
                    }}
                    style={{ background: product.gradient }}
                >
                    Name Your Star
                </button>
                <button
                    className="wishlist-btn-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToWishlist && onAddToWishlist(product);
                    }}
                    title="Add to Wishlist"
                >
                    ♥
                </button>
            </div>
        </div>
    );

    return (
        <div className={minimal ? 'packages-section py-5' : 'shop-page'}>
            <div className={minimal ? 'packages-container' : 'shop-container'}>
                {renderHeader()}

                {minimal ? (
                    <div className="packages-grid">
                        {displayedProducts.map(renderProductCard)}
                    </div>
                ) : (
                    <div className="shop-grid">
                        <aside className="filters-sidebar">
                            <h5>Filters</h5>
                            <div className="filter-group">
                                <label className="filter-label">Package Type</label>
                                <select className="custom-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                    <option value="All">All Packages</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Binary">Binary</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Zodiac">Zodiac</option>
                                </select>
                            </div>
                            <div className="filter-info">
                                <p className="showing-count">{displayedProducts.length} packages available</p>
                            </div>
                        </aside>

                        <main className="packages-grid">
                            {displayedProducts.map(renderProductCard)}
                        </main>
                    </div>
                )}
            </div>

            {!minimal && <HeartsTouched />}

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
