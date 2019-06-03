const withCollection = require("../mongo.js").withCollection

module.exports = function(databaseName, collectionName, data, callback) {
	withCollection(databaseName, collectionName, (collection) => {
		collection.find({}).toArray((err, result) => {
			if (err) {
				console.error(err)
			}
			callback(err, result)
		})
	})
}

