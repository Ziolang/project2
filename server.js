const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/getPerson/', getPerson)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


const connectionString = process.env.DATABASE_URL || "postgres://lsetltiaqifutt:a9820380e07bcefd62806e966634d27a4d57723db2509436a8f7bcab71279927@ec2-174-129-253-174.compute-1.amazonaws.com:5432/denvgq60nkajt6?ssl=true";
const pool = new Pool(
	{
	//connectionString: process.env.DATABASE_URL,
	//ssl:true
		connectionString: connectionString
	});

var sql = "SELECT * FROM Person";
pool.query(sql, function(err, result) {
	// If an error occurred...
	if (err) {
		console.log("Error in query: ")
		console.log(err);
	}

	// Log this to the console for debugging purposes.
	console.log("Back from DB with result:");
	console.log(result.rows);
});

function getPerson(req, res){ 
	res.send(req.params);
}