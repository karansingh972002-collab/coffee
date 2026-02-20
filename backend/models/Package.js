const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a package name'],
        unique: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: [true, 'Please add a subtitle']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    features: {
        type: [String],
        required: true
    },
    delivery: {
        digital: {
            type: String,
            default: 'Ready in 15 minutes'
        },
        physical: {
            type: String,
            default: 'N/A'
        }
    },
    badge: {
        type: String,
        default: ''
    },
    gradient: {
        type: String,
        default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    image: {
        type: String,
        default: '/src/assets/gift-package.png'
    },
    type: {
        type: String,
        required: true,
        enum: ['Standard', 'Premium', 'Binary', 'Luxury', 'Zodiac', 'Kids']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Package', PackageSchema);
