const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.route")

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
// app.get('/health', (req, res) =>{
//     res.json({status: 'Backend running fine'})
// })
module.exports = app;