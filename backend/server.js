require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const transactionRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');
const chartRoutes = require('./routes/charts');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api', summaryRoutes);
app.use('/api/charts', chartRoutes);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
