const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const findAccountOperation = require("./operation/account.js")

app.get("/account", (req, res) => {
    if (req.header("Session-Token")) {
        console.log("using session token: ")
        console.log(req.header("Session-Token"))
        
	    findAccountOperation(req.header("Session-Token"), (result, statusCode) => {
		    res.statusCode = statusCode
		    res.send(result)
	    })
    } else {
        res.statusCode = 403
        res.send("No session token header present")
    }
})

app.listen(port, () => {
	console.log("dashboard service started, listening on port: " + port)
})

