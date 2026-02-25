const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Package = require('./models/Package');
const Order = require('./models/Order');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const packages = [
    {
        name: 'Silvernova - Digital',
        subtitle: 'Our Entry Package',
        description: 'A meaningful gift at an unbeatable price – start your journey to the stars!',
        price: 1999,
        features: [
            'Name a guaranteed visible star',
            'Lifetime registration in the International Space Registry',
            'Digital Certificate',
            'Localize your star anytime with our AR app'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'N/A'
        },
        badge: 'Entry Level',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80',
        type: 'Standard'
    },
    {
        name: 'Silvernova - Gift Pack',
        subtitle: 'Full Gift Set',
        description: 'Get the full experience with a printed certificate and folder.',
        price: 2499,
        features: [
            'Name a guaranteed visible star',
            'Lifetime registration',
            'Printed Certificate & Folder',
            'Star Map'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: 'Best Value',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80',
        type: 'Standard'
    },
    {
        name: 'Supernova - Digital',
        subtitle: 'Our Most Popular Package',
        description: 'A best-selling gift that shines bright – perfect for any occasion!',
        price: 2999,
        features: [
            'Name a guaranteed visible star',
            'Constellation Choice',
            'Digital Certificate',
            'AR App Access'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'N/A'
        },
        badge: 'Most Popular',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
        type: 'Premium'
    },
    {
        name: 'Supernova - Gift Pack',
        subtitle: 'Premium Gifting',
        description: 'The complete premium package for your loved ones.',
        price: 3499,
        features: [
            'Name a guaranteed visible star',
            'Constellation Choice',
            'Printed Certificate & Folder',
            'Framed Star Map'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: 'Top Choice',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=800&q=80',
        type: 'Premium'
    },
    {
        name: 'Duonova - Digital',
        subtitle: 'A Star Pair',
        description: 'A unique celestial bond – because some stars are meant to shine together!',
        price: 3999,
        features: [
            'Name two guaranteed visible stars',
            'Orbiting Pair',
            'Digital Certificates',
            'AR App Access'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'N/A'
        },
        badge: 'Romantic Gift',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        image: 'https://images.unsplash.com/photo-1506318137071-a8bcbf675b27?auto=format&fit=crop&w=800&q=80',
        type: 'Binary'
    },
    {
        name: 'Duonova - Gift Pack',
        subtitle: 'Luxury Double Set',
        description: 'The ultimate romantic gesture with physical certificates for both.',
        price: 4499,
        features: [
            'Name two guaranteed visible stars',
            'Orbiting Pair',
            'Printed Certificates',
            'Premium Gift Box'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'Arrives in 2–4 days'
        },
        badge: 'Luxury',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        type: 'Binary'
    },
    {
        name: 'Diamondnova - Digital',
        subtitle: 'The Ultimate Star',
        description: 'The brightest, most prestigious star naming experience available.',
        price: 9999,
        features: [
            'Extra Bright Visible Star (Mag < 4.5)',
            'Priority Registration',
            'Premium Digital Cert',
            'VIP Support'
        ],
        delivery: {
            digital: 'Ready in 10 minutes',
            physical: 'N/A'
        },
        badge: 'Ultimate',
        gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
        image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80',
        type: 'Luxury'
    },
    {
        name: 'Diamondnova - Gift Pack',
        subtitle: 'Prestige Collection',
        description: 'An elite gift box representing the pinnacle of celestial naming.',
        price: 14999,
        features: [
            'Extra Bright Visible Star (Mag < 4.5)',
            'Gold-Foiled Certificate',
            'Premium Wood Frame',
            'Crystal Star Ornament'
        ],
        delivery: {
            digital: 'Ready in 10 minutes',
            physical: 'Arrives in 2-3 days'
        },
        badge: 'Exclusive',
        gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
        image: 'https://images.unsplash.com/photo-1506318171071-a8bcbf675b27?auto=format&fit=crop&w=800&q=80',
        type: 'Luxury'
    },
    {
        name: 'Zodiac Star - Digital',
        subtitle: 'Aligned with Destiny',
        description: 'Name a star within your specific Zodiac sign constellation.',
        price: 2999,
        features: [
            'Star in Specific Zodiac Constellation',
            'Astrology Report Included',
            'Digital Zodiac Certificate',
            'AR Sky Guide'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'N/A'
        },
        badge: 'Astrology',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80',
        type: 'Zodiac'
    },
    {
        name: 'Little Star - Digital',
        subtitle: 'For the Little Ones',
        description: 'A magical star naming experience designed specifically for children.',
        price: 1499,
        features: [
            'Kid-Friendly Certificate Design',
            'Space Facts Booklet (PDF)',
            'Easy-to-find Star',
            'Space Coloring Pages'
        ],
        delivery: {
            digital: 'Ready in 15 minutes',
            physical: 'N/A'
        },
        badge: 'For Kids',
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80',
        type: 'Kids'
    }
];

// Import into DB
const importData = async () => {
    try {
        await Package.deleteMany();

        await Package.create(packages);

        console.log('Data Imported...'.green.inverse);
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
        await Order.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
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
}
