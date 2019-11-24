function searchById() {
	console.log("Searching by ID");

	var cell = Number($('#cell').val());
	console.log("Cell:" + cell);

	$.get("/getCell", {cellID:cell}, function(data) {
		console.log("Got: " + data);
		var item = data.list[0];
		$("#result").html(item);
	})
}


