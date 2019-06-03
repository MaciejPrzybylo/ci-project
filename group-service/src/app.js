const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const createGroupOperation = require("./operation/create.js")
const findAllByOwnerIdOperation = require("./operation/find-all-by-owner-id.js")
const deleteGroupOperation = require("./operation/delete.js")
const updateGroupOperation = require("./operation/update.js")

app.post("/create", (req, res) => {
	createGroupOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/delete", (req, res) => {
	deleteGroupOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/update", (req, res) => {
	updateGroupOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-all-by-owner-id", (req, res) => {
	findAllByOwnerIdOperation(req.body.ownerId, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("group service started, listening on port: " + port)
})

