import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import './CheckoutMyntra.css';

const CartPage = ({ items, onUpdateQuantity, onRemove, onAddToWishlist }) => {
    const navigate = useNavigate();
    const totalMRP = items.reduce((sum, item) => sum + (item.price * 1.2) * item.quantity, 0); // Mock MRP
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
                <img
                    src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
                    alt="Empty Bag"
                    style={{ width: '150px', marginBottom: '20px', filter: 'brightness(0.8)' }}
                />
                <h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>Hey, it feels so light!</h4>
                <p className="text-secondary mb-4">There is nothing in your bag. Let's add some items.</p>
                <Link to="/shop" className="btn-place-order" style={{ display: 'inline-block', width: 'auto', padding: '12px 30px', textDecoration: 'none' }}>ADD ITEMS FROM WISHLIST</Link>
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
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Available Offers</span>
                                <p style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', margin: '4px 0 0' }}>10% Instant Discount on SBI Credit Cards on a min spend of ₹3,000. TCA</p>
                            </div>
                            <span style={{ color: '#ff3f6c', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>MORE</span>
                        </div>
                    </div>

                    <div className="checkout-card" style={{ padding: 0 }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid var(--myntra-border)', display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>Selected Items ({items.length})</h4>
                        </div>

                        {items.map(item => (
                            <div key={item.id} style={{ padding: '16px', borderBottom: '1px solid var(--myntra-border)', position: 'relative' }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '110px', height: '148px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                    <div style={{ marginLeft: '16px', flex: 1 }}>
                                        <h5 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>{item.brand || 'Star Naming Co.'}</h5>
                                        <p style={{ fontSize: '14px', color: 'var(--myntra-text-primary)', margin: '0 0 8px' }}>{item.name}</p>

                                        {item.customization && (
                                            <div className="item-customization mb-2" style={{ fontSize: '12px', color: '#a5b4fc', background: 'rgba(165, 180, 252, 0.1)', padding: '8px', borderRadius: '4px' }}>
                                                <div style={{ marginBottom: '4px' }}><strong>Star Name:</strong> {item.customization.starName}</div>
                                                <div style={{ marginBottom: '4px' }}><strong>Date:</strong> {item.customization.dedicationDate}</div>
                                                {item.customization.message && (
                                                    <div><strong>Message:</strong> {item.customization.message}</div>
                                                )}
                                            </div>
                                        )}

                                        <p style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', margin: '0 0 12px' }}>Category: Celestial Gift</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '2px', fontSize: '14px', fontWeight: 700 }}>Qty: {item.quantity} </div>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button className="btn btn-sm btn-outline-secondary" style={{ padding: '0 6px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <button className="btn btn-sm btn-outline-secondary" style={{ padding: '0 6px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 700 }}>₹{item.price.toLocaleString()}</span>
                                            <span style={{ fontSize: '12px', color: 'var(--myntra-text-secondary)', textDecoration: 'line-through' }}>₹{(item.price * 1.2).toLocaleString()}</span>
                                            <span style={{ fontSize: '12px', color: '#ff905a' }}>(20% OFF)</span>
                                        </div>

                                        <div style={{ fontSize: '12px', color: 'var(--myntra-text-primary)', marginTop: '8px' }}>
                                            <span style={{ fontWeight: 700 }}>14 days</span> return available
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Style Actions Footer */}
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
                    <div className="address-box">
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--myntra-text-secondary)', marginBottom: '8px' }}>DELIVERY ESTIMATES</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '14px', color: 'var(--myntra-text-primary)' }}>Estimated delivery by <span style={{ fontWeight: 700 }}>20 Oct 2026</span></div>
                        </div>
                    </div>

                    <div className="checkout-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--myntra-text-primary)' }}>Coupons</span>
                        </div>
                        <div className="coupon-section">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '18px', color: 'var(--myntra-text-secondary)' }}>🏷️</span>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--myntra-text-primary)' }}>Apply Coupons</span>
                            </div>
                            <button className="coupon-btn">APPLY</button>
                        </div>
                    </div>

                    <div className="checkout-card" style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--myntra-text-secondary)' }}>SUPPORT A CAUSE</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--myntra-text-primary)' }}>Donate ₹10 to <span style={{ fontWeight: 700 }}>GiveIndia</span></span>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.1)' }} />
                            </div>
                        </div>
                        <span style={{ fontSize: '12px', color: '#ff3f6c', fontWeight: 600, cursor: 'pointer' }}>Know More</span>
                    </div>

                    <div className="checkout-card">
                        <div className="price-details-header">PRICE DETAILS ({items.length} Items)</div>

                        <div className="price-row">
                            <span>Total MRP</span>
                            <span>₹{Math.floor(totalMRP).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Discount on MRP</span>
                            <span className="price-discount">-₹{Math.floor(discount).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Convenience Fee</span>
                            <span><span style={{ textDecoration: 'line-through' }}>₹99</span> <span className="price-discount">FREE</span></span>
                        </div>

                        <div className="price-row total">
                            <span>Total Amount</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <button onClick={() => navigate('/checkout')} className="btn-place-order">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
