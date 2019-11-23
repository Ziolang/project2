function checkDB(select) {

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'));


const connectionString = process.env.DATABASE_URL || "postgres://lsetltiaqifutt:a9820380e07bcefd62806e966634d27a4d57723db2509436a8f7bcab71279927@ec2-174-129-253-174.compute-1.amazonaws.com:5432/denvgq60nkajt6?ssl=true";
const pool = new Pool(
	{
		connectionString: connectionString
	});

	const sql = "SELECT * FROM Cells WHERE id = " + select.value;
	
	pool.query(sql, function(err, result) {
		if (err) console.log(err);
		const item = result.rows[0];
		$('.preview').html('{' + item.content + '}');
		$('.preview').css("color", "#" + item.color);
		var brush = "#brush" + $("select").val();
	});
}


