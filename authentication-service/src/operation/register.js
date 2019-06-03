const config = require("../config.json")
const HttpStatus = require("http-status-codes")
const axios = require("axios")
const accountService = config.service.accountService
const emailService = config.service.emailService 
function registerAccount(account, responseHandle, errorHandle) {
    account.activated = false
    axios.post(accountService.url + accountService.create, account).then((accountCreated) => {
        axios.post(accountService.url + accountService.findByEmail, account).then((response) => {
            responseHandle(response.data)
        }).catch((error) => {
            console.error(error)
            errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }).catch((error) => {
            console.error(error)
            errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

function sendActivationEmail(account, responseHandle, errorHandle) {
    axios.post(emailService.url + emailService.sendActivationEmail, {
        "account": {
            "_id": account._id,
            "email": account.email
        },
        "activationLink": process.env.ACTIVATION_LINK
    }).then((response) => {
        responseHandle(response.data)
    }).catch((error) => {
        console.error(error)
        errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

module.exports = function(account, callback) {
    console.log("Registering account")
    console.log(account)
    registerAccount(account, (createdAccount) => {
        sendActivationEmail(createdAccount, (response) => {
            callback(config.message.registrationComplete, HttpStatus.OK)
        }, (error, statusCode) => {
            callback(error, statusCode)
        })
    }, (error) => {
        callback(error.response.data, error.response.status)
    })
}

