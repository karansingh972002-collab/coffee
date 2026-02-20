import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, isAuthenticated } from '../services/api';
import CheckoutSteps from '../components/CheckoutSteps';
import './CheckoutMyntra.css';

const Checkout = ({ items, clearCart }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('address'); // 'address' or 'payment'
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Address State
    const [selectedAddress, setSelectedAddress] = useState(0); // 0 for default mock address
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Karan Singh',
        phone: '9876543210',
        address: '123, Star Galaxy Apts, Space Road',
        city: 'Mumbai',
        postalCode: '400001'
    });

    // Calculations
    const totalMRP = items.reduce((sum, item) => sum + (item.price * 1.2) * item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = totalMRP - total;

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth?redirect=/checkout');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const promises = items.map(item => {
                const orderPromises = [];
                for (let i = 0; i < item.quantity; i++) {
                    orderPromises.push(api.createOrder({
                        packageId: item.id,
                        starName: item.customization?.starName || `Star #${Date.now()}-${i}`,
                        dedicationMessage: item.customization?.message || '',
                        dedicationDate: item.customization?.dedicationDate || new Date().toISOString(),
                        recipientInfo: {
                            name: formData.name,
                            email: '',
                            phone: formData.phone
                        },
                        shippingAddress: {
                            address: formData.address,
                            city: formData.city,
                            postalCode: formData.postalCode
                        },
                        paymentMethod: paymentMethod,
                        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed'
                    }));
                }
                return Promise.all(orderPromises);
            });

            const results = await Promise.all(promises);

            if (results.length > 0 && results[0].length > 0 && results[0][0].data) {
                sessionStorage.setItem('lastOrderId', results[0][0].data._id);
            }

            clearCart();
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
            <div className="checkout-page container py-5 text-center">
                <h2>Your cart is empty</h2>
                <Link to="/shop" className="btn-place-order" style={{ width: 'auto', display: 'inline-block' }}>Go to Shop</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            {error && (
                <div className="alert alert-danger text-center m-3" role="alert">
                    {error}
                </div>
            )}
            {loading && (
                <div className="processing-overlay">
                    <div className="processing-content">
                        <div className="spinner-border text-primary" role="status"></div>
                        <h3>Processing Secure Payment</h3>
                        <p>Please do not close this window...</p>
                    </div>
                </div>
            )}

            <CheckoutSteps activeStep={step} />

            <div className="checkout-container">
                {/* Left Section */}
                <div className="checkout-left">
                    {/* Step 1: Address */}
                    {step === 'address' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Select Delivery Address</h4>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowAddressForm(!showAddressForm)}>ADD NEW ADDRESS</button>
                            </div>

                            {/* Default Address Mock */}
                            <div
                                className={`address-box ${selectedAddress === 0 ? 'selected' : ''}`}
                                onClick={() => setSelectedAddress(0)}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <input type="radio" checked={selectedAddress === 0} readOnly onChange={() => setSelectedAddress(0)} style={{ marginTop: '4px', accentColor: '#ff3f6c' }} />
                                    <div>
                                        <div className="address-name">{formData.name} <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #03a685', color: '#03a685', borderRadius: '10px', marginLeft: '8px' }}>HOME</span></div>
                                        <p style={{ fontSize: '13px', color: '#535766', margin: '4px 0' }}>{formData.address}, {formData.city} - {formData.postalCode}</p>
                                        <p style={{ fontSize: '13px', color: '#535766', margin: 0 }}>Mobile: <span style={{ fontWeight: 600 }}>{formData.phone}</span></p>

                                        {selectedAddress === 0 && (
                                            <button
                                                className="btn-place-order"
                                                onClick={() => setStep('payment')}
                                                style={{ marginTop: '16px' }}
                                            >
                                                DELIVER HERE
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {showAddressForm && (
                                <div className="checkout-card">
                                    <form className="row g-3" onSubmit={handleAddressSubmit}>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile No." required />
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Address (Area and Street)" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Pincode" required />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn-place-order">SAVE THIS ADDRESS</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Payment */}
                    {step === 'payment' && (
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', color: '#535766' }}>Choose Payment Mode</h4>
                            <div className="payment-wrapper">
                                {/* Sidebar */}
                                <div className="payment-sidebar">
                                    <div className={`payment-tab ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                                        <span className="payment-icon">💵</span>
                                        <span>Cash On Delivery</span>
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                                        <span className="payment-icon">📍</span>
                                        <span>UPI</span>
                                        <span className="recommended-pill">New</span>
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                                        <span className="payment-icon">💳</span>
                                        <span>Credit / Debit Card</span>
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                                        <span className="payment-icon">🏦</span>
                                        <span>Net Banking</span>
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'wallet' ? 'active' : ''}`} onClick={() => setPaymentMethod('wallet')}>
                                        <span className="payment-icon">👛</span>
                                        <span>Wallets</span>
                                        <span className="recommended-pill">Offer</span>
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'emi' ? 'active' : ''}`} onClick={() => setPaymentMethod('emi')}>
                                        <span className="payment-icon">📉</span>
                                        <span>EMI</span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="payment-content-area">
                                    {paymentMethod === 'cod' && (
                                        <div>
                                            <div className="payment-header">Cash On Delivery (Cash / UPI)</div>
                                            <div style={{ background: '#fff9f9', border: '1px dashed #ff3f6c', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
                                                <p style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>Pay on Delivery</p>
                                                <p style={{ fontSize: '12px', color: '#535766' }}>You can pay via Cash or UPI (Google Pay, PhonePe, etc.) when the product is delivered.</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>PLACE ORDER</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div>
                                            <div className="payment-header">Pay via UPI</div>
                                            <div style={{ marginBottom: '20px' }}>
                                                <div className="payment-form-label">Enter UPI ID</div>
                                                <input type="text" className="payment-input" placeholder="e.g. mobile@upl" />
                                                <p style={{ fontSize: '11px', color: '#535766', marginTop: '6px' }}>UPI ID is in the format of mobilenumber@bank or username@bank</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>VERIFY & PAY</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'card' && (
                                        <div>
                                            <div className="payment-header">Credit / Debit Card</div>
                                            <div className="payment-form-group">
                                                <div className="payment-form-label">Card Number</div>
                                                <input type="text" className="payment-input" placeholder="XXXX XXXX XXXX XXXX" />
                                            </div>
                                            <div className="payment-form-group">
                                                <div className="payment-form-label">Name on Card</div>
                                                <input type="text" className="payment-input" placeholder="John Doe" />
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div className="payment-form-group" style={{ flex: 1 }}>
                                                    <div className="payment-form-label">Valid Thru</div>
                                                    <input type="text" className="payment-input" placeholder="MM/YY" />
                                                </div>
                                                <div className="payment-form-group" style={{ flex: 1 }}>
                                                    <div className="payment-form-label">CVV</div>
                                                    <input type="password" className="payment-input" placeholder="123" />
                                                </div>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>PAY NOW</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <div>
                                            <div className="payment-header">Net Banking</div>
                                            <div className="payment-form-label" style={{ marginBottom: '12px' }}>Popular Banks</div>
                                            <div className="bank-grid">
                                                <div className="bank-item" onClick={handlePaymentSubmit}>
                                                    <span>HDFC</span>
                                                </div>
                                                <div className="bank-item" onClick={handlePaymentSubmit}>
                                                    <span>ICICI</span>
                                                </div>
                                                <div className="bank-item" onClick={handlePaymentSubmit}>
                                                    <span>SBI</span>
                                                </div>
                                                <div className="bank-item" onClick={handlePaymentSubmit}>
                                                    <span>Axis</span>
                                                </div>
                                                <div className="bank-item" onClick={handlePaymentSubmit}>
                                                    <span>Kotak</span>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '20px' }}>
                                                <div className="payment-form-label">Other Banks</div>
                                                <select className="payment-input" style={{ width: '100%', cursor: 'pointer' }}>
                                                    <option>Select Bank</option>
                                                    <option>Bank of Baroda</option>
                                                    <option>Punjab National Bank</option>
                                                    <option>Yes Bank</option>
                                                </select>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit} style={{ marginTop: '24px' }}>PAY NOW</button>
                                        </div>
                                    )}

                                    {(paymentMethod === 'wallet' || paymentMethod === 'emi') && (
                                        <div style={{ padding: '40px 0', textAlign: 'center', color: '#535766' }}>
                                            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>🚧</span>
                                            <p>{paymentMethod === 'wallet' ? 'Wallets' : 'EMI'} are currently unavailable.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Section: Price Details */}
                <div className="checkout-right">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
