const axios = require("axios")
const config = require("../config.json")

function encrypt(data, responseHandle, errorHandle) {
    axios.post(config.aesEncryptionService + "/encrypt", {"data": data}).then((response) => {
        responseHandle(response.data)
    }).catch((err) => {
        console.error("failed to encrypt")
        errorHandle(err)
    })
}

function createSession(session, responseHandle, errorHandle) {
    axios.post(config.mongoService + "/insert-one", {
        "collection": config.collection,
        "database": config.database,
        "data": {
            "session": session
        }
    }).then((response) => {
        responseHandle(response.data)
    }).catch((error) => {
        console.error("could not create session")
        errorHandle(error)
    })
}

function getCreatedSessionId(createdSession, responseHandle, errorHandle) {
    axios.post(config.mongoService + "/find-one", {
        "collection": config.collection,
        "database": config.database,
        "data": {
            "session": createdSession
        }
    }).then((response) => {
        responseHandle(response.data)
    }).catch((err) => {
        console.error("failed to get session id")
        errorHandle(err)
    })
}

module.exports = function(data, callback) {
    encrypt(data, (encryptedData) => {
        createSession(encryptedData, (session) => {
            getCreatedSessionId(encryptedData, (sessionId) => {
                callback(sessionId, 200)
            }, (error) => {
                callback(error, 500)
            })
        }, (error) => {
            callback(error, 500) }) }, (error) => {
        console.error(error)
        callback(error, 500)
    })
}

