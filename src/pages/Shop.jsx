import { useState, useEffect } from 'react';
import { api } from '../services/api';
import StarCustomizer from '../components/StarCustomizer';
import KnownFrom from '../components/KnownFrom';
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
            try {
                const response = await api.getPackages();
                if (response.success) {
                    setProducts(response.data);
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Unable to connect to server. Please ensure the backend is running.');
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
                <div className="section-header text-center">
                    <div className="section-badge">Celestial Gifts</div>
                    <h2>Name a Star</h2>
                    <p>Choose from our range of official star naming packages. The perfect gift for any occasion.</p>
                </div>

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
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    {product.badge && <div className="product-badge">{product.badge}</div>}
                                    <button
                                        className="wishlist-btn-overlay"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToWishlist && onAddToWishlist({
                                                id: product._id,
                                                name: product.name,
                                                type: product.type,
                                                price: product.price,
                                                image: product.image
                                            });
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
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <p className="product-subtitle">{product.subtitle}</p>
                                    <div className="product-specs">
                                        <span>{product.type}</span> • <span>{product.features.length} features</span>
                                    </div>
                                    <div className="product-footer">
                                        <div className="product-price">₹{product.price.toLocaleString()}</div>
                                        <button className="add-cart-btn" onClick={() => {
                                            setSelectedPkg(product);
                                            setIsModalOpen(true);
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            Name It
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>

            <KnownFrom />
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
