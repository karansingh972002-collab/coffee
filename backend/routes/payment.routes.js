const express = require('express');
const {
    createRazorpayOrder,
    verifyRazorpayPayment,
} = require('../controllers/payment.controller');

const router = express.Router();

const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/razorpay').post(createRazorpayOrder);
router.route('/verify').post(verifyRazorpayPayment);

module.exports = router;
