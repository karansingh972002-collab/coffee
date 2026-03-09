const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
// Using fallback test keys if env variables are not set for seamless testing
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyId',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourTestKeySecret',
});

// @desc    Create Razorpay order
// @route   POST /api/payment/razorpay
// @access  Private
exports.createRazorpayOrder = async (req, res, next) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        };

        // Check if we should use mock (if keys are defaults or missing or start with rzp_test or forced by env)
        const isMock = (process.env.ALLOW_PAYMENT_MOCK === 'true') ||
            (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes('YourTestKeyId') || process.env.RAZORPAY_KEY_ID.startsWith('rzp_test_'));

        if (isMock) {
            console.warn('⚠️ WARNING: PAYMENT MOCK MODE ACTIVE. DO NOT USE IN PRODUCTION.');
            console.log('Using Mock Razorpay Order for development');
            return res.status(200).json({
                success: true,
                isMock: true,
                data: {
                    id: `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                    currency: 'INR',
                    amount: options.amount,
                    receipt: options.receipt,
                    status: 'created',
                    created_at: Math.floor(Date.now() / 1000),
                    key: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyId'
                }
            });
        }

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({
                success: false,
                message: 'Error creating Razorpay order'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: order.id,
                currency: order.currency,
                amount: order.amount,
                receipt: order.receipt
            }
        });
    } catch (err) {
        console.error('Razorpay Error:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Error communicating with Razorpay'
        });
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
exports.verifyRazorpayPayment = async (req, res, next) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Verify signature
        const secret = process.env.RAZORPAY_KEY_SECRET || 'YourTestKeySecret';

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Transaction not legit!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            data: {
                paymentId: razorpay_payment_id
            }
        });
    } catch (err) {
        console.error('Verify Payment Error:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Error verifying payment'
        });
    }
};

// @desc    Simulate/Test Payment
// @route   POST /api/payment/test
// @access  Private
exports.testPayment = async (req, res, next) => {
    try {
        const { amount } = req.body;

        // Return a pre-verified mock response for ultra-fast testing
        res.status(200).json({
            success: true,
            isTest: true,
            message: 'Test payment simulated successfully',
            data: {
                order_id: `test_order_${Date.now()}`,
                payment_id: `test_pay_${Math.random().toString(36).substr(2, 9)}`,
                amount: amount || 0,
                status: 'captured'
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Test payment simulation failed'
        });
    }
};
