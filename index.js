require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const cors = require('cors')

const app =  express()

const user = { name: 'Sebanti' }
var secret_key_info = {}

app.use(express.json())

let tokens = []



app.get('/api', authenticateToken, (req, res) => {
	res.sendStatus(200)
})

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

function generateSecretKey()
{
	return process.env.ACCESS_TOKEN_SECRET
}

function func(){
    let currentTime = Date.now()
    if((_.isEmpty(secret_key_info)) || currentTime - _.values(secret_key_info)[0] > 10*1000){
        console.log("in if block....", secret_key_info)
        let secret_key = generateSecretKey()
        secret_key_info.secret_key = currentTime
    }
    return _.keys(secret_key_info)[0]
}


function authenticateToken(req, res, next) {
	/*const token = generateAccessToken(user)
	console.log(token)*/

	const authHeader = req.headers['authorization'] //.get()
	const token = authHeader && authHeader.split(' ')[1]

	if(token == null)
		return res.sendStatus(401).end()

	//validate key
	func();

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if(err)
			return res.sendStatus(403).end()
		req.user = user
		next()
	})
}

app.listen(3000);
