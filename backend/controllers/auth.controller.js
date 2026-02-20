const User = require('../models/User');
const { userStore } = require('../db/memory-store');
const mongoose = require('mongoose');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;
        let user;

        // Try creating in DB first
        if (mongoose.connection.readyState === 1) {
            user = await User.create({ name, email, password, phone });
        }

        // Always sync with memory store for fallback
        const memoryUser = userStore.create({
            _id: user ? user._id.toString() : undefined,
            name,
            email,
            password, // Note: User model hashes this on save, memory store might need manual hash or bypass
            phone
        });

        if (!user) user = memoryUser;

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password',
            });
        }

        // Check for user
        let user;
        if (mongoose.connection.readyState === 1) {
            user = await User.findOne({ email }).select('+password');
        }

        // Fallback to memory store
        if (!user) {
            user = userStore.getByEmail(email);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Check if password matches
        // For DB users, use model method. For memory users, use bcrypt directly if password exists.
        let isMatch = false;
        if (user.matchPassword) {
            isMatch = await user.matchPassword(password);
        } else {
            const bcrypt = require('bcryptjs');
            isMatch = await bcrypt.compare(password, user.password);
        }

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
    });
};
