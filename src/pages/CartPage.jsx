import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import './CheckoutCelestial.css';

const CartPage = ({ items, onUpdateQuantity, onRemove, onAddToWishlist }) => {
    const navigate = useNavigate();
    const totalMRP = items.reduce((sum, item) => sum + (item.price * 1.2) * item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = totalMRP - total;

    const handleMoveToWishlist = (item) => {
        if (onAddToWishlist) {
            onAddToWishlist(item);
            onRemove(item.id);
        }
    };

    if (items.length === 0) {
        return (
            <div className="cart-page container py-5 text-center">
                <div className="empty-state-card glass">
                    <div className="empty-state-visual">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-svg">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            <path d="M7 11h2l1 2h4l1-2h2"></path>
                        </svg>
                        <div className="star-particles">
                            <span>✦</span><span>✧</span><span>✦</span>
                        </div>
                    </div>
                    <h4 className="empty-title">Your celestial bag is empty</h4>
                    <p className="empty-subtitle">The stars are waiting to join your galaxy. Let's find your perfect connection today.</p>
                    <Link to="/shop" className="btn-place-order explore-btn">EXPLORE THE UNIVERSE</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <CheckoutSteps activeStep="bag" />

            <div className="checkout-container">
                {/* Left Section: Cart Items */}
                <div className="checkout-left">
                    {/* Offers Section */}
                    <div className="checkout-card" style={{ padding: '20px 28px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-celestial)" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                    </svg>
                                </div>
                                <div>
                                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', letterSpacing: '0.05em' }}>AVAILABLE OFFERS</span>
                                    <p style={{ fontSize: '13px', color: 'var(--celestial-text-secondary)', margin: '4px 0 0' }}>Extra 10% OFF on all Celestial Gift Sets. Code: STAR10</p>
                                </div>
                            </div>
                            <span style={{ color: 'var(--accent-glow)', fontWeight: 800, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.1em', padding: '8px 16px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '20px' }}>APPLY</span>
                        </div>
                    </div>

                    <div className="checkout-card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '8px', height: '8px', background: 'var(--accent-celestial)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px var(--accent-celestial)' }}></span>
                                Chosen Packages
                            </h4>
                            <span style={{ fontSize: '0.9rem', color: 'var(--celestial-text-secondary)', fontWeight: 600 }}>{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
                        </div>

                        {items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                                    <div className="cart-item-image-wrapper">
                                        <img src={item.image} alt={item.name} className="cart-item-img" />
                                    </div>
                                    <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column' }}>
                                        <h5 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{item.brand || 'Celestial Gift'}</h5>
                                        <p style={{ fontSize: '1.1rem', color: '#fff', margin: '0 0 16px', fontWeight: 600 }}>{item.name}</p>

                                        {item.customization && (
                                            <div className="item-customization mb-3" style={{ fontSize: '13px', color: '#e2e8f0', background: 'rgba(99, 102, 241, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.15)', backdropFilter: 'blur(10px)' }}>
                                                <div style={{ marginBottom: '8px', display: 'flex' }}><span style={{ color: 'var(--accent-glow)', fontWeight: 700, width: '110px' }}>Star Name:</span> <span>{item.customization.starName}</span></div>
                                                <div style={{ marginBottom: '8px', display: 'flex' }}><span style={{ color: 'var(--accent-glow)', fontWeight: 700, width: '110px' }}>Registry Date:</span> <span>{item.customization.dedicationDate}</span></div>
                                                {item.customization.message && (
                                                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--accent-glow)', fontWeight: 700, width: '110px' }}>Message:</span> <span style={{ flex: 1, fontStyle: 'italic' }}>"{item.customization.message}"</span></div>
                                                )}
                                            </div>
                                        )}

                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--celestial-text-secondary)', fontWeight: 600 }}>QUANTITY</span>
                                                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                    <button className="btn btn-sm" style={{ width: '32px', height: '32px', padding: 0, color: 'white', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', fontWeight: 800 }} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span style={{ width: '40px', textAlign: 'center', fontWeight: 800, fontSize: '1.1rem' }}>{item.quantity}</span>
                                                    <button className="btn btn-sm" style={{ width: '32px', height: '32px', padding: 0, color: 'white', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', fontWeight: 800 }} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '10px 16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--celestial-text-secondary)', textDecoration: 'line-through' }}>₹{(item.price * 1.2 * item.quantity).toLocaleString()}</span>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--celestial-green)', fontWeight: 800 }}>20% OFF</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item-actions-footer" style={{ margin: '24px -32px -32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <button className="action-btn" onClick={() => onRemove(item.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Remove
                                    </button>
                                    <button className="action-btn" onClick={() => handleMoveToWishlist(item)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        Move to Wishlist
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: Price Details */}
                <div className="checkout-right">
                    <div className="checkout-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '16px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--celestial-green)" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--celestial-text-secondary)', letterSpacing: '0.1em', marginBottom: '4px' }}>DELIVERY ESTIMATES</div>
                                <div style={{ fontSize: '0.95rem', color: '#fff' }}>Delivered by <span style={{ fontWeight: 800, color: 'var(--celestial-green)' }}>24 Oct 2026</span></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '16px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-celestial)" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--celestial-text-secondary)', letterSpacing: '0.1em', marginBottom: '4px' }}>SECURE REGISTRY</div>
                                <div style={{ fontSize: '0.95rem', color: '#fff' }}>100% Verified Registration</div>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-card">
                        <div className="price-details-header">Price Summary</div>

                        <div className="price-row">
                            <span>Package MRP ({items.length} items)</span>
                            <span>₹{Math.floor(totalMRP).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Celestial Discount</span>
                            <span className="price-discount">-₹{Math.floor(discount).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Delivery Fee</span>
                            <span><span style={{ textDecoration: 'line-through', marginRight: '8px', color: 'var(--celestial-text-secondary)', fontSize: '0.9rem' }}>₹99</span> <span className="price-discount">FREE</span></span>
                        </div>

                        <div className="price-row total">
                            <span>Total Payable</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <button onClick={() => navigate('/checkout')} className="btn-place-order">
                            PROCEED TO SECURE CHECKOUT
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px', verticalAlign: 'text-bottom' }}>
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
