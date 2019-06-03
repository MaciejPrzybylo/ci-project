const axios = require("axios")
const config = require("../config.json")

module.exports = function(session, callback) {
    axios.post(config.mongoService + "/delete-one", {
        "database": config.database, 
        "collection": config.collection,
        "data": {
            "_id": session._id
        }
    }).then(() => {
        callback("Sucessfully delete session", 200)
    }).catch((error) => {
        console.error(error)
        callback("Failed to delete session", 500)
    })
}

