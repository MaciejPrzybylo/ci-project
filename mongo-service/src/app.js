const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const operation = require("./operation.js")

const insertManyOperation = require("./operation/insert-many.js")
const insertOneOperation = require("./operation/insert-one.js")
const findAllOperation = require("./operation/find-all.js")
const findOneOperation = require("./operation/find-one.js")
const findbyIdOperation = require("./operation/find-by-id.js")
const deleteOneOperation = require("./operation/delete-one.js")
const updateOneOperation = require("./operation/update-one.js")

app.post("/insert-many", (req, res) => {
	operation(req, insertManyOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
}) 
app.post("/insert-one", (req, res) => {
	operation(req, insertOneOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-by-id", (req, res) => {
	operation(req, findbyIdOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-all", (req, res) => {
	operation(req, findAllOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/find-one", (req, res) => {
	operation(req, findOneOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/delete-one", (req, res) => {
	operation(req, deleteOneOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/update-one", (req, res) => {
	operation(req, updateOneOperation, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("mongo service started, listening on port: " + port)
})

