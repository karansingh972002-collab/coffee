const Order = require('../models/Order');
const Package = require('../models/Package');
const mongoose = require('mongoose');
const { orderStore, packageStore, userStore } = require('../db/memory-store');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

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

        // --- EMAIL NOTIFICATION: Order Confirmation ---
        try {
            // Get user email
            let userEmail = '';
            let userName = '';

            if (mongoose.connection.readyState === 1 && req.user) {
                const user = await User.findById(userId);
                if (user) {
                    userEmail = user.email;
                    userName = user.name;
                }
            }

            if (!userEmail) {
                const memUser = userStore.getById(userId);
                if (memUser) {
                    userEmail = memUser.email;
                    userName = memUser.name;
                }
            }

            if (userEmail) {
                const messageText = `Order Confirmation\n\nDear ${userName},\n\nThank you for your order! Your celestial package for claiming the star "${orderData.starName}" has been received and is currently processing.\n\nTotal Amount: ₹${orderData.totalAmount}\nOrder ID: ${order ? order._id : 'Pending'}\n\nYou can track your order status in your dashboard.\n\nThank you for choosing Star Naming!`;

                const messageHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #050816; color: #fff; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                        <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px;">
                            <h2 style="color: #818cf8; margin: 0;">Order Confirmed 🌠</h2>
                        </div>
                        <p style="font-size: 16px;">Dear <strong>${userName}</strong>,</p>
                        <p style="font-size: 16px; color: #e2e8f0; line-height: 1.5;">Thank you for your purchase. We are thrilled to confirm your order. Your star catalog details are currently being processed.</p>
                        
                        <div style="background-color: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 20px 0;">
                            <h3 style="color: #a5b4fc; margin-top: 0; font-size: 16px;">Star Details</h3>
                            <p style="margin: 5px 0;"><strong>Star Name:</strong> ${orderData.starName}</p>
                            <p style="margin: 5px 0;"><strong>Package:</strong> ${pkg.name}</p>
                            ${orderData.dedicationMessage ? `<p style="margin: 5px 0;"><strong>Message:</strong> "${orderData.dedicationMessage}"</p>` : ''}
                        </div>

                        <div style="margin: 20px 0;">
                            <h3 style="color: #a5b4fc; margin-top: 0; font-size: 16px;">Payment Summary</h3>
                            <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
                            <p style="margin: 5px 0;"><strong>Payment Status:</strong> <span style="color: ${orderData.paymentStatus === 'completed' ? '#10b981' : '#fbbf24'}; text-transform: capitalize;">${orderData.paymentStatus}</span></p>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL || 'https://coffee-kappa-ashen.vercel.app'}/account" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Order Status</a>
                        </div>
                    </div>
                `;

                await sendEmail({
                    email: userEmail,
                    subject: 'Order Confirmation - Star Naming',
                    message: messageText,
                    html: messageHtml
                });
            }
        } catch (err) {
            console.error('Failed to send order confirmation email:', err);
            // Non-blocking
        }

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
