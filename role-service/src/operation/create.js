const axios = require("axios")
const config = require("../config.json")


function checkRoleExists(roleName, organisation, responseHandle, errorHandle) {
    axios.post(config.mongoService + "/find-one", {
        "database": organisation,
        "collection": config.collection,
        "data": {
            "name": roleName
        }
    }).then((response) => {
        if (response.data) {
            errorHandle("a role with the name " + roleName + " already exists", 400)
        } else {
            responseHandle()
        }
    }).catch((err) => {
        errorHandle("failed to check for existing account", 500)
    })
} 

module.exports = function(organisation, role, callback) {
    let name = role.name
    let services = role.services
    checkRoleExists(name, organisation, () => {
	    axios.post(config.mongoService + "/insert-one", {
		    "database": organisation,
		    "collection": config.collection,
            "data": {
                "name": name,
                "services": services
            }
	    }).then((response) => {
            axios.post(config.mongoService  + "/find-one", {
                "database": organisation,
                "collection": config.collection,
                "data": {
                    "name": name
                }
            }).then((response) => {
		        callback(response.data, 200)
            }).catch((err) => {
                callback(err, 500)
            })
	    }).catch((err) => {
		    console.log(err)
		    callback(err, 500)
	    })
    }, (err, status) => {
        callback(err, status)
    })
}

