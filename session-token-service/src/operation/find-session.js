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

function findSession(session, responseHandle, errorHandle) {
    axios.post(config.mongoService + "/find-one", {
        "collection": config.collection,
        "database": config.database,
        "data": session
    }).then((response) => {
        console.log(response)
        if (response.data.session) {
            responseHandle(response.data.session)
        } else {
            errorHandle("session doesn't exist", 401)
        }
    }).catch((err) => {
        console.error("could not get session by id")
        errorHandle(err)
    })
}

module.exports = function(session, callback) {
    findSession(session, (encryptedSession) => {
        decrypt(encryptedSession, (session) => {
            callback(session, 200)
        }, (error, status) => {
            console.error(error)
            callback(error, status)
        })
    }, (error) => {
        console.error(error)
        callback(error, 500)
    }) 
}

