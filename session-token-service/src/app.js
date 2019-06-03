const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const createSessionOperation = require("./operation/create-session.js")
const findSessionByIdOperation = require("./operation/find-session-by-id.js")
const findSessionOperation = require("./operation/find-session.js")
const updateSessionOperation = require("./operation/update.js")
const deleteSessionOperation = require("./operation/delete.js")

app.post("/create", (req, res) => {
	createSessionOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/update", (req, res) => {
	updateSessionOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/delete", (req, res) => {
	deleteSessionOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-by-id", (req, res) => {
	findSessionByIdOperation(req.body.sessionId, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find", (req, res) => {
    findSessionOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("account service started, listening on port: " + port)
})

