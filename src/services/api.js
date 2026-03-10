// API Service for Star Naming Frontend
// Copy this file to your React project: src/services/api.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper function to get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

// API Service Object
export const api = {
    // ==================== AUTHENTICATION ====================

    // Register a new user
    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await handleResponse(response);

        // Save token to localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
            if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        } else if (data.data && data.data.token) {
            localStorage.setItem('token', data.data.token);
            if (data.data.user) localStorage.setItem('user', JSON.stringify(data.data.user));
        }

        return data;
    },

    // Login user
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await handleResponse(response);

        // Save token to localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
            if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        } else if (data.data && data.data.token) {
            localStorage.setItem('token', data.data.token);
            if (data.data.user) localStorage.setItem('user', JSON.stringify(data.data.user));
        }

        return data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: async () => {
        const token = getToken();

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // Update password
    updatePassword: async (passwords) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/auth/updatepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(passwords),
        });

        return handleResponse(response);
    },

    // ==================== PACKAGES ====================

    // Get all packages
    getPackages: async () => {
        const response = await fetch(`${API_URL}/packages`);
        return handleResponse(response);
    },

    // Get single package by ID
    getPackageById: async (id) => {
        const response = await fetch(`${API_URL}/packages/${id}`);
        return handleResponse(response);
    },

    // Create package (Admin only)
    createPackage: async (packageData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(packageData),
        });

        return handleResponse(response);
    },

    // Update package (Admin only)
    updatePackage: async (id, packageData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/packages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(packageData),
        });

        return handleResponse(response);
    },

    // Delete package (Admin only)
    deletePackage: async (id) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/packages/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // ==================== ORDERS ====================

    // Create new order
    createOrder: async (orderData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });

        return handleResponse(response);
    },

    // Get all orders (user's orders or all if admin)
    getOrders: async () => {
        const token = getToken();

        const response = await fetch(`${API_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // Get single order by ID
    getOrderById: async (id) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/orders/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // Update payment status
    updatePaymentStatus: async (id, paymentData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/orders/${id}/payment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(paymentData),
        });

        return handleResponse(response);
    },

    // Create Razorpay order
    createRazorpayOrder: async (paymentData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/payment/razorpay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(paymentData),
        });

        return handleResponse(response);
    },

    // Verify Razorpay payment
    verifyRazorpayPayment: async (verificationData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/payment/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(verificationData),
        });

        return handleResponse(response);
    },

    // Update order status (Admin only)
    updateOrderStatus: async (id, statusData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(statusData),
        });

        return handleResponse(response);
    },

    // Delete order (Admin only)
    deleteOrder: async (id) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/orders/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // ==================== USERS ====================

    // Get user profile
    getUserProfile: async () => {
        const token = getToken();

        const response = await fetch(`${API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // Update user profile
    updateUserProfile: async (userData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        return handleResponse(response);
    },

    // Get all users (Admin only)
    getAllUsers: async () => {
        const token = getToken();

        const response = await fetch(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // Delete user (Admin only)
    deleteUser: async (id) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse(response);
    },

    // ==================== HEALTH CHECK ====================

    // Check API health
    healthCheck: async () => {
        const response = await fetch(`${API_URL}/health`);
        return handleResponse(response);
    },
};

// Export helper functions
export const isAuthenticated = () => {
    return !!getToken();
};

export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = api.logout;

export default api;
