import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let users = {};
let transactions = [
  { id: '1', type: 'sent', recipient: 'Rahul Sharma', amount: 500, date: '2026-04-09T10:30:00Z', status: 'success' },
  { id: '2', type: 'received', recipient: 'Priya Patel', amount: 1200, date: '2026-04-08T15:45:00Z', status: 'success' },
  { id: '3', type: 'sent', recipient: 'Grocery Store', amount: 350, date: '2026-04-07T09:15:00Z', status: 'failed' },
  { id: '4', type: 'sent', recipient: 'Electricity Bill', amount: 890, date: '2026-04-05T18:20:00Z', status: 'success' },
  { id: '5', type: 'received', recipient: 'Amit Kumar', amount: 2000, date: '2026-04-02T11:00:00Z', status: 'success' },
];

// Routes
// 1. Mock Login/Register
app.post('/api/auth/verify', (req, res) => {
  const { mobile, otp } = req.body;
  
  if (!mobile || !otp) {
    return res.status(400).json({ error: 'Mobile and OTP required' });
  }

  // Demo validation: Check for 1234
  if (otp !== '1234') {
    return res.status(401).json({ success: false, error: 'Invalid OTP' });
  }

  // Generate a mock token
  const token = `mock-token-${mobile}`;
  users[token] = { mobile };

  res.json({ success: true, token, user: { mobile } });
});

// 2. Fetch History
app.get('/api/transactions', (req, res) => {
  // In a real app we'd verify the token from headers
  res.json(transactions);
});

// 3. Create Payment Mock
app.post('/api/payments/create', (req, res) => {
  const { amount, recipient } = req.body;
  
  if (!amount || !recipient) {
    return res.status(400).json({ error: 'Amount and recipient required' });
  }

  const newTx = {
    id: String(transactions.length + 1),
    type: 'sent',
    recipient,
    amount: Number(amount),
    date: new Date().toISOString(),
    status: 'success'
  };

  transactions.unshift(newTx);
  
  res.json({ success: true, transaction: newTx });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Offline Payment Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
