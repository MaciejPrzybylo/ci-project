const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const createRoleOperation = require("./operation/create.js")
const deleteRoleOperation = require("./operation/delete.js")
const findAllRolesOperation = require("./operation/find-all.js")

app.post("/create", (req, res) => {
	createRoleOperation(req.body.organisation, req.body.role, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-all", (req, res) => {
	findAllRolesOperation(req.body.organisation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/delete", (req, res) => {
	deleteRoleOperation(req.body.organisation, req.body.role, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("role service started, listening on port: " + port)
})

