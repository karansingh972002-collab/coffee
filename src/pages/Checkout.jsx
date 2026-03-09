import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, isAuthenticated, getStoredUser } from '../services/api';
import CheckoutSteps from '../components/CheckoutSteps';
import './CheckoutCelestial.css';

const Checkout = ({ items, clearCart }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('address'); // 'address' or 'payment'
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Address State
    const user = getStoredUser();
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'Karan Singh',
        phone: user?.phone || '9876543210',
        address: '123, Star Galaxy Apts, Space Road',
        city: 'Mumbai',
        postalCode: '400001',
        email: user?.email || '',
        // Payment Details
        upiId: '',
        cardNumber: '',
        cardHolder: '',
        cardExpiry: '',
        cardCvv: '',
        selectedBank: ''
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


    const handlePaymentSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            if (paymentMethod === 'razorpay') {
                // 1. Create Razorpay Order
                const rzpResponse = await api.createRazorpayOrder({ amount: total });
                if (!rzpResponse.success) throw new Error('Could not initialize payment gateway.');

                const { id: order_id, amount: amountPaise, currency, key } = rzpResponse.data;

                // 2. Open Razorpay Checkout options
                const options = {
                    key: key || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyId',
                    amount: amountPaise,
                    currency: currency,
                    name: 'Star Naming',
                    description: 'Celestial Package Order',
                    order_id: order_id,
                    handler: async function (response) {
                        try {
                            setLoading(true); // Re-set loading for verification
                            // 3. Verify Payment
                            const verifyData = {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            };

                            const verifyRes = await api.verifyRazorpayPayment(verifyData);

                            if (verifyRes.success) {
                                // 4. Create App Orders
                                const orders = await createApplicationOrders('completed', 'razorpay');

                                // Store the first order ID for the success page
                                if (orders && orders.length > 0) {
                                    sessionStorage.setItem('lastOrderId', orders[0].data._id || orders[0].data.id);
                                }

                                clearCart();
                                navigate('/order-success');
                            }
                        } catch (err) {
                            console.error('Payment verification failed:', err);
                            setError('Payment verification failed. Please contact stellar support.');
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                        contact: formData.phone
                    },
                    theme: {
                        color: '#6366f1'
                    },
                    modal: {
                        ondismiss: function () {
                            setLoading(false);
                        }
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    setError(`Payment Failed: ${response.error.description || 'Unknown error'}`);
                    setLoading(false);
                });
                rzp1.open();
                return; // Let the Razorpay handler deal with completion
            }

            // Client-side Validation
            if (paymentMethod === 'upi' && !formData.upiId) throw new Error('Please enter your UPI ID');
            if (paymentMethod === 'netbanking' && !formData.selectedBank) throw new Error('Please select a galactic node bank');
            if (paymentMethod === 'card') {
                if (!formData.cardNumber || !formData.cardHolder || !formData.cardExpiry || !formData.cardCvv) {
                    throw new Error('Please fill all card transmission details');
                }
            }

            // Normal flow for cod, upi, netbanking mock
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Prepare payment details metadata
            const paymentDetails = {};
            if (paymentMethod === 'upi') paymentDetails.upiId = formData.upiId;
            if (paymentMethod === 'netbanking') paymentDetails.bankName = formData.selectedBank;
            if (paymentMethod === 'card') {
                paymentDetails.cardHolder = formData.cardHolder;
                paymentDetails.last4 = formData.cardNumber.slice(-4);
            }

            const orders = await createApplicationOrders(
                paymentMethod === 'cod' ? 'pending' : 'completed',
                paymentMethod,
                paymentDetails
            );

            // Store the first order ID for the success page
            if (orders && orders.length > 0) {
                sessionStorage.setItem('lastOrderId', orders[0].data._id || orders[0].data.id);
            }

            clearCart();
            navigate('/order-success');
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.message || 'Failed to place order. Please try again.');
            setLoading(false);
        }
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setShowAddressForm(false);
        // In a real app, we'd save this to a list. 
        // For now, we update the main formData which is used for the order.
        setSelectedAddress(0);
    };

    const createApplicationOrders = async (paymentStatus, method, paymentDetails = {}) => {
        const promises = items.map(item => {
            const orderPromises = [];
            for (let i = 0; i < item.quantity; i++) {
                orderPromises.push(api.createOrder({
                    packageId: item.id || item._id,
                    starName: item.customization?.starName || `Star #${Date.now()}-${i}`,
                    dedicationMessage: item.customization?.message || '',
                    dedicationDate: item.customization?.dedicationDate || new Date().toISOString(),
                    recipientInfo: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone
                    },
                    shippingAddress: {
                        address: formData.address,
                        city: formData.city,
                        postalCode: formData.postalCode
                    },
                    paymentMethod: method,
                    paymentStatus: paymentStatus,
                    paymentDetails: paymentDetails
                }));
            }
            return Promise.all(orderPromises);
        });

        const results = await Promise.all(promises);
        return results.flat();
    };

    if (items.length === 0) {
        return (
            <div className="checkout-page container py-5 text-center">
                <div style={{ padding: '60px 20px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ color: '#fff', fontWeight: 800, marginBottom: '20px' }}>Your celestial bag is empty</h2>
                    <Link to="/shop" className="btn-place-order" style={{ width: 'auto', display: 'inline-block', padding: '16px 40px' }}>EXPLORE CELESTIAL SHOP</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            {error && (
                <div className="alert alert-danger text-center m-3" role="alert" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px' }}>
                    {error}
                </div>
            )}

            {loading && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(5, 8, 22, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                        <h3 style={{ color: '#fff', fontWeight: 800, letterSpacing: '2px' }}>PROCESSING YOUR ORDER</h3>
                        <p style={{ color: '#94a3b8' }}>Please do not close this window...</p>
                    </div>
                </div>
            )}

            <CheckoutSteps activeStep={step} />

            <div className="checkout-container">
                <div className="checkout-left">
                    {step === 'address' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '0.05em' }}>SHIPPING ADDRESS</h4>
                                <button className="btn btn-sm" style={{ color: '#818cf8', fontWeight: 800, border: '1px solid rgba(129, 140, 248, 0.3)', padding: '8px 16px', borderRadius: '8px' }} onClick={() => setShowAddressForm(!showAddressForm)}>+ ADD NEW ADDRESS</button>
                            </div>

                            <div className="checkout-card" style={{ padding: '24px', cursor: 'pointer', border: selectedAddress === 0 ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)', background: selectedAddress === 0 ? 'rgba(99, 102, 241, 0.05)' : 'rgba(30, 41, 59, 0.4)' }} onClick={() => setSelectedAddress(0)}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                                        {selectedAddress === 0 && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#818cf8' }}></div>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{formData.name}</span>
                                            <span style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '20px', fontWeight: 700 }}>DEFAULT</span>
                                        </div>
                                        <p style={{ color: '#94a3b8', margin: '0 0 12px', lineHeight: 1.6 }}>{formData.address}, {formData.city} - {formData.postalCode}</p>
                                        <div style={{ color: '#6366f1', fontWeight: 700 }}>Mobile: {formData.phone}</div>

                                        <div style={{ marginTop: '24px' }}>
                                            <button
                                                className="btn-place-order"
                                                onClick={() => {
                                                    setStep('payment');
                                                    window.scrollTo(0, 0);
                                                }}
                                                style={{ maxWidth: '280px', position: 'relative', zIndex: 10 }}
                                            >
                                                DELIVER TO THIS ADDRESS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {showAddressForm && (
                                <div className="checkout-card" style={{ marginTop: '24px' }}>
                                    <form className="row g-4" onSubmit={handleAddressSubmit}>
                                        <div className="col-md-6">
                                            <input type="text" className="payment-input" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="payment-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number" required />
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="payment-input" name="address" value={formData.address} onChange={handleChange} placeholder="Galaxy Address" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="payment-input" name="city" value={formData.city} onChange={handleChange} placeholder="Celestial City" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="payment-input" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Pincode / Star Code" required />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn-place-order">SAVE ADDRESS</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'payment' && (
                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '0.05em' }}>CHOOSE PAYMENT METHOD</h4>
                            <div className="payment-wrapper">
                                <div className="payment-sidebar">
                                    <div className={`payment-tab ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                                        <span>💵</span> Cash On Delivery
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'razorpay' ? 'active' : ''}`} onClick={() => setPaymentMethod('razorpay')}>
                                        <span>⚡</span> Secure Online Pay
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                                        <span>📍</span> UPI Interface
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                                        <span>💳</span> Stellar Cards
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                                        <span>🏦</span> Galactic Banking
                                    </div>
                                </div>

                                <div className="payment-content-area">
                                    {paymentMethod === 'cod' && (
                                        <div className="animate-fade-in">
                                            <h5 className="payment-method-title"><span>💵</span> CASH ON ARRIVAL</h5>
                                            <div className="payment-info-card">
                                                <span className="payment-info-tag">Physical Fulfill</span>
                                                <p className="payment-info-text">You can provide the credits via Cash or Digital UPI when your celestial package arrives at yours coordinates. No advance fuel required.</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>CONFIRM ARRIVAL ORDER</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'razorpay' && (
                                        <div className="animate-fade-in">
                                            <h5 className="payment-method-title"><span>⚡</span> SECURE STELLAR GATEWAY</h5>
                                            <div className="payment-info-card">
                                                <span className="payment-info-tag">Encrypted Connection</span>
                                                <p className="payment-info-text">Directly access the primary payment nodes via Razorpay. Support for 100+ galactic banks, cards, and wallets across the sector.</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>INITIATE SECURE PAY</button>

                                            <button
                                                className="btn btn-link mt-4"
                                                style={{ color: '#818cf8', fontSize: '11px', textDecoration: 'none', fontWeight: 800, letterSpacing: '1px', width: '100%', opacity: 0.6 }}
                                                onClick={() => {
                                                    setPaymentMethod('test');
                                                    handlePaymentSubmit();
                                                }}
                                            >
                                                // DEV CONSOLE: FORCE INSTANT SYNC
                                            </button>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div className="animate-fade-in">
                                            <h5 className="payment-method-title"><span>📍</span> STELLAR UPI SYNC</h5>
                                            <div className="payment-input-group">
                                                <label className="payment-label">VIRTUAL ADDRESS (VPA)</label>
                                                <input
                                                    type="text"
                                                    className="payment-input"
                                                    name="upiId"
                                                    value={formData.upiId}
                                                    onChange={handleChange}
                                                    placeholder="e.g. pilot@stellar"
                                                />
                                            </div>
                                            <div style={{ marginBottom: '32px' }}>
                                                <p style={{ fontSize: '12px', color: '#64748b' }}>A request will be sent to your primary communication device.</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>SYNC & AUTHORIZE</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'card' && (
                                        <div className="animate-fade-in">
                                            <h5 className="payment-method-title"><span>💳</span> STELLAR CARD CHANNEL</h5>
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <div className="payment-input-group">
                                                        <label className="payment-label">CARD NUMBER</label>
                                                        <input
                                                            type="text"
                                                            className="payment-input"
                                                            name="cardNumber"
                                                            value={formData.cardNumber}
                                                            onChange={handleChange}
                                                            placeholder="XXXX XXXX XXXX XXXX"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="payment-input-group">
                                                        <label className="payment-label">COMMANDER NAME</label>
                                                        <input
                                                            type="text"
                                                            className="payment-input"
                                                            name="cardHolder"
                                                            value={formData.cardHolder}
                                                            onChange={handleChange}
                                                            placeholder="AS APPEARS ON CARD"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="payment-input-group">
                                                        <label className="payment-label">EXPIRY</label>
                                                        <input
                                                            type="text"
                                                            className="payment-input"
                                                            name="cardExpiry"
                                                            value={formData.cardExpiry}
                                                            onChange={handleChange}
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="payment-input-group">
                                                        <label className="payment-label">CVV</label>
                                                        <input
                                                            type="password"
                                                            className="payment-input"
                                                            name="cardCvv"
                                                            value={formData.cardCvv}
                                                            onChange={handleChange}
                                                            placeholder="***"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>FUSE CARD CREDITS</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <div className="animate-fade-in">
                                            <h5 className="payment-method-title"><span>🏦</span> SELECT GALACTIC NODE</h5>
                                            <div className="bank-grid mb-4">
                                                {[
                                                    { id: 'HDFC', icon: '🏦' },
                                                    { id: 'ICICI', icon: '💎' },
                                                    { id: 'SBI', icon: '🏛️' },
                                                    { id: 'AXIS', icon: '💫' },
                                                    { id: 'PNB', icon: '🛡️' },
                                                    { id: 'BOB', icon: '💠' }
                                                ].map(bank => (
                                                    <div
                                                        key={bank.id}
                                                        className={`bank-item ${paymentMethod === 'netbanking' && formData.selectedBank === bank.id ? 'active' : ''}`}
                                                        onClick={() => {
                                                            setFormData({ ...formData, selectedBank: bank.id });
                                                        }}
                                                    >
                                                        <div className="bank-logo-placeholder">{bank.icon}</div>
                                                        <span className="bank-name">{bank.id}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>CONNECT TO NODE</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="checkout-right">
                    <div className="checkout-card">
                        <div className="price-details-header">ORDER SUMMARY ({items.length} Items)</div>

                        <div className="price-row">
                            <span>Package Total</span>
                            <span>₹{Math.floor(totalMRP).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Celestial Discount</span>
                            <span className="price-discount">-₹{Math.floor(discount).toLocaleString()}</span>
                        </div>
                        <div className="price-row">
                            <span>Shipping & Handling</span>
                            <span><span style={{ textDecoration: 'line-through', color: '#94a3b8', marginRight: '8px' }}>₹99</span> <span className="price-discount">FREE</span></span>
                        </div>

                        <div className="price-row total">
                            <span>TOTAL PAYABLE</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
