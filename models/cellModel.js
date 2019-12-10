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
	var sql = "INSERT INTO Cells (name, content, color, blocks, durability, pr, mr, img, detail) VALUES ('";
	sql += cell["name"] + "', '";
	sql += cell["content"] + "', '";
	sql += cell["color"] + "', '";
	sql += cell["blocks"] + "', '";
	sql += cell["durability"] + "', '";
	sql += cell["pr"] + "', '";
	sql += cell["mr"] + "', '";
	sql += cell["img"] + "', '";
	sql += cell["detail"] + "')";
	pool.query(sql, function(err, res) {
		if (err) {console.log(err);}
		else {
			var result = {
				succeeds: "true",
			}
			callback(null, result);
		}
	});
}

module.exports = {
	getCellById: getCellById,
	getAllCells: getAllCells,
	postCellToDB: postCellToDB
}