const axios = require("axios")
const config = require("../config.json")
const randomstring = require("randomstring")

module.exports = function(accountId, callback) {
	let mongoServiceRequestBody = {
		"collection": "salt",
		"database": "default",
		"data": {
			"accountId" : accountId,
			"value": randomstring.generate()
		}
	}
	axios.post(config.mongoService + "/insert-one", mongoServiceRequestBody).then((response) => {
		console.log(response.data)
		axios.post(config.mongoService + "/find-one", mongoServiceRequestBody).then((response) => {
			callback(response.data, 200)
		}).catch((err) => {
			callback(err, 500)
		})
	}).catch((err) => {
		console.error(err)
		callback(err, 500)
	})
}

