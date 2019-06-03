const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const createSecretOperation = require("./operation/create-secret.js")
const findByAccountIdOperation = require("./operation/find-secret-by-account-id.js")
const validateSecretOperation = require("./operation/validate-secret.js")

app.post("/create", (req, res) => {
	createSecretOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-by-account-id", (req, res) => {
	findByAccountIdOperation(req.body.accountId, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/validate", (req, res) => {
	validateSecretOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("secret service started, listening on port: " + port)
})

