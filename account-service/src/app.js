const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const createAccountOperation = require("./operation/create.js")
const deleteAccountOperation = require("./operation/delete-by-email.js")
const findAccountByEmailOperation = require("./operation/find-by-email.js")
const updateAccountOperation = require("./operation/update.js")

app.post("/create", (req, res) => {
	createAccountOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-by-email", (req, res) => {
	findAccountByEmailOperation(req.body.email, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/delete-by-email", (req, res) => {
	deleteAccountOperation(req.body.email, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/update", (req, res) => {
	updateAccountOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("account service started, listening on port: " + port)
})

