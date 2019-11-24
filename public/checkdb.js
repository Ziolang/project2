function searchById() {
	console.log("Searching by ID");

	var cell = Number($('#cell').val());
	console.log("Cell:" + cell);

	$.get("/getCell", {cellID:cell}, function(cell) {
		console.log("Got: " + cell);
		$("#result").html(cell);
	})
}


