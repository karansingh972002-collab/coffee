const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('../models/User');
const Package = require('../models/Package');
const Order = require('../models/Order');
const connectDB = require('../config/db');

// Load env vars
dotenv.config({ path: '../.env' });

// Connect to DB
connectDB();

// Read JSON files (Using the data from memory-store.js as reference)
const packages = [
    {
        name: 'Standard Star',
        subtitle: 'A perfect entry into astronomy',
        description: 'Name a visible star in the sky. You will receive a PDF certificate and a star chart showing the location of your star.',
        price: 29.99,
        features: ['Digital Certificate', 'Star Chart', 'Registry Entry', 'Lifetime Validity'],
        delivery: { digital: 'Instant Download', physical: 'N/A' },
        badge: 'Best Value',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        type: 'Standard'
    },
    {
        name: 'Zodiac Star',
        subtitle: 'Name a star in a Zodiac constellation',
        description: 'Choose a star within one of the 12 Zodiac constellations. Perfect for astrology lovers and birthdays.',
        price: 49.99,
        features: ['Zodiac Constellation Selection', 'Digital Certificate', 'Star Chart', 'Astrology Report'],
        delivery: { digital: 'Instant Download', physical: 'N/A' },
        badge: 'Popular',
        gradient: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        type: 'Zodiac'
    },
    {
        name: 'Binary Star',
        subtitle: 'Two stars orbiting each other',
        description: 'Name two stars that orbit each other. The ultimate symbol of eternal love and connection.',
        price: 79.99,
        features: ['Two Star Names', 'Binary Star Certificate', 'Premium Star Chart', 'Romantic Gift Box'],
        delivery: { digital: 'Instant Download', physical: 'Free Shipping' },
        badge: 'Romantic Choice',
        gradient: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        type: 'Binary'
    }
];

// Import into DB
const importData = async () => {
    try {
        await Package.create(packages);
        console.log('✅ Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Package.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        console.log('✅ Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Connect and run
const run = async () => {
    await connectDB();

    if (process.argv[2] === '-i') {
        importData();
    } else if (process.argv[2] === '-d') {
        deleteData();
    }
};

run();
