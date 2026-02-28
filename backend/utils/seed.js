const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('../models/Package');

const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

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
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        image: '/packages/silvernova.webp',
        type: 'Standard'
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
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: '/packages/supernova.webp',
        type: 'Premium'
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
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        image: '/packages/duonova.webp',
        type: 'Binary'
    },
    {
        name: 'DIAMONDNOVA',
        subtitle: 'The Ultimate Luxury',
        description: 'Only the brightest, most spectacular stars. Leave a legacy that will never fade.',
        price: 7999,
        features: [
            'Name one of the brightest extra-visible stars in the entire night sky',
            'Premium framed certificate with gold foil embossing',
            'Interactive 3D crystal engraved with your star\'s coordinates',
            'Lifetime VIP registration in the International Space Registry',
            'Localize your star with our VIP AR app functionality'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Express shipping (1-2 days)'
        },
        badge: 'Luxury',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)',
        image: '/packages/diamondnova.webp',
        type: 'Luxury'
    },
    {
        name: 'ZODIAC STAR',
        subtitle: 'Written in the Stars',
        description: 'Name a star within a specific Zodiac constellation – the perfect astrology gift!',
        price: 3499,
        features: [
            'Name a star precisely within their Zodiac constellation (e.g., Aries, Leo)',
            'Special astrology-themed certificate and constellation map',
            'Detailed information about the chosen Zodiac sign',
            'Lifetime registration in the International Space Registry',
            'Localize your star anytime with our AR app'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: 'Special',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        image: '/packages/zodiac.webp',
        type: 'Zodiac'
    },
    {
        name: 'LITTLE STAR',
        subtitle: 'For the Little Dreamers',
        description: 'A magical gift for children, newborns, or christenings to ignite their imagination.',
        price: 2499,
        features: [
            'Name a bright, easily visible star',
            'Child-friendly certificate with magical illustrations',
            'Includes "My First Star" educational astronomy booklet',
            'Lifetime registration in the International Space Registry',
            'Fun and easy AR app experience for kids'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: null,
        gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        image: '/packages/kids.webp',
        type: 'Kids'
    },
    {
        name: 'BRONZENOVA',
        subtitle: 'The Perfect Keepsake',
        description: 'An elegant presentation for a standard visible star.',
        price: 2199,
        features: [
            'Name a guaranteed visible star',
            'Commemorative registration certificate',
            'Digital star map visualization',
            'Lifetime registration in the Registry'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2-4 days'
        },
        badge: null,
        gradient: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        image: '/packages/standard.webp',
        type: 'Standard'
    },
    {
        name: 'HYPERNOVA',
        subtitle: 'The Premium Experience',
        description: 'A brilliant star in a stunning premium gift box presentation.',
        price: 3299,
        features: [
            'Name an exceptionally bright star',
            'Premium framed certificate',
            'High-resolution printed star map',
            'Lifetime registration in the Registry'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2-4 days'
        },
        badge: 'Recommended',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        image: '/packages/premium.webp',
        type: 'Premium'
    },
    {
        name: 'TWINNOVA',
        subtitle: 'A Star Pair',
        description: 'A beautiful binary star pair for couples.',
        price: 4299,
        features: [
            'Name two visible stars that orbit each other',
            'Dual-name commemorative certificate',
            'Digital & printed star map for both stars',
            'Lifetime registration in the Registry'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2-4 days'
        },
        badge: 'For Couples',
        gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
        image: '/packages/binary.webp',
        type: 'Binary'
    },
    {
        name: 'PLATINUMNOVA',
        subtitle: 'The Crown Jewel',
        description: 'An ultra-luxurious VIP package featuring the rarest stars.',
        price: 9999,
        features: [
            'Name a Supergiant or Hypergiant class star',
            'Hand-crafted gold-foil certificate in luxury frame',
            'Engraved meteorite fragment included',
            'VIP Priority Lifetime registration'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Express shipping (1-2 days)'
        },
        badge: 'VIP',
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        image: '/packages/luxury.webp',
        type: 'Luxury'
    }
];

// Import into DB
const importData = async () => {
    try {
        const dns = require('dns');
        dns.setServers(['8.8.8.8']);
        await mongoose.connect(process.env.MONGO_URI);

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
