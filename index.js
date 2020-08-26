const express = require('express');

const app = express();
module.exports = app;

const cors = require('cors');
const { verify, accessKey } = require('./src/routes/jwtRoutes');
const { authenticateToken } = require('./src/controllers/jwtController');

// port number
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/verify', authenticateToken, verify);
app.get('/access-key', accessKey);

// listening on port
app.listen(3000, () => {
  console.log(`Server is running on port: ${PORT}`);
});
