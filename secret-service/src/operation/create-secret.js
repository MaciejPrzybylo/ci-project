const axios = require("axios")
const config = require("../config.json")
const crypto = require("crypto")
const HttpStatus = require("http-status-codes")
const createSaltOperation = require("./create-salt.js")
const findSecretByAccountIdOperation = require("./find-salt-by-account-id.js")

function checkForExistingSecret(accountId, responseHandle, errorHandle) {
    findSecretByAccountIdOperation(accountId, (secret, statusCode) => {
        if (statusCode != HttpStatus.OK) {
            errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
        } else if (secret) {
            errorHandle(config.error.secretAlreadyExists, HttpStatus.BAD_REQUEST)
        } else {
            responseHandle(secret, statusCode)
        }
    }) 
}

module.exports = function(secret, callback) {
    checkForExistingSecret(secret.accountId, () => {
        createSaltOperation(secret.accountId, (salt, statusCode) => {
		    if (statusCode != 200) {
			    callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
		    } else {
                axios.post(config.mongoService + "/insert-one", {
		            "collection": config.collection,
		            "database": config.database,
                    "data": {
                        "accountId": secret.accountId,
                        "value": crypto.createHash('sha256').update(secret.value + salt.value).digest('hex')
                    }
                }).then((response) => {
				    callback(config.message.secretCreated, HttpStatus.OK)
			    }).catch((err) => {
				    console.error(err)
				    callback(err, HttpStatus.INTERNAL_SERVER_ERROR)
			    })
		    }
	    })
    }, (error, statusCode) => {
        callback(error, statusCode)
    })
}

