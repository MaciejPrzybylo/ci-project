const error = require("./error.js")

function errorMessage(req, operation) {
	return error.message(
			operation.name,
			req.body.collection,
			req.body.database,
			req.body.data
		)
}

function isNotValid(string) {
	return (!string || string === "")
}

module.exports = function(req, operation, callback) {
	if (isNotValid(req.body.database) || isNotValid(req.body.collection))	{
		callback(errorMessage(req, operation), 500)
	} else {
		operation(req.body.database, req.body.collection, req.body.data, (err, result) => {
			if (err) {
                console.log("could not insert: " + req.body.database)
				callback(errorMessage(req, operation), 500)
            } else {
			    callback(result, 200)
            }
		})
	}
}

