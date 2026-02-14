import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, isAuthenticated } from '../services/api';

const Checkout = ({ items }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth?redirect=/checkout');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Create an order for each item in the cart
            // Note: In a real app, we'd likely bundle these or have a 'cart' entity in DB
            // But sticking to the current backend structure (one order per package)

            const promises = items.map(item => {
                // We need to create an order for each quantity too if quantity > 1?
                // For simplicity, we'll just create 'quantity' number of orders or just one order with total price?
                // The backend expects packageId. 
                // Let's create one order per item type for now, and ideally the backend would handle quantity.
                // Since backend doesn't seem to account for quantity expressly in the model (just packageId),
                // we'll loop through quantity.

                const orderPromises = [];
                for (let i = 0; i < item.quantity; i++) {
                    orderPromises.push(api.createOrder({
                        packageId: item.id,
                        paymentStatus: 'pending' // Default
                    }));
                }
                return Promise.all(orderPromises);
            });

            await Promise.all(promises);

            // Redirect to success page
            navigate('/success');
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h2>Your cart is empty</h2>
                <Link to="/shop" className="btn btn-primary mt-3">Go to Shop</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page container py-5">
            <h2 className="mb-5">Checkout</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-5">
                <div className="col-md-7">
                    <div className="shipping-form glass p-5 rounded">
                        <h4 className="mb-4">Shipping Details</h4>
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white border-secondary"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control bg-dark text-white border-secondary"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <textarea
                                    className="form-control bg-dark text-white border-secondary"
                                    rows="3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white border-secondary"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Postal Code</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white border-secondary"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <h4 className="mt-5 mb-3">Payment Option</h4>
                            <div className="col-12">
                                <div className="form-check p-3 rounded glass d-flex align-items-center">
                                    <input className="form-check-input ms-0 me-3" type="radio" name="payment" checked readOnly />
                                    <label className="form-check-label mb-0">Cash on Delivery (COD)</label>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                                    {loading ? 'Processing...' : 'Complete Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="order-summary-box glass p-4 rounded">
                        <h4 className="mb-4">Order Summary</h4>
                        {items.map(item => (
                            <div key={item.id} className="d-flex justify-content-between mb-3">
                                <span className="text-secondary">{item.name} (x{item.quantity})</span>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        <hr className="border-secondary" />
                        <div className="d-flex justify-content-between h5">
                            <span>Total Payable:</span>
                            <span className="text-primary">₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
