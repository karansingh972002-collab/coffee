const Package = require('../models/Package.model');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res, next) => {
    try {
        const packages = await Package.find();

        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
exports.getPackage = async (req, res, next) => {
    try {
        const pkg = await Package.findById(req.params.id);

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: `Package not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: pkg,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Create package
// @route   POST /api/packages
// @access  Private/Admin
exports.createPackage = async (req, res, next) => {
    try {
        const pkg = await Package.create(req.body);

        res.status(201).json({
            success: true,
            data: pkg,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
exports.updatePackage = async (req, res, next) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: `Package not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: pkg,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
exports.deletePackage = async (req, res, next) => {
    try {
        const pkg = await Package.findByIdAndDelete(req.params.id);

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: `Package not found with id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
