const express = require('express')
const cors = require('cors')

const { verify, token } = require('./src/routes/jwtRoutes')
const { authenticateToken } = require('./src/controllers/jwtController')


const app =  express()
app.use(express.json())

//port number
const PORT = process.env.PORT || 3000;

app.get('/verify', authenticateToken, verify)
app.get('/token', token)


//listening on port 
app.listen(3000, (req, res) => {
	console.log("Server is running on port 3000")
})
