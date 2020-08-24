const express = require("express");

const verify = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.sendStatus(200);
};

const secretKey = (req,res) => res.send(process.env.ACCESS_TOKEN_SECRET);

module.exports = {
	verify,
	secretKey,
};
