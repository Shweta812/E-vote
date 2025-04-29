require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');

const app = express();
// Database
connectDB();
// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // frontend Vite default port
    credentials: true
  }));
app.use(express.json());
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/elections', require('./routes/elections'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));