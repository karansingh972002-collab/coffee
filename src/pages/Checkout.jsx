import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, isAuthenticated } from '../services/api';
import CheckoutSteps from '../components/CheckoutSteps';
import './CheckoutCelestial.css';

const Checkout = ({ items, clearCart }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('address'); // 'address' or 'payment'
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Address State
    const [selectedAddress, setSelectedAddress] = useState(0);
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
            if (paymentMethod === 'razorpay') {
                // 1. Create Razorpay Order
                const rzpResponse = await api.createRazorpayOrder({ amount: total });
                if (!rzpResponse.success) throw new Error('Could not initialize payment gateway.');

                // Handle Mock Order for local testing
                if (rzpResponse.isMock) {
                    console.log('Detected Mock Razorpay Order - Simulating success');
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    await createApplicationOrders('completed', 'razorpay-mock');
                    clearCart();
                    navigate('/success');
                    return;
                }

                const { id: order_id, amount: amountPaise, currency } = rzpResponse.data;

                // 2. Open Razorpay Checkout options
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyId',
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
                                await createApplicationOrders('completed', 'razorpay');
                                clearCart();
                                navigate('/success');
                            }
                        } catch (err) {
                            console.error('Payment verification failed:', err);
                            setError('Payment verification failed. Please contact stellar support.');
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: formData.name,
                        email: '',
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

            // Normal flow for cod, upi, netbanking mock
            await new Promise(resolve => setTimeout(resolve, 2000));
            await createApplicationOrders(paymentMethod === 'cod' ? 'pending' : 'completed', paymentMethod);

            clearCart();
            navigate('/success');
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.message || 'Failed to place order. Please try again.');
            setLoading(false);
        }
    };

    const createApplicationOrders = async (paymentStatus, method) => {
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
                    paymentMethod: method,
                    paymentStatus: paymentStatus
                }));
            }
            return Promise.all(orderPromises);
        });

        await Promise.all(promises);
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

                                        {selectedAddress === 0 && (
                                            <button className="btn-place-order" onClick={() => setStep('payment')} style={{ marginTop: '24px', maxWidth: '250px' }}>DELIVER TO THIS ADDRESS</button>
                                        )}
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
                                        <span>⚡</span> Pay Online (Razorpay)
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                                        <span>📍</span> UPI Interface
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                                        <span>💳</span> Stellar Cards
                                    </div>
                                    <div className={`payment-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                                        <span>🏦</span> Galatic Banking
                                    </div>
                                </div>

                                <div className="payment-content-area" style={{ background: 'transparent' }}>
                                    {paymentMethod === 'cod' && (
                                        <div>
                                            <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: '16px' }}>CASH ON ARRIVAL</h5>
                                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px dashed #6366f1', padding: '20px', borderRadius: '16px', marginBottom: '32px' }}>
                                                <p style={{ fontSize: '14px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>Verified Arrival</p>
                                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>You can fulfill the credits via Cash or Digital UPI when your celestial package arrives at the coordinates.</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>PLACE ORDER</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'razorpay' && (
                                        <div>
                                            <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: '16px' }}>SECURE ONLINE PAYMENT</h5>
                                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px dashed #6366f1', padding: '20px', borderRadius: '16px', marginBottom: '32px' }}>
                                                <p style={{ fontSize: '14px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>Stellar Gateway</p>
                                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>You will be redirected to our secure payment gateway to complete your transaction using Cards, UPI, Netbanking, or Wallets.</p>
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>PROCEED TO PAY</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div>
                                            <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: '16px' }}>PAY VIA STELLAR UPI</h5>
                                            <div className="mb-4">
                                                <label style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', display: 'block', fontWeight: 700 }}>ENTER UPI ID</label>
                                                <input type="text" className="payment-input" placeholder="e.g. pilot@stellar" />
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>VERIFY & SYNC</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'card' && (
                                        <div>
                                            <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: '16px' }}>ENCRYPTED CARD CHANNEL</h5>
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <input type="text" className="payment-input" placeholder="XXXX XXXX XXXX XXXX" />
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="payment-input" placeholder="Holder Name" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" className="payment-input" placeholder="MM/YY" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="password" className="payment-input" placeholder="CVV" />
                                                </div>
                                            </div>
                                            <button className="btn-place-order" style={{ marginTop: '24px' }} onClick={handlePaymentSubmit}>FUSE PAYMENT</button>
                                        </div>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <div>
                                            <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: '16px' }}>SELECT NODE</h5>
                                            <div className="bank-grid mb-4">
                                                {['HDFC', 'ICICI', 'SBI', 'AXIS'].map(bank => (
                                                    <div key={bank} className="bank-item" onClick={handlePaymentSubmit} style={{ background: 'rgba(255,255,255,0.03)', height: '70px' }}>
                                                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{bank}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="btn-place-order" onClick={handlePaymentSubmit}>PROCEED TO GATEWAY</button>
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
