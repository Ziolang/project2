function getCellById(id, callback) {
	/*const sql = const sql = "SELECT * FROM Cells WHERE id = " + id;
	pool.query(sql, function(err, result) {
		if (err) console.log(err);
		callback(null, result.row[0]);
	});*/

	var result = {id: id, name: "tree"};

	callback(null, result);
}

module.exports = {
	getCellById: getCellById
}