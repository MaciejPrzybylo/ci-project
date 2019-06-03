const withCollection = require("../mongo.js").withCollection
const ObjectId = require("mongodb").ObjectId

module.exports = function(databaseName, collectionName, data, callback) {
	withCollection(databaseName, collectionName, (collection) => {
		console.log("attempting to findOne: " + JSON.stringify(data))
		collection.findOne({"_id": ObjectId(data._id)}, (err, result) => {
			if (err) {
				console.error(err)
			}
			callback(err, result)
		})
	})
}

