function checkDB(select) {

	const sql = "SELECT * FROM Cells WHERE id = " + select.value;
	
	pool.query(sql, function(err, result) {
		if (err) console.log(err);
		const item = result.rows[0];
		$('.preview').html('{' + item.content + '}');
		$('.preview').css("color", "#" + item.color);
		var brush = "#brush" + $("select").val();
	});
}


