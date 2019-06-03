const axios = require("axios")
const config = require("../config.json")
const findAccountByEmailOperation = require("./find-by-email.js")

module.exports = function(email, callback) {
    axios.post(config.mongoService + "/delete-one", {
        "database": config.database,
        "collection": config.collection,
        "data": {
            "email": email
        }
    }).then((response) => {
        callback("Account deleted", 200)
    }).catch((error) => {
        callback("Failed to delete account", 500)
    })
}

