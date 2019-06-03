const config = require("../config.json")
const HttpStatus = require("http-status-codes")
const axios = require("axios")
const accountService = config.service.accountService
const aesEncryptionService = config.service.aesEncryptionService

module.exports = function(token, callback) {
    axios.post(aesEncryptionService.url + aesEncryptionService.decrypt, {
       "data": token 
    }).then((response) => {
        callback(response.data, HttpStatus.OK)
    }).catch((error) => {
        console.error(error)
        callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}
