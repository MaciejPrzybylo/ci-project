const withCollection = require("../mongo.js").withCollection

module.exports = function(databaseName, collectionName, data, callback) {
	withCollection(databaseName, collectionName, (collection) => {
		console.log("attempting to deleteOne: " + JSON.stringify(data))
		collection.deleteOne(data, (err, result) => {
			if (err) {
				console.error(err)
			}
			callback(err, result)
		})
	})
}

