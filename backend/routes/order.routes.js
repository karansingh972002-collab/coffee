const express = require('express');
const {
    createOrder,
    getOrders,
    getOrder,
    updatePaymentStatus,
} = require('../controllers/order.controller');

const router = express.Router();

const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All order routes are protected

router.route('/').get(getOrders).post(createOrder);

router.route('/:id').get(getOrder);

router.route('/:id/payment').put(updatePaymentStatus);

module.exports = router;
