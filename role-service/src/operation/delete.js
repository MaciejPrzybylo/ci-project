const axios = require("axios")
const config = require("../config.json")

module.exports = function(organisation, role, callback) {
    let name = role.name
    let services = role.services
	axios.post(config.mongoService + "/delete-one", {
		"database": organisation,
		"collection": config.collection,
        "data": role
	}).then((response) => {
		callback(response.data, 200)
	}).catch((err) => {
		console.log(err)
		callback(err, 500)
	})
}

