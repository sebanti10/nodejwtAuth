const express = require("express")


const verify = (req, res) => {
	res.sendStatus(200)
}

const token = (req,res) => {
	res.json({'ACCESS_TOKEN_SECRET': process.env.ACCESS_TOKEN_SECRET})
}


module.exports = {
	verify,
	token
}