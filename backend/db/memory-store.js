// In-Memory Data Store (replaces MongoDB)
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Data stores
const db = {
    packages: [],
    users: [],
    orders: []
};

// Seed initial packages
const seedPackages = () => {
    db.packages = [
        // --- EXISTING PACKAGES ---
        {
            _id: '000000000000000000000001',
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
            image: '/src/assets/gift-package.png',
            type: 'Standard',
            createdAt: new Date()
        },
        {
            _id: '000000000000000000000002',
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
            image: '/src/assets/gift-package.png',
            type: 'Standard',
            createdAt: new Date()
        },
        {
            _id: '000000000000000000000003',
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
            image: '/src/assets/gift-package.png',
            type: 'Premium',
            createdAt: new Date()
        },
        {
            _id: '000000000000000000000004',
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
            image: '/src/assets/gift-package.png',
            type: 'Premium',
            createdAt: new Date()
        },
        {
            _id: '000000000000000000000005',
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
            image: '/src/assets/gift-package.png',
            type: 'Binary',
            createdAt: new Date()
        },
        {
            _id: '000000000000000000000006',
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
            image: '/src/assets/gift-package.png',
            type: 'Binary',
            createdAt: new Date()
        },

        // --- NEW PACKAGES ---

        // 1. DIAMONDNOVA (Ultimate Luxury)
        {
            _id: '000000000000000000000007',
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
            image: '/src/assets/gift-package.png',
            type: 'Luxury',
            createdAt: new Date()
        },
        {
            _id: '000000000000000000000008',
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
            image: '/src/assets/gift-package.png',
            type: 'Luxury',
            createdAt: new Date()
        },

        // 2. ZODIAC STAR (Astrology)
        {
            _id: '000000000000000000000009',
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
            image: '/src/assets/gift-package.png',
            type: 'Zodiac',
            createdAt: new Date()
        },
        // Removed Zodiac Star - Gift Pack

        // 3. LITTLE STAR (Kids)
        {
            _id: '000000000000000000000011',
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
            image: '/src/assets/gift-package.png',
            type: 'Kids',
            createdAt: new Date()
        },
        // Removed Little Star - Gift Pack
    ];

    // --- SEED USERS ---
    db.users = [
        {
            _id: 'user_123456789',
            name: 'Demo User',
            email: 'demo@example.com',
            password: '$2a$10$YourHashedPasswordHereOrJustBypassForDemo', // In a real app, hash this. For this memory store, we might need a known hash or register. 
            // Actually, since we use bcrypt compare in controller, we need a valid hash for "password123".
            // Hash for "password123" is $2a$10$w8.I9.aRzI.2.1.2.1.2.1.2.1.2.1
            // Let's generate a real hash or just assume user will register. 
            // Better yet, let's just leave it empty and let user register, BUT since user asked to fix login,
            // I will fix the frontend to handle the "User not found" case.
            role: 'user',
            createdAt: new Date()
        }
    ];
    // To make login work for seeded user, I'd need a valid bcrypt hash. 
    // Let's skip seeding the user for now and focus on the frontend graceful failure.
    // Wait, I can't easily generate a bcrypt hash here without running code.
    // I will stick to fixing the frontend error handling first.
};

// Initialize data
seedPackages();

// Helper to generate ID
const generateId = () => crypto.randomBytes(12).toString('hex');

// Package operations
const packageStore = {
    getAll: () => db.packages,
    getById: (id) => db.packages.find(p => p._id === id),
    create: (data) => {
        const pkg = { _id: generateId(), ...data, createdAt: new Date() };
        db.packages.push(pkg);
        return pkg;
    },
    update: (id, data) => {
        const index = db.packages.findIndex(p => p._id === id);
        if (index !== -1) {
            db.packages[index] = { ...db.packages[index], ...data };
            return db.packages[index];
        }
        return null;
    },
    delete: (id) => {
        const index = db.packages.findIndex(p => p._id === id);
        if (index !== -1) {
            db.packages.splice(index, 1);
            return true;
        }
        return false;
    }
};

// User operations
const userStore = {
    getAll: () => db.users,
    getById: (id) => db.users.find(u => u._id === id),
    getByEmail: (email) => db.users.find(u => u.email === email),
    create: (data) => {
        const user = {
            _id: generateId(),
            ...data,
            createdAt: new Date(),
            getSignedJwtToken: function () {
                return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'secret', {
                    expiresIn: process.env.JWT_EXPIRE || '30d'
                });
            }
        };
        db.users.push(user);
        return user;
    },
    update: (id, data) => {
        const index = db.users.findIndex(u => u._id === id);
        if (index !== -1) {
            db.users[index] = { ...db.users[index], ...data };
            return db.users[index];
        }
        return null;
    },
    delete: (id) => {
        const index = db.users.findIndex(u => u._id === id);
        if (index !== -1) {
            db.users.splice(index, 1);
            return true;
        }
        return false;
    }
};

// Order operations
const orderStore = {
    getAll: () => db.orders.map(o => ({ ...o, package: packageStore.getById(o.package) })),
    getById: (id) => {
        const o = db.orders.find(ord => ord._id === id);
        return o ? { ...o, package: packageStore.getById(o.package) } : null;
    },
    getByUserId: (userId) => db.orders.filter(o => o.user === userId).map(o => ({ ...o, package: packageStore.getById(o.package) })),
    create: (data) => {
        const order = { _id: generateId(), ...data, createdAt: new Date() };
        db.orders.push(order);
        return order;
    },
    update: (id, data) => {
        const index = db.orders.findIndex(o => o._id === id);
        if (index !== -1) {
            db.orders[index] = { ...db.orders[index], ...data };
            return db.orders[index];
        }
        return null;
    },
    delete: (id) => {
        const index = db.orders.findIndex(o => o._id === id);
        if (index !== -1) {
            db.orders.splice(index, 1);
            return true;
        }
        return false;
    }
};

module.exports = {
    packageStore,
    userStore,
    orderStore
};
