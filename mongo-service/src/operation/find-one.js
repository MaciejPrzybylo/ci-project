const withCollection = require("../mongo.js").withCollection

module.exports = function(databaseName, collectionName, data, callback) {
	withCollection(databaseName, collectionName, (collection) => {
		console.log("attempting to findOne: " + JSON.stringify(data))
		collection.findOne(data, (err, result) => {
			if (err) {
				console.error(err)
			}
			callback(err, result)
		})
	})
}

