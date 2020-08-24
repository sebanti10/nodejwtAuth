const express = require('express');

const app =  module.exports = express();

const cors = require('cors');
const { verify, secretKey } = require('./src/routes/jwtRoutes');
const { authenticateToken } = require('./src/controllers/jwtController');

//port number
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/verify', authenticateToken, verify);
app.get('/secretKey', secretKey);

//listening on port 
app.listen(3000, (req, res) => {
	console.log(`Server is running on port: ${PORT}`);
});
