const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://lsetltiaqifutt:a9820380e07bcefd62806e966634d27a4d57723db2509436a8f7bcab71279927@ec2-174-129-253-174.compute-1.amazonaws.com:5432/denvgq60nkajt6?ssl=true";
const pool = new Pool({connectionString: connectionString });

function getCellById(id, callback) {
	console.log("Searching for id: " + id)
	var sql = "SELECT * FROM Cells WHERE id = " + id;
	pool.query(sql, function(err, res) {
		if (err) {console.log(err);}
		else {
			console.log(res);
			var results = res.rows[0];
			console.log(results);
			callback(null, results);
		}
	});
}

function getAllCells(callback) {
	var sql = "SELECT * FROM Cells";
	pool.query(sql, function(err, res) {
		if (err) {console.log(err);}
		else {
			console.log(res);
			var results = res.rows;
			console.log(results);
			callback(null, results);
		}
	});
}

function postCellToDB(cell, callback) {
	var sql = "INSERT INTO Cells VALUES (DEFAULT, " + 
	cell["name"] + ", " +
	cell["content"] + ", " +
	cell["color"] + ", " +
	cell["blocks"] + ", " +
	cell["durability"] + ", " +
	cell["pr"] + ", " +
	cell["mr"] + ", " +
	cell["detail"] + ")";
	pool.query(sql, function(err, res) {
		if (err) {console.log(err);}
		else {
			var result = {
				succeeds: "true",
				name: cell["name"]
			}
		}
	});
}

module.exports = {
	getCellById: getCellById,
	getAllCells: getAllCells,
	postCellToDB: postCellToDB
}