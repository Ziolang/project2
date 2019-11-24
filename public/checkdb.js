function searchById() {
	console.log("Searching by ID");

	var cell = Number($('#cell').val());
	console.log("Cell:" + cell);

	$.get("/getCell", {cellID:cell}, function(data) {
		var item = data['name'];
		console.log("Got: " + item);
		$("#result").html(item);
	})
}


