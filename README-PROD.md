# Production Deployment Guide - Star Naming Website

This guide outlines the steps and environment variables required to deploy the "Star Naming" website to a production environment.

## Backend Deployment (Node.js/Express)

### Required Environment Variables (.env)
Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_live_key_id
RAZORPAY_KEY_SECRET=your_razorpay_live_key_secret
ALLOW_PAYMENT_MOCK=false
```

### Steps to Run
1. `cd backend`
2. `npm install`
3. `npm start` (Make sure your `package.json` in backend has a start script)

## Frontend Deployment (React/Vite)

### Required Environment Variables (.env)
Create a `.env` file in the root directory for building the frontend:

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Steps to Build
1. `npm install`
2. `npm run build`
3. Deploy the contents of the `dist/` folder to your static hosting provider (e.g., Vercel, Netlify, S3).
4. Ensure your hosting provider is configured to route all requests to `index.html` (SPA routing). The included `vercel.json` already handles this for Vercel.

## Security Recommendations
- Use HTTPS for both frontend and backend.
- Ensure CORS in `backend/server.js` is restricted to your production domain if possible.
- Regularly rotate your JWT secret and Razorpay keys.
