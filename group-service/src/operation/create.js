const axios = require("axios")
const config = require("../config.json")

module.exports = function(group, callback) {
    let name = group.name
    let members = group.members
	axios.post(config.mongoService + "/insert-one", {
		"collection": config.collection,
		"database": config.database,
        "data": {
            "name": name,
            "members": members
        }
	}).then((response) => {
		console.log(response.data)
		callback(response.data, 200)
	}).catch((err) => {
		console.log(err)
		callback(err, 500)
	})
}

