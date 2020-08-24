# nodejwtAuth

This application implements JWT token basedauthorization. It accepts a JWT token in the authorization header and verifies the signature in the token. The public key is picked from endpoint '/token'. 

Caching duration is primarily set to 10s, but can be modified and instructions have been given below. 

## Run the application

To run this application, run this command in temrinal/ command prompt:

    node index.js
<br> Go to 'Authorization' and add the JWT token in the 'BEARER TOKEN' authorization header.

## Folder Structure

The folder structure is as follows-
```
nodejwtAuth
|--- index.js - the entry point
|--- src
		|--- controllers - controlls authorization and verification
			|--- jwtController.js
		|--- routes - contains all the routes
			|--- jwtRoutes.js
|--- package.json
|--- package-lock.json
```

## How to change the cache duration

You can customize the cache duration by following the steps mentioned below:
 1. Go to /src/controllers/jwtController.js
 2. Change the duration variable in line 17 to the desired time duration for cache (in seconds)