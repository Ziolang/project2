function searchById() {
	let content;
	let color;
	var id = Number($('#selector').val());

	if (id == 0) {
		content = "{ }";
	  	color = "black";
	  	$(".preview").css("color", color);
		$(".preview").html(content);
		$(".details").html("<h2>Blank Cell</h2><p>This cell is completely empty and has no properties.</p>");
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

			var details = "<h2>" + cell["name"] + "Cell</h2><p>";
			if (cell["durability"] > 0) {
				details += "Durability: " + cell["durability"] + "%<br>" +
				"Physical Resistance: " +  cell["pr"] + "<br>" +
				"Magical Resistance: " + cell["mr"] + "<br>";
			}
			if (cell["blocks"]){
				details += "Blocks Movement: Cannot enter or pass through this cell.<br>";
			}
			details += "Details: " + cell["detail"] + "</p>";
			$(".details").html(details);
		})
	}
	
}


