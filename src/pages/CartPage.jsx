import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import './CartPage.css';

const CartPage = ({ items, onUpdateQuantity, onRemove, onAddToWishlist }) => {
    const navigate = useNavigate();
    const totalMRP = items.reduce((sum, item) => sum + (item.price * 1.2) * item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = totalMRP - total;

    const handleMoveToWishlist = (item) => {
        if (onAddToWishlist) {
            onAddToWishlist(item);
            onRemove(item.id || item._id);
        }
    };

    if (items.length === 0) {
        return (
            <div className="empty-cart-wrapper">
                <div className="empty-card-premium">
                    <div className="empty-icon-box">
                        <svg className="empty-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            <path d="M7 11h2l1 2h4l1-2h2"></path>
                        </svg>
                    </div>
                    <h4 className="empty-title">Your universe is empty</h4>
                    <p className="empty-subtitle">The stars are waiting to join your galaxy. Let's find your perfect celestial connection today.</p>
                    <Link to="/shop" className="btn-explore">Explore the Cosmos</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            {/* Animated Ambient Orbs */}
            <div className="cart-bg-orb cart-orb-1"></div>
            <div className="cart-bg-orb cart-orb-2"></div>

            <CheckoutSteps activeStep="bag" />

            <div className="cart-container mt-4">
                {/* Left Section: Cart Items */}
                <div className="cart-content-left">

                    {/* Offers Section */}
                    <div className="glass-card offers-card">
                        <div className="offer-content">
                            <div className="offer-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                </svg>
                            </div>
                            <div>
                                <span className="offer-title">AVAILABLE OFFERS</span>
                                <p className="offer-desc">Extra 10% OFF on all Celestial Gift Sets. Code: STAR10</p>
                            </div>
                        </div>
                        <span className="btn-apply">APPLY</span>
                    </div>

                    {/* Items List Card */}
                    <div className="glass-card">
                        <div className="card-header">
                            <h4 className="card-title">
                                <span className="card-title-dot"></span>
                                Chosen Packages
                            </h4>
                            <span className="item-count-badge">{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
                        </div>

                        {items.map(item => (
                            <div key={item.id || item._id} className="cart-item-premium">
                                <div className="item-main-grid">
                                    <div className="item-image-box">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details-box">
                                        <h5 className="item-brand">{item.brand || 'Celestial Gift'}</h5>
                                        <p className="item-name">{item.name}</p>

                                        {item.customization && (
                                            <div className="customization-pill">
                                                <div className="cust-row">
                                                    <span className="cust-label">Star Name:</span>
                                                    <span className="cust-value">{item.customization.starName}</span>
                                                </div>
                                                <div className="cust-row">
                                                    <span className="cust-label">Registry Date:</span>
                                                    <span className="cust-value">{item.customization.dedicationDate}</span>
                                                </div>
                                                {item.customization.message && (
                                                    <div className="cust-row">
                                                        <span className="cust-label">Message:</span>
                                                        <span className="cust-value cust-message">"{item.customization.message}"</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="item-controls">
                                            <div className="qty-wrapper">
                                                <span className="qty-label">QTY</span>
                                                <div className="qty-selector">
                                                    <button className="qty-btn" onClick={() => onUpdateQuantity(item.id || item._id, item.quantity - 1)}>-</button>
                                                    <span className="qty-val">{item.quantity}</span>
                                                    <button className="qty-btn" onClick={() => onUpdateQuantity(item.id || item._id, item.quantity + 1)}>+</button>
                                                </div>
                                            </div>

                                            <div className="price-display">
                                                <span className="current-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                <div className="price-meta">
                                                    <span className="mrp-price">₹{(item.price * 1.2 * item.quantity).toLocaleString()}</span>
                                                    <span className="discount-badge">20% OFF</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item-actions-panel">
                                    <button className="action-btn remove" onClick={() => onRemove(item.id || item._id)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Remove
                                    </button>
                                    <button className="action-btn wishlist" onClick={() => handleMoveToWishlist(item)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        Move to Wishlist
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: Summary & Checkout */}
                <div className="cart-sidebar-right">

                    {/* Trust Badges */}
                    <div className="glass-card summary-card">
                        <div className="info-row">
                            <div className="info-icon green">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                            </div>
                            <div>
                                <div className="info-label">DELIVERY ESTIMATES</div>
                                <div className="info-value">Dispatched in <span className="info-highlight">24 Hours</span></div>
                            </div>
                        </div>
                        <div className="info-row">
                            <div className="info-icon blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div>
                                <div className="info-label">SECURE REGISTRY</div>
                                <div className="info-value">100% Certified Registration</div>
                            </div>
                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="glass-card summary-card">
                        <h4 className="summary-header">Price Summary</h4>

                        <div className="summary-row">
                            <span>Package MRP</span>
                            <span>₹{Math.floor(totalMRP).toLocaleString()}</span>
                        </div>
                        <div className="summary-row discount">
                            <span>Celestial Discount</span>
                            <span>-₹{Math.floor(discount).toLocaleString()}</span>
                        </div>
                        <div className="summary-row discount">
                            <span>Delivery Fee</span>
                            <span>FREE</span>
                        </div>

                        <div className="summary-row total">
                            <span>Total Payable</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <button onClick={() => navigate('/checkout')} className="btn-checkout-premium">
                            Secure Checkout
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
