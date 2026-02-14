import { Link } from 'react-router-dom';

const CartPage = ({ items, onUpdateQuantity, onRemove }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="cart-page container py-5 text-center">
                <h2>Your Cart is Empty</h2>
                <p className="text-secondary">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary mt-3">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container py-5">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="cart-items-container glass p-4 rounded">
                        {items.map(item => (
                            <div key={item.id} className="cart-item-row d-flex align-items-center py-3 border-bottom border-secondary">
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '60px', objectFit: 'cover' }} className="rounded me-4" />
                                <div className="flex-grow-1">
                                    <h5>{item.name} <small className="text-secondary ms-2">{item.brand}</small></h5>
                                    <div className="text-primary h6">₹{item.price.toLocaleString()}</div>
                                </div>
                                <div className="quantity-controls d-flex align-items-center gap-2 mx-4">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button className="btn btn-sm btn-link text-danger" onClick={() => onRemove(item.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="order-summary glass p-4 rounded sticky-top" style={{ top: '20px' }}>
                        <h4 className="mb-4">Summary</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <span>Shipping:</span>
                            <span className="text-success">FREE</span>
                        </div>
                        <hr className="border-secondary" />
                        <div className="d-flex justify-content-between h4 mb-4">
                            <span>Total:</span>
                            <span className="text-primary">₹{total.toLocaleString()}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-primary w-100 btn-lg">Proceed to Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
