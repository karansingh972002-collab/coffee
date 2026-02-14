const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a package name'],
        unique: true,
        trim: true,
    },
    subtitle: {
        type: String,
        required: [true, 'Please add a subtitle'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    features: {
        type: [String],
        required: [true, 'Please add features'],
    },
    delivery: {
        digital: {
            type: String,
            default: 'Ready in 15 minutes',
        },
        physical: {
            type: String,
            default: 'Arrives in 2–4 days',
        },
    },
    badge: {
        type: String,
        default: null,
    },
    gradient: {
        type: String,
        default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Package', PackageSchema);
