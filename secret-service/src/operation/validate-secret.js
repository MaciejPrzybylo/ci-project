const axios = require("axios")
const config = require("../config.json")
const crypto = require("crypto")

const findSecretByAccountIdOperation = require("./find-secret-by-account-id")
const findSaltByAccountIdOperation = require("./find-salt-by-account-id")

function getSecretHashValue(accountId, responseHandle, errorHandle) {
	console.log(accountId)
	findSecretByAccountIdOperation(accountId, (secret, statusCode) => {
	 	if (statusCode != 200) {
		 	errorHandle("failed to get secret", 500)
	 	} else {
			responseHandle(secret.value, 200)
	 	}
	})
}

function getSaltValue(accountId, responseHandle, errorHandle) {
	findSaltByAccountIdOperation(accountId, (salt, statusCode) => {
	 	if (statusCode != 200) {
			errorHandle("could not get salt", statusCode)
	 	} else {
			responseHandle(salt.value, statusCode)
	 	}
	})
}

module.exports = function(secret, callback) {
	getSecretHashValue(secret.accountId, (hash, statusCode) => {
		getSaltValue(secret.accountId, (salt, statusCode) => {
			let challengeHash = crypto.createHash('sha256').update(secret.value + salt).digest('hex')
            console.log("HASH: " + hash + " : CHALLENGE: " + challengeHash)
			if (hash == challengeHash) {
				callback("OK", 200)
			} else {
				callback("NO MATCH", 403)
			}
		}, (error) => {
			callback(error, statusCode)
		})
	}, (error, statusCode) => {
		callback(error, statusCode)
	})
}

