const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('../models/Package.model');

// Load env vars
dotenv.config({ path: './.env' });

const packages = [
    {
        name: 'SILVERNOVA',
        subtitle: 'Our Entry Package',
        description: 'A meaningful gift at an unbeatable price – start your journey to the stars!',
        price: 1999,
        features: [
            'Name a guaranteed visible star',
            'Lifetime registration in the International Space Registry',
            'Digital or Physical Package – Includes certificate & documents',
            'Localize your star anytime with our AR app'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: null,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: 'SUPERNOVA',
        subtitle: 'Our Most Popular Package',
        description: 'A best-selling gift that shines bright – perfect for any occasion!',
        price: 2999,
        features: [
            'Name a guaranteed visible star in a constellation of your choice',
            'Easier to locate in the night sky',
            'Lifetime registration in the International Space Registry',
            'Digital or Physical Package – Includes certificate & documents',
            'Localize your star anytime with our AR app'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: 'Most Popular',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        name: 'DUONOVA',
        subtitle: 'A Star Pair',
        description: 'A unique celestial bond – because some stars are meant to shine together!',
        price: 3999,
        features: [
            'Name two guaranteed visible stars that orbit together – a rare and meaningful pairing',
            'Perfect for couples, best friends, or a symbol of eternal connection',
            'Two personalized certificates featuring both stars\' coordinates',
            'Lifetime registration in the International Space Registry',
            'Digital or Physical Package – Includes all documents & certificates',
            'Localize your stars anytime with our AR app'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: null,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
];

// Import into DB
const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Package.deleteMany();
        await Package.create(packages);

        console.log('✅ Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Package.deleteMany();

        console.log('🗑️ Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData(); // Default to import
}
