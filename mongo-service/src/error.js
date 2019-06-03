module.exports.message = function(operation, collection, database, data) {
	return "failed to complete operation: " + operation + "\n"
		+ "\twith the collection: " + collection + "\n"
		+ "\twith the database: " + database + "\n"
		+ "\twith the data: " + JSON.stringify(data)
}

