const express = require('express');
const { getStats, getOrders, updateOrderStatus } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply protection and admin authorization to all routes in this file
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
