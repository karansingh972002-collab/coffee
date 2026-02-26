const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();


// Route files
const auth = require('./routes/auth.routes');
const packages = require('./routes/package.routes');
const orders = require('./routes/order.routes');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/packages', packages);
app.use('/api/orders', orders);
app.use('/api/payment', require('./routes/payment.routes'));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running' });
});

// Root route
app.get('/', (req, res) => {
    res.send('API is running. Access the frontend at <a href="http://localhost:5173">http://localhost:5173</a>');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
