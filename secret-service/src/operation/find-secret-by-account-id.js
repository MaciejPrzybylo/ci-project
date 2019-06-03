const axios = require("axios")
const config = require("../config.json")
const HttpStatus = require("http-status-codes")

module.exports = function(accountId, callback) {
	mongoServiceRequestBody = {
		"collection": config.collection,
		"database": config.database,
		"data": {
			"accountId": accountId
		}
	}
	axios.post(config.mongoService + "/find-one", mongoServiceRequestBody).then((response) => {
        if (response.data) {
		    callback(response.data, HttpStatus.OK)
        } else {
            callback(config.error.secretNotFoundForAccountId, HttpStatus.BAD_REQUEST)
        }
	}).catch((err) => {
		console.error(err)
		callback(err, HttpStatus.INTERNAL_SERVER_ERROR)
	})
}

