function searchById() {
	let content;
	let color;
	var id = Number($('#selector').val());

	if (id == 0) {
		content = "{ }";
	  	color = "black";
	  	$(".preview").css("color", color);
		$(".preview").html(content);
	}
	else {
		console.log("Searching by ID");

		console.log("Cell:" + id);

		$.get("/getCell", {cellID:id}, function(cell) {
			console.log("Got: " + cell["name"]);
	  		content = "{" + cell["content"] + "}";
	  		color = "#" + cell["color"];
	  		$(".preview").css("color", color);
			$(".preview").html(content);
		})
	}
	
}


