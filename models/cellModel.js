const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://lsetltiaqifutt:a9820380e07bcefd62806e966634d27a4d57723db2509436a8f7bcab71279927@ec2-174-129-253-174.compute-1.amazonaws.com:5432/denvgq60nkajt6?ssl=true";
const pool = new Pool({connectionString: connectionString });

function getCellById(id, callback) {
	var sql = "SELECT * FROM Cells WHERE id = " + id;
	pool.query(sql, function(err, result) {
		if (err) console.log(err);
		console.log(result.row[0]);
		callback(null, result.row[0]);
	});
}

module.exports = {
	getCellById: getCellById
}