function searchById() {
	console.log("Searching by ID");

	var cell = $('#cell').val();
	console.log("Cell:" + cell);

	$.get("/getCell", {cellID:cell}, function(data) {
		console.log("Got: " + data);
		$("#result").html(data);
	})
}


