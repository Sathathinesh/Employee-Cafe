const express = require('express');
const bodyParser = require('body-parser');
const cafeRoutes = require('./routes/cafeRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', cafeRoutes);
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
