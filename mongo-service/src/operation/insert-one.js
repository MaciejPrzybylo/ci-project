const withCollection = require("../mongo.js").withCollection

module.exports = function(databaseName, collectionName, data, callback) {
	withCollection(databaseName, collectionName, (collection) => {
		collection.insertOne(data, (err, result) => {
            callback(err, result)
		})
	})
}

