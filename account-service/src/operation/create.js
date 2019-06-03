const axios = require("axios")
const config = require("../config.json")
const findAccountByEmailOperation = require("./find-by-email.js")
const HttpStatus = require("http-status-codes") 
const secretService = config.service.secretService
const mongoService = config.service.mongoService


function checkForAccount(email, responseHandle, errorHandle) {
    findAccountByEmailOperation(email, (account, statusCode) => {
        if (account == config.error.accountNotFound) {
            responseHandle()
        } else if (account) {
            errorHandle(config.error.accountAlreadyExists, HttpStatus.BAD_REQUEST)
        } else {
            errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    })
}

function createPasswordSecret(accountId, password, responseHandle, errorHandle) {
    console.log("creating secret with account id:" + accountId)
    console.log("and password: " + password)
    axios.post(secretService.url + secretService.create, {
        "accountId": accountId,
        "value": password
    }).then((response) => {
        responseHandle(response, 200)
    }).catch((error) => {
        errorHandle(error, 500)
    })
}

function createAccount(account, responseHandle, errorHandle) {
	axios.post(mongoService.url + mongoService.insertOne, {
		"collection": config.collection,
		"database": config.database,
        "data": {
            "forename": account.forename,
            "surname": account.surname,
            "email": account.email
        }
	}).then((response) => {
        findAccountByEmailOperation(account.email, (account, statusCode) => {
            if (statusCode == HttpStatus.OK) {
                responseHandle(account)
            } else {
                errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        })
	}).catch((err) => {
		console.error(err)
		errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
	})
}

module.exports = function(account, callback) {
    const password = account.password
    checkForAccount(account.email, (result, statusCode) => {
        createAccount(account, (account) => {
            createPasswordSecret(account._id, password, (result, statusCode) => {
                callback(config.message.accountCreated, HttpStatus.OK)
            }, (error) => {
                console.error(error)
                callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
            })
        }, (error, statusCode) => {
            callback(error, statusCode)
        })
    },(error, statusCode) => {
        callback(error, statusCode)
    })
}

