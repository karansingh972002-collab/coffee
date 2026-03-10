const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const promoteToAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected.');

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`Success! User ${user.email} promoted to admin.`);
        } else {
            console.log(`User with email ${email} not found.`);
            console.log('Creating a default admin account: admin@hk.com / Admin@123');

            const adminUser = await User.create({
                name: 'System Admin',
                email: 'admin@hk.com',
                password: 'Admin@123',
                role: 'admin'
            });
            console.log(`Created new admin: ${adminUser.email}`);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// You can pass an email as an argument, otherwise it defaults to creating admin@hk.com
const targetEmail = process.argv[2] || 'admin@hk.com';
promoteToAdmin(targetEmail);
