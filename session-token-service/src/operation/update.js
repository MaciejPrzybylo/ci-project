const axios = require("axios")
const config = require("../config.json")

function encrypt(data, responseHandle, errorHandle) {
    axios.post(config.aesEncryptionService + "/encrypt", {"data": data}).then((response) => { responseHandle(response.data)
    }).catch((err) => {
        console.error("failed to encrypt")
        errorHandle(err)
    })
}

function updateSession(session, responseHandle, errorHandle) {
    axios.post(config.mongoService + "/update-one", {
        "collection": config.collection,
        "database": config.database,
        "data": session
    }).then((response) => {
        responseHandle(response.data)
    }).catch((error) => {
        errorHandle("Failed to update session")
    })
}

module.exports = function(session, callback) {
    encrypt(session, (encryptedSession) => {
        updateSession({"_id": session._id, "session": encryptedSession}, (session) => {
            callback(session, 200)
        }, (error) => {
            console.error(error)
            callback(error, 500)
        })
    })
}

