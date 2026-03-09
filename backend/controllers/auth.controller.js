const User = require('../models/User');
const { userStore } = require('../db/memory-store');
const mongoose = require('mongoose');
const sendEmail = require('../utils/sendEmail');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;
        let user;

        // Check if user already exists
        let existingUser = null;
        if (mongoose.connection.readyState === 1) {
            existingUser = await User.findOne({ email });
        }
        if (!existingUser) {
            existingUser = userStore.getByEmail(email);
        }

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists. Please log in instead.'
            });
        }

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

        // --- EMAIL NOTIFICATION: Welcome Message ---
        try {
            const messageText = `Welcome to Star Naming, ${user.name}!\n\nYour celestial journey begins here. You can now log in, view your dashboard, and immortalize a star.\n\nThank you for choosing us!`;

            const messageHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #050816; color: #fff; border-radius: 12px;">
                    <h2 style="color: #818cf8; text-align: center;">Welcome to Star Naming! 🌌</h2>
                    <p style="font-size: 16px;">Hello <strong>${user.name}</strong>,</p>
                    <p style="font-size: 16px; line-height: 1.5; color: #e2e8f0;">Your celestial journey begins here. Your account has been successfully created. You can now log in, view your dashboard, and immortalize a star in the galaxy.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.FRONTEND_URL || 'https://coffee-kappa-ashen.vercel.app'}/auth" style="background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Login Now</a>
                    </div>
                    <p style="font-size: 14px; color: #94a3b8; text-align: center;">Thank you for choosing Star Naming.</p>
                </div>
            `;

            await sendEmail({
                email: user.email,
                subject: 'Welcome to Star Naming!',
                message: messageText,
                html: messageHtml
            });
        } catch (err) {
            console.error('Failed to send welcome email:', err);
            // Non-blocking: we still want to log the user in
        }

        sendTokenResponse(user, 201, res);
    } catch (err) {
        const errorString = err ? String(err.message || err) : '';

        if (err.code === 11000 || errorString.includes('11000') || errorString.includes('duplicate key error') || errorString.includes('dup key')) {
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists. Please log in instead.'
            });
        }

        res.status(400).json({
            success: false,
            message: err.message || 'An error occurred during registration',
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
        // req.user is already populated by the protect middleware
        res.status(200).json({
            success: true,
            data: req.user,
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
        data: {
            user: user
        }
    });
};
