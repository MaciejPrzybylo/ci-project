const config = require("../config.json")
const HttpStatus = require("http-status-codes")
const axios = require("axios")
const sessionTokenService = config.service.sessionTokenService

module.exports = function(token, callback) {
    console.log("authenticating with token: " + token)
    if (token) {
        axios.post(sessionTokenService.url + sessionTokenService.find, {
            "session": token
        }).then((response) => {
            callback(response.data, HttpStatus.OK)
        }).catch((error) => {
            if (error.response.status == HttpStatus.BAD_REQUEST) {
                callback(config.error.invalidSessionToken, HttpStatus.UNAUTHORIZED)
            } else {
                callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        })
    } else {
        callback(config.error.invalidSessionToken, HttpStatus.UNAUTHORIZED)
    }
}

