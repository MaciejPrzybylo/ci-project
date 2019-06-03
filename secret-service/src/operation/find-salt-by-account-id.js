const axios = require("axios")
const config = require("../config.json")

module.exports = function(accountId, callback) {
	mongoServiceRequestBody = {
		"collection": "salt",
		"database": config.database,
		"data": {
			"accountId": accountId
		}
	}
	axios.post(config.mongoService + "/find-one", mongoServiceRequestBody).then((response) => {
		console.log(response.data)
		callback(response.data, 200)
	}).catch((err) => {
		console.error(err)
		callback(err, 500)
	})
}

