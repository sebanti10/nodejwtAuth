# token-validator

This application implements JWT token based authorization.
It accepts a JWT token in the authorization header and verifies the signature in the token.
The public key is picked from endpoint '/access-key'. 

## Setup

 - **Install Dependencies** - `npm install` 
 - **Run the Application** - `node
   index.js`
- **Set Token** - Set JWT token in the authorization header

## Cache duration

 - The cache duration is set as 10s as of now.
 - It is customizable as per requirements using codebase.
