const withCollection = require("../mongo.js").withCollection
const ObjectId = require("mongodb").ObjectId

module.exports = function(databaseName, collectionName, data, callback) {
	withCollection(databaseName, collectionName, (collection) => {
        data._id = ObjectId(data._id)
		collection.updateOne({"_id": ObjectId(data._id)}, {$set: data}, (err, result) => {
            console.log(err)
            callback(err, result)
		})
	})
}

