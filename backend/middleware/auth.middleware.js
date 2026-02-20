const jwt = require('jsonwebtoken');
const { userStore } = require('../db/memory-store');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        const User = require('../models/User');
        const mongoose = require('mongoose');

        // Try getting from DB first if connected
        if (mongoose.connection.readyState === 1) {
            req.user = await User.findById(decoded.id);
        }

        // If not found in DB or DB down, check memory store
        if (!req.user) {
            req.user = userStore.getById(decoded.id);
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found or not authorized',
            });
        }

        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err.message);
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
        });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};
