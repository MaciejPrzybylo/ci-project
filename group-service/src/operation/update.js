const axios = require("axios")
const config = require("../config.json")

module.exports = function(group, callback) {
    axios.post(config.mongoService + "/update-one", {
        "database": config.database,
        "collection": config.collection,
        "data": group
    }).then((response) => {
        callback("Successfully updated group", 200)
    }).catch((err) => {
        callback("Failed to update group", 500)
    })
}

