const mongoose = require('mongoose');
const dns = require('dns');

// Override DNS to use Google's Public DNS (helps bypass ECONNREFUSED on SRV)
dns.setServers(['8.8.8.8']);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/star-naming', {
            // New Mongoose 6+ defaults make these options unnecessary but safe to keep if needed for older versions
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        console.log('⚠️ Falling back to Memory Store or limited functionality.');
        // Don't exit process, allow the app to run with memory store if implemented
    }
};

module.exports = connectDB;
