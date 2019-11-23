function searchById() {
	console.log("Searching by ID");

	var cell = $('#cell').val();
	console.log("Cell:" + cell);

	$.get("/getCell", function(data) {
		console.log("Got: " + data);
	})
}


