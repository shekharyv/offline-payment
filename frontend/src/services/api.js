import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  verifyOtp: async (mobile, otp) => {
    try {
      const response = await api.post('/auth/verify', { mobile, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export const paymentService = {
  createPayment: async (amount, recipient) => {
    try {
      const response = await api.post('/payments/create', { amount, recipient });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getHistory: async () => {
    try {
      const response = await api.get('/transactions');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
