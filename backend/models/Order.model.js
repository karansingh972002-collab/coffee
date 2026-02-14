const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    package: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package',
        required: true,
    },
    starName: {
        type: String,
        required: [true, 'Please add a star name'],
    },
    starDate: {
        type: Date,
        default: Date.now,
    },
    dedicationMessage: {
        type: String,
    },
    recipientInfo: {
        name: String,
        email: String,
        phone: String,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing',
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', OrderSchema);
