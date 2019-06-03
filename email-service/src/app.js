const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const sendActivationEmailOperation = require("./operation/send-activation-email.js")

app.post("/send-activation-email", (req, res) => {
	sendActivationEmailOperation(req.body.account, req.body.activationLink, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.listen(port, () => {
	console.log("account service started, listening on port: " + port)
})

