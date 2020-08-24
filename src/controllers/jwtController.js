const dotenv = require('dotenv').config();
const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const runMiddleware = require('run-middleware');
const { isEmpty, values, keys } = require('lodash');

const app = require('../../index');
const { user, cacheDuration } = require('../constants');

runMiddleware(app);

//secret key information stored for caching
let accessKeyInfo = {}

//middleware for /verify route 
const authenticateToken = (req, res, next) => {

	try {
		//to verify the signature once the access token is available 
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		//if no authorization header or token found returns 'unauthorized'
		if (token == null)
			return res.sendStatus(401).end();

		//validates the secret key and provides caching for a given duration
		const apiKey = validateKey();

		//verifies the jwt token
		jwt.verify(token, apiKey, (err, user) => {
			if (err)
				return res.sendStatus(403).end();
			req.user = user;
			next();
		})
	} catch (err) {
		res.sendStatus(400).end();
	}
	return true;
};

//generates access token provided the user details and secret key
const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

//validates the secret key
const validateKey = () => {

    let currentTime = Date.now();
    let accessKey;

    //generates a secret key with the current time stamp
    //if there is no previous token stored or the token has expired
    if ((isEmpty(accessKeyInfo))
    	|| currentTime - values(accessKeyInfo)[0] > cacheDuration
    ) {
    	//fetches the secret key from a public endpoint
    	app.runMiddleware('/access-key', (_, body) => accessKey = body);
        accessKeyInfo[accessKey] = currentTime;
    }
    //if the token has not expired
    return keys(accessKeyInfo)[0];
};

module.exports = {
	authenticateToken,
	generateAccessToken,
};
