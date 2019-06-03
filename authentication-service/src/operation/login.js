const config = require("../config.json")
const HttpStatus = require("http-status-codes")
const axios = require("axios")
const accountService = config.service.accountService
const secretService = config.service.secretService
const sessionTokenService = config.service.sessionTokenService

function findAccountByEmail(email, responseHandle, errorHandle) {
    axios.post(accountService.url + accountService.findByEmail, {
        "email": email
    }).then((response) => {
            responseHandle(response.data, response.status)
    }).catch((error) => {
            console.error(error)
            errorHandle(error.response.data, error.response.status)
    })
}

function checkPassword(accountId, password, responseHandle, errorHandle) {
    axios.post(secretService.url + secretService.validate, {
        "accountId": accountId,
        "value": password 
    }).then((response) => {
        responseHandle("Account authenticated", response.status)
    }).catch((error) => {
        console.error(error.response.data)
        errorHandle(config.error.authenticationFailure, error.response.status)
    })
}

function createSessionToken(account, responseHandle, errorHandle) {
    axios.post(sessionTokenService.url + sessionTokenService.create, account).then((response) => {
        responseHandle(response.data)
    }).catch((error) => {
        console.error(error)
        errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

module.exports = function(credentials, callback) {
    const email = credentials.email
    const password = credentials.password
    findAccountByEmail(email, (account, statusCode) => {
        if (account.activated) {
            checkPassword(account._id, password, (response, statusCode)  => {
                createSessionToken(account, (token) => {
                    callback(token, HttpStatus.OK)
                }, (error, statusCode) => {
                    callback(error, statusCode)
                })
            }, (error, statusCode) => {
                callback(error, statusCode)
            })
        } else {
            callback(config.error.accountNotActivated, HttpStatus.BAD_REQUEST)
        }
    }, (error, statusCode) => {
        callback(error, statusCode)
    })
}

