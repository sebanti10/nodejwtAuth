require('dotenv').config();
const jwt = require('jsonwebtoken');
const runMiddleware = require('run-middleware');
const { isEmpty, values, keys } = require('lodash');

const app = require('../../index');
const { user, cacheDuration } = require('../constants');

runMiddleware(app);

// secret key information stored for caching
const accessKeyInfo = {};

// validates the secret key
const validateKey = () => {
  const currentTime = Date.now();
  let accessKey;

  // if there is no token stored previously or the token has expired
  if ((isEmpty(accessKeyInfo))
  || currentTime - values(accessKeyInfo)[0] > cacheDuration
  ) {
    // fetches the secret key from a public endpoint
    app.runMiddleware('/access-key', (_, body) => {
      accessKey = body;
      return accessKey;
    });
    accessKeyInfo[accessKey] = currentTime;
  }
  // if the token has not expired
  return keys(accessKeyInfo)[0];
};

// middleware for /verify route
const authenticateToken = async (req, res, next) => {
  try {
    // to verify the signature once the access token is available
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // if no authorization header or token found returns 'unauthorized'
    if (token == null) {
      return res.sendStatus(401).end();
    }

    // validates the secret key and provides caching for a given duration
    const apiKey = await validateKey();

    // verifies the jwt token
    jwt.verify(token, apiKey, (err) => {
      if (err) {
        return res.sendStatus(403).end();
      }
      req.user = user;
      next();
      return null;
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.sendStatus(400).end();
    }
  }
  return true;
};

// generates access token provided the user details and secret key
const generateAccessToken = () => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

module.exports = {
  authenticateToken,
};
