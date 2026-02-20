const Order = require('../models/Order');
const Package = require('../models/Package');
const mongoose = require('mongoose');
const { orderStore, packageStore } = require('../db/memory-store');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        const userId = req.user._id || req.user.id;
        let pkg;

        // Try getting package from DB
        if (mongoose.connection.readyState === 1) {
            pkg = await Package.findById(req.body.packageId);
        }

        // Fallback to memory store
        if (!pkg) {
            pkg = packageStore.getById(req.body.packageId);
        }

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: `Package not found with id of ${req.body.packageId}`,
            });
        }

        const orderData = {
            user: userId,
            package: req.body.packageId,
            totalAmount: pkg.price,
            starName: req.body.starName || 'Unnamed Star',
            dedicationMessage: req.body.dedicationMessage || '',
            dedicationDate: req.body.dedicationDate,
            recipientInfo: req.body.recipientInfo || {},
            shippingAddress: req.body.shippingAddress || {},
            paymentMethod: req.body.paymentMethod || 'cod',
            paymentStatus: req.body.paymentStatus || 'pending',
            orderStatus: req.body.orderStatus || 'processing',
            deliveryType: req.body.deliveryType || 'digital'
        };

        let order;
        // Try creating in DB
        if (mongoose.connection.readyState === 1) {
            order = await Order.create(orderData);
        }

        // Always sync with memory store
        const memoryOrder = orderStore.create({
            ...orderData,
            _id: order ? order._id.toString() : undefined
        });

        if (!order) order = memoryOrder;

        res.status(201).json({
            success: true,
            data: order,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res, next) => {
    try {
        let orders = [];
        const userId = req.user._id || req.user.id;

        // Try getting from DB
        if (mongoose.connection.readyState === 1) {
            if (req.user.role !== 'admin') {
                orders = await Order.find({ user: userId }).populate('package');
            } else {
                orders = await Order.find().populate('package');
            }
        }

        // If DB returned nothing or is down, check memory store
        if (orders.length === 0) {
            if (req.user.role !== 'admin') {
                orders = orderStore.getByUserId(userId);
            } else {
                orders = orderStore.getAll();
            }
        }

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
    try {
        let order;
        const userId = req.user._id || req.user.id;

        // Try getting from DB
        if (mongoose.connection.readyState === 1) {
            order = await Order.findById(req.params.id)
                .populate('package')
                .populate('user', 'name email');
        }

        // Fallback to memory store
        if (!order) {
            order = orderStore.getById(req.params.id);
        }

        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with id of ${req.params.id}`,
            });
        }

        // Make sure user is order owner or admin
        const orderUserId = order.user._id || order.user.id || order.user;
        if (orderUserId.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this order',
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Update order payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
exports.updatePaymentStatus = async (req, res, next) => {
    try {
        let order;
        const userId = req.user._id || req.user.id;

        // Try getting from DB
        if (mongoose.connection.readyState === 1) {
            order = await Order.findById(req.params.id);
        }

        // Fallback to memory store
        if (!order) {
            order = orderStore.getById(req.params.id);
        }

        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with id of ${req.params.id}`,
            });
        }

        // Make sure user is order owner or admin
        const orderUserId = order.user._id || order.user.id || order.user;
        if (orderUserId.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this order',
            });
        }

        // Update in DB
        if (mongoose.connection.readyState === 1 && order.save) {
            order.paymentStatus = req.body.paymentStatus;
            await order.save();
        }

        // Always sync with memory store
        orderStore.update(req.params.id, {
            paymentStatus: req.body.paymentStatus
        });

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
