const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    package: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package',
        required: true
    },
    starName: {
        type: String,
        required: [true, 'Please add a star name'],
        trim: true
    },
    dedicationMessage: {
        type: String,
        maxlength: [500, 'Message cannot be more than 500 characters']
    },
    dedicationDate: {
        type: String
    },
    recipientInfo: {
        name: String, // Simplified for frontend match
        firstName: String,
        lastName: String,
        email: String,
        phone: String
    },
    shippingAddress: {
        address: String, // Added for frontend match
        street: String,
        city: String,
        state: String,
        zipCode: String,
        postalCode: String, // Added for frontend match
        country: String
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'card', 'upi', 'netbanking', 'test'],
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing'
    },
    deliveryType: {
        type: String,
        enum: ['digital', 'physical'],
        default: 'digital'
    },
    paymentDetails: {
        type: Object,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
