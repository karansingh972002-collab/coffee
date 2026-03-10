const User = require('../models/User');
const Order = require('../models/Order');
const Package = require('../models/Package');
const mongoose = require('mongoose');
const { userStore, orderStore, packageStore } = require('../db/memory-store');

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res, next) => {
    try {
        let totalUsers = 0;
        let totalOrders = 0;
        let totalRevenue = 0;
        let totalPackages = 0;
        let revenueData = [];
        let recentOrders = [];

        if (mongoose.connection.readyState === 1) {
            // Count from DB
            totalUsers = await User.countDocuments();
            totalOrders = await Order.countDocuments();
            totalPackages = await Package.countDocuments();

            // Calculate revenue from completed or processing orders
            const revenueResult = await Order.aggregate([
                { $match: { status: { $in: ['Processing', 'Completed', 'Confirmed', 'Dispatched', 'Shipped', 'Out for delivery', 'Delivered'] } } },
                { $group: { _id: null, totalAmount: { $sum: '$totalAmount' } } }
            ]);
            totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalAmount : 0;

            // Optional: get basic revenue over time (last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const dailyRevenueResult = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sevenDaysAgo },
                        status: { $in: ['Processing', 'Completed', 'Confirmed', 'Dispatched', 'Shipped', 'Out for delivery', 'Delivered'] }
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        dailyTotal: { $sum: '$totalAmount' }
                    }
                },
                { $sort: { _id: 1 } }
            ]);

            revenueData = dailyRevenueResult.map(item => ({
                date: item._id,
                revenue: item.dailyTotal
            }));

            // Get recent orders
            recentOrders = await Order.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('user', 'name email');

        } else {
            // Fallback to memory store calculations
            const allUsers = userStore.getAll();
            const allOrders = orderStore.getAll();
            const allPackages = packageStore.getAll();

            totalUsers = allUsers.length;
            totalOrders = allOrders.length;
            totalPackages = allPackages.length;

            const paidOrders = allOrders.filter(o => ['Processing', 'Completed', 'Confirmed', 'Dispatched', 'Shipped', 'Out for delivery', 'Delivered'].includes(o.status));
            totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

            // Mock basic daily revenue for memory store
            revenueData = [
                { date: new Date().toISOString().split('T')[0], revenue: totalRevenue }
            ];

            recentOrders = [...allOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        }

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalOrders,
                totalRevenue,
                totalPackages,
                revenueData,
                recentOrders
            }
        });
    } catch (err) {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
};

// @desc    Get recent orders
// @route   GET /api/admin/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
    try {
        let orders = [];

        // Optional pagination/limits from query
        const limit = parseInt(req.query.limit, 10) || 50;

        if (mongoose.connection.readyState === 1) {
            orders = await Order.find()
                .populate('user', 'name email')
                .populate('items.package', 'name price')
                .sort({ createdAt: -1 })
                .limit(limit);
        } else {
            orders = orderStore.getAll()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, limit);
        }

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (err) {
        console.error('Error fetching admin orders:', err);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid status'
            });
        }

        let order;

        if (mongoose.connection.readyState === 1) {
            order = await Order.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true, runValidators: true }
            );
        } else {
            order = orderStore.update(req.params.id, { status });
        }

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
};
