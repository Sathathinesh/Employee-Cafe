const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cafeRoutes = require('./routes/cafeRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use('/api', cafeRoutes);
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});