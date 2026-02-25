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
                    <div className="checkout-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#818cf8', letterSpacing: '0.05em' }}>AVAILABLE OFFERS</span>
                                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0' }}>Extra 10% OFF on all Celestial Gift Sets. Code: STAR10. TCA</p>
                            </div>
                            <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.1em' }}>MORE</span>
                        </div>
                    </div>

                    <div className="checkout-card" style={{ padding: 0 }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Chosen Packages ({items.length})</h4>
                        </div>

                        {items.map(item => (
                            <div key={item.id} style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
                                    </div>
                                    <div style={{ marginLeft: '24px', flex: 1, minWidth: '250px' }}>
                                        <h5 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.brand || 'Celestial Gift'}</h5>
                                        <p style={{ fontSize: '1rem', color: '#fff', margin: '0 0 12px', fontWeight: 500 }}>{item.name}</p>

                                        {item.customization && (
                                            <div className="item-customization mb-3" style={{ fontSize: '13px', color: '#cbd5e1', background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                                <div style={{ marginBottom: '6px' }}><span style={{ color: '#818cf8', fontWeight: 600 }}>Star Name:</span> {item.customization.starName}</div>
                                                <div style={{ marginBottom: '6px' }}><span style={{ color: '#818cf8', fontWeight: 600 }}>Registry Date:</span> {item.customization.dedicationDate}</div>
                                                {item.customization.message && (
                                                    <div><span style={{ color: '#818cf8', fontWeight: 600 }}>Message:</span> {item.customization.message}</div>
                                                )}
                                            </div>
                                        )}

                                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>Category: Celestial Gift</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, color: '#fff' }}>Qty: {item.quantity} </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="btn btn-sm btn-outline-secondary" style={{ width: '28px', height: '28px', padding: 0, color: 'white', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <button className="btn btn-sm btn-outline-secondary" style={{ width: '28px', height: '28px', padding: 0, color: 'white', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                            <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹{(item.price * 1.2 * item.quantity).toLocaleString()}</span>
                                            <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700 }}>(20% OFF)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="item-actions-footer">
                                    <button className="action-btn" onClick={() => onRemove(item.id)}>REMOVE</button>
                                    <button className="action-btn" onClick={() => handleMoveToWishlist(item)}>MOVE TO WISHLIST</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: Price Details */}
                <div className="checkout-right">
                    <div className="checkout-card" style={{ padding: '20px' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '12px', letterSpacing: '0.1em' }}>DELIVERY ESTIMATES</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: '#fff' }}>Estimated delivery by <span style={{ fontWeight: 800, color: '#818cf8' }}>24 Oct 2026</span></div>
                        </div>
                    </div>

                    <div className="checkout-card">
                        <div className="price-details-header">PRICE SUMMARY ({items.length} Items)</div>

                        <div className="price-row">
                            <span>Package MRP</span>
                            <span>₹{Math.floor(totalMRP).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Celestial Discount</span>
                            <span className="price-discount">-₹{Math.floor(discount).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Convenience Fee</span>
                            <span><span style={{ textDecoration: 'line-through', marginRight: '8px', color: '#94a3b8' }}>₹99</span> <span className="price-discount">FREE</span></span>
                        </div>

                        <div className="price-row total">
                            <span>Total Payable</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <button onClick={() => navigate('/checkout')} className="btn-place-order">PROCEED TO SECURE CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
