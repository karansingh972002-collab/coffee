const express = require('express');
const {
    createRazorpayOrder,
    verifyRazorpayPayment,
    testPayment,
} = require('../controllers/payment.controller');

const router = express.Router();

const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/razorpay').post(createRazorpayOrder);
router.route('/verify').post(verifyRazorpayPayment);
router.route('/test').post(testPayment);

module.exports = router;
