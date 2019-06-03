const axios = require("axios")
const config = require("../config.json")

module.exports = function(organisation, callback) {
	axios.post(config.mongoService + "/find-all", {
		"database": organisation,
		"collection": config.collection,
        "data": {}
	}).then((response) => {
        console.log(response)
		callback(response.data, 200)
	}).catch((err) => {
		console.log(err)
		callback("failed to retrieve roles", 500)
	})
}

