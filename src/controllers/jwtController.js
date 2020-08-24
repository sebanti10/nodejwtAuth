const dotenv = require('dotenv')
const express = require('express')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const cors = require('cors')
const fetch = require('node-fetch')
const http = require('http')


//user details
const user = { name: 'Sebanti' }

//secret key information stored for caching
let secret_key_info = {}

//cache duation
const duration = 10


//configuration for the .env file
dotenv.config()


//middleware for /api route 
const authenticateToken = function (req, res, next) {

	//to generate access token
	/*const token = generateAccessToken(user)
	console.log(token)*/

	try {
		//to verify the signature once the access token is available 
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]

		//if no authorization header or token found returns 'unauthorized'
		if(token == null)
			return res.sendStatus(401).end()

		//validates the secret key and provides caching for a given duration
		validateKey();

		//verifies the jwt token
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if(err)
				return res.sendStatus(403).end()
			req.user = user
			next()
		})
	} catch(err) {
		console.log(err)
		res.sendStatus(403).end()
	}
}

//generates access token provided the user details and secret key
function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


//validates the secret key
function validateKey(){

    let currentTime = Date.now()

    //generates a secret key with the current time stamp
    //if there is no previous token stored or the token has expired
    if((_.isEmpty(secret_key_info)) || currentTime - _.values(secret_key_info)[0] > duration*1000){
        
        //console.log("in if block....", secret_key_info)

        //fetches the secret key from a public endpoint
        http.get('http://localhost:3000/token', (res) => {
		    res.setEncoding('utf8')
		    res.on('data', function (body) {
		        let secret_key = JSON.parse(body).ACCESS_TOKEN_SECRET
		        //console.log(secret_key)
		    })
		})
        secret_key_info.secret_key = currentTime
    }
    //if the token has not expired
    return _.keys(secret_key_info)[0]
}


module.exports = {
	authenticateToken
}