const axios = require("axios")
const config = require("../config.json")

module.exports = function(ownerId, callback) {
	axios.post(config.mongoService + "/find-all", {
		"collection": config.collection,
		"database": config.database,
		"data": {
			"owner": ownerId
		}
	}).then((response) => {
		console.log(response.data)
		callback(response.data, 200)
	}).catch((err) => {
		console.log(err)
		callback(err, 500)
	})
}

