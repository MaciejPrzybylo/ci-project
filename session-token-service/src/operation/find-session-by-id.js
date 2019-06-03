const axios = require("axios")
const config = require("../config.json")

function decrypt(encryptedData, responseHandle, errorHandle) {
    axios.post(config.aesEncryptionService + "/decrypt", {"data": encryptedData}).then((response) => {
        responseHandle(response.data)
    }).catch((err) => {
        console.error("failed to decrypt")
        errorHandle("failed to decrypt")
    })
}

function getSessionById(sessionId, responseHandle, errorHandle) {
    console.log("searching for sessionId: " + sessionId) 
    axios.post(config.mongoService + "/find-by-id", {
        "collection": config.collection,
        "database": config.database,
        "data": {
            "_id": sessionId
        }
    }).then((response) => {
        console.log(response)
        if (response.data.session) {
            responseHandle(response.data.session)
        } else {
            errorHandle("session doesn't exist")
        }
    }).catch((err) => {
        console.error("could not get session by id")
        errorHandle(err)
    })
}

module.exports = function(sessionId, callback) {
    getSessionById(sessionId, (encryptedSession) => {
        console.log("return session: " + encryptedSession)
        decrypt(encryptedSession, (session) => {
            callback(session, 200)
        }, (error) => {
            console.error(error)
            callback(error, 500)
        })
    }, (error) => {
        console.error(error)
        callback(error, 500)
    }) 
}

