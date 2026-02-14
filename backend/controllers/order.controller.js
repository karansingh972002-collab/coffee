const Order = require('../models/Order.model');
const Package = require('../models/Package.model');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        const pkg = await Package.findById(req.body.packageId);

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: `Package not found with id of ${req.body.packageId}`,
            });
        }

        req.body.package = req.body.packageId;
        req.body.totalAmount = pkg.price;

        const order = await Order.create(req.body);

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
        let query;

        // If user is not admin, only show their orders
        if (req.user.role !== 'admin') {
            query = Order.find({ user: req.user.id }).populate('package');
        } else {
            query = Order.find().populate('user package');
        }

        const orders = await query;

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
        const order = await Order.findById(req.params.id).populate('user package');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with id of ${req.params.id}`,
            });
        }

        // Make sure user is order owner or admin
        if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
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
        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with id of ${req.params.id}`,
            });
        }

        // Make sure user is order owner or admin
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this order',
            });
        }

        order = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentStatus: req.body.paymentStatus },
            {
                new: true,
                runValidators: true,
            }
        );

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
