function searchById() {
	var content;
	var color;
	var id = Number($('#selector').val());

	if (id == 0) {
		content = "{ }";
	  	color = "black";
	}
	else {
		console.log("Searching by ID");

		console.log("Cell:" + id);

		$.get("/getCell", {cellID:id}, function(cell) {
			console.log("Got: " + cell["name"]);
	  		content = "{" + cell["content"] + "}";
	  		color = "#" + cell["color"];
	console.log("color: " + color + " content: " + content);
	$(".preview").css("color", color);
	$(".preview").html(content);
		})
	}
}


