const axios = require("axios")
const config = require("../config.json")

module.exports = function(group, callback) {
    let name = group.name
    let members = group.members
	axios.post(config.mongoService + "/delete-one", {
		"collection": config.collection,
		"database": config.database,
        "data": {
            "name": name,
            "members": members
        }
	}).then((response) => {
		console.log(response.data)
		callback("Group deleted", 200)
	}).catch((err) => {
		console.error(err)
		callback("Failed to delete group", 500)
	})
}

