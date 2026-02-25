import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import StarCustomizer from '../components/StarCustomizer';
import HeartsTouched from '../components/HeartsTouched';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart, onAddToWishlist }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Try fetching from API
                const response = await api.getPackageById(id);
                if (response.success) {
                    setProduct(response.data);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="product-details-page d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-details-page">
                <div className="container py-5 text-center">
                    <h3 className="text-danger">{error || 'Product not found'}</h3>
                    <Link to="/shop" className="btn btn-primary mt-3">Back to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                <nav className="breadcrumb-nav">
                    <Link to="/shop">Store</Link> / <span>{product.name}</span>
                </nav>

                <div className="product-layout">
                    <div className="product-visual">
                        <div className="main-image-wrapper glass">
                            <img src={product.image} alt={product.name} className="main-product-image" loading="lazy" />
                            {product.badge && <div className="product-status-badge">{product.badge}</div>}
                        </div>
                    </div>

                    <div className="product-content">
                        <div className="content-inner glass">
                            <span className="product-type-badge">{product.type}</span>
                            <h1 className="premium-title">{product.name}</h1>
                            <p className="subtitle-text">{product.subtitle}</p>

                            <div className="price-tag">
                                <span className="currency">₹</span>
                                <span className="amount">{product.price.toLocaleString()}</span>
                            </div>

                            <p className="product-description">{product.description}</p>

                            <div className="feature-list-section">
                                <div className="section-header">
                                    <div className="header-title-wrapper mini">
                                        <div className="header-decoration left"></div>
                                        <h3 className="premium-title-mini">What's Included:</h3>
                                        <div className="header-decoration right"></div>
                                    </div>
                                </div>
                                <ul className="details-features">
                                    {product.features?.map((feature, index) => (
                                        <li key={index}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="purchase-actions">
                                <button className="add-to-cart-big" onClick={() => setIsModalOpen(true)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    Name Your Star Now
                                </button>
                                <button
                                    className="wishlist-btn-large"
                                    title="Add to Wishlist"
                                    onClick={() => onAddToWishlist && onAddToWishlist(product)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="shipping-notice">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                                <span>Free Express Shipping in India (2-4 Days)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <HeartsTouched />
            </div>

            <StarCustomizer
                pkg={product}
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

export default ProductDetails;
