import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 0 : 0; // Free shipping
    const total = subtotal + shipping;

    if (!isOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={onClose}></div>
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Your Cart</h3>
                    <button className="cart-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <div className="empty-icon">🛒</div>
                            <h4>Your cart is empty</h4>
                            <p>Add some stars to your cart to get started!</p>
                            <button className="btn btn-primary" onClick={onClose}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {items.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p className="item-type">{item.type === 'digital' ? 'Digital Package' : 'Physical Package'}</p>
                                            <p className="item-price">₹{item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="item-actions">
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="qty-btn"
                                                >
                                                    -
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="qty-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => onRemove(item.id)}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span className="free-shipping">Free</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <Link to="/checkout" className="btn btn-primary checkout-btn" onClick={onClose}>
                                    Proceed to Checkout
                                </Link>
                                <button className="btn btn-outline continue-btn" onClick={onClose}>
                                    Continue Shopping
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
