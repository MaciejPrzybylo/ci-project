const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const encryptOperation = require("./operation/encrypt.js")
const decryptOperation = require("./operation/decrypt.js")
    
app.post("/encrypt", (req, res) => {
    encryptOperation(req.body.data, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/decrypt", (req, res) => {
    decryptOperation(req.body.data, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("aes encryption service service started, listening on port: " + port)
})

