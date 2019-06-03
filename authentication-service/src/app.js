const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

// const createAccountOperation = require("./operation/create.js")
const loginOperation = require("./operation/login.js")
const registerOperation = require("./operation/register.js")
const activateOperation = require("./operation/activate.js")
const authenticateOperation = require("./operation/authenticate.js")

app.all("/authenticate", (req, res) => {
    if (req.header("Session-Token")) {
        // find out who the user is
        // find out what group (organisation) the user is in
        // find out what role the user is in that particular organisation
        // grant access based on the requested resource vs resources allowed for that role
	    authenticateOperation(req.header("Session-Token"), (result, statusCode) => {
		    res.statusCode = statusCode
		    res.send(result)
	    })
    } else {
        res.statusCode = 403
        res.send("No session token header present")
    }
})

app.post("/login", (req, res) => {
	loginOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.post("/register", (req, res) => {
	registerOperation(req.body, (result, statusCode) => {
		res.statusCode = statusCode
		res.send(result)
	})
})

app.get("/activate/:encryptedAccount", (req, res) => {
    activateOperation(req.params.encryptedAccount, (result, statusCode) => {
        res.statusCode = statusCode
        res.send(result)
    })
})

app.listen(port, () => {
	console.log("account service started, listening on port: " + port)
})

