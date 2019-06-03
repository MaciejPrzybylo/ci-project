const config = require("../config.json")
const HttpStatus = require("http-status-codes")
const axios = require("axios")
const aesEncryptionService = config.service.aesEncryptionService
const accountService = config.service.accountService

function decryptToken(token, responseHandle, errorHandle) {
    axios.post(aesEncryptionService.url + aesEncryptionService.decrypt, {
        "data": token
    }).then((response) => {
        responseHandle(response.data)
    }).catch((error) => {
        console.error(error)
        errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}
function findAccountByEmail(email, responseHandle, errorHandle) {
    axios.post(accountService.url + accountService.findByEmail, {
        "email": email
    }).then((response) => {
        responseHandle(response.data)
    }).catch((error) => {
        console.error(error)
        errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

function updateAccount(account, responseHandle, errorHandle) {
    axios.post(accountService.url + accountService.update, account).then((response) => {
        responseHandle(response)
    }).catch((error) => {
        console.error(error)
        errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

module.exports = function(token, callback) {
    decryptToken(token, (data) => {
        let account = data.account
        let timestamp = data.timestamp
        findAccountByEmail(account.email, (account) => {
            account.activated = true
            updateAccount(account, (response) => {
                callback(account, HttpStatus.OK)
            }, (error) => {
                callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR) 
            })
        }, (error) => {
            console.error(error.response.data)
            callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }, (error, statusCode) => {
        callback(error, statusCode)
    })
}

