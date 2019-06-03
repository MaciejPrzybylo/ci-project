const axios = require("axios")
const config = require("../config.json")
const HttpStatus = require("http-status-codes")
const mongoService = config.service.mongoService

module.exports = function(email, callback) {
	axios.post(mongoService.url + mongoService.findOne, {
		"collection": config.collection,
		"database": config.database,
		"data": {
			"email": email
		}
	}).then((response) => {
		console.log(response.data)
        if (response.data) {
		    callback(response.data, HttpStatus.OK)
        } else {
            callback(config.error.accountNotFound, HttpStatus.BAD_REQUEST)
        }
	}).catch((err) => {
		console.error(err)
		callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
	})
}

