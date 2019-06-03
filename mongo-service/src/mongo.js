const MongoClient = require("mongodb").MongoClient
const assert = require("assert")
const url = "mongodb://mongo:27017"

const client = new MongoClient(url)
exports.withCollection = function(databaseName, collectionName, callback) { 
	client.connect((err) => {
		assert.equal(null, err)
		console.log("successfully connected to mongodb: " + url)
		let database = client.db(databaseName)	
		let collection = database.collection(collectionName)
		callback(collection)
	})
}

