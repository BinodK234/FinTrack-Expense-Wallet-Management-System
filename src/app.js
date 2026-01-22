const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.route")
const walletRoutes = require('./routes/wallet.route');
const reportRoutes = require('./routes/report.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/reports', reportRoutes)

// app.get('/health', (req, res) =>{
//     res.json({status: 'Backend running fine'})
// })
module.exports = app;