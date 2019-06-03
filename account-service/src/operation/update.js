const axios = require("axios")
const config = require("../config.json")

module.exports = function(account, callback) {
    axios.post(config.mongoService + "/update-one", {
        "database": config.database,
        "collection": config.collection,
        "data": account
    }).then((response) => {
        callback(response.data, 200)
    }).catch((err) => {
        console.error(err)
        callback(err, 500)
    })
}

