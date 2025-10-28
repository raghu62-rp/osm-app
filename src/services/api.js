// API utilities for authentication and orders
const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return data;
    }
    throw new Error(data.message || 'Login failed');
  } catch (error) {
    // Network or other unexpected error. In development, return a mock user so UI work can continue.
    console.error('Login error:', error);
    try {
      if (import.meta && import.meta.env && import.meta.env.MODE === 'development') {
        const mockData = {
          token: 'mock-token',
          _id: 'local-user-1',
          name: 'Local Dev',
          email,
        };
        localStorage.setItem('token', mockData.token);
        return mockData;
      }
    } catch (e) {
      // ignore import.meta access errors and fall through
    }

    // In production or if not in development, provide a clearer error message
    throw new Error('Unable to reach authentication server. Please check your backend or network.');
  }
};

export const getOrders = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message || 'Failed to fetch orders');
};

export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message || 'Failed to create order');
};