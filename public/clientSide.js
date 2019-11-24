function searchById() {
	let content;
	let color;
	var id = Number($('#brushes').val());

	if (id == -1) {
		content = "   ";
		color = "black";
		$(".preview").css("color", color);
		$(".preview").html(content);
		$(".details").html("<h2>NULL Cell</h2><p>This cell does not exist. NULL cells are used to provide shape, boundaries and non-interactable areas.</p>");
	}
	else if (id == 0) {
		content = "{ }";
		color = "black";
		$(".preview").css("color", color);
		$(".preview").html(content);
		$(".details").html("<h2>Blank Cell</h2><p>This cell is a generic, empty, occupiable cell with no properties.</p>");
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

			var details = "<h2>" + cell["name"] + " Cell</h2><p>";
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

function initGrid() {
	var rows = $("#rows").val();
	var columns = $("#columns").val();
	var letter = 'A';
	var letterx = 65;
	var position = '';
	var grid = "";
						

	for (var r = 0; r < rows; r++) {
		for (var c = 0; c < columns; c++) {
			letter = String.fromCharCode(letterx);
			position = letter + (c + 1);
			grid += '<span class="cell" id="' + position + '" onclick="applyCell(this)">{ }</span> ';
		}
		grid += " " + letter + "<br/>";
		letterx++;
	}
	for (var c = 1; c <= columns; c++) {
		if (c < 10)
			grid += "-" + c + "--";
		else
			grid += c + "--";
	}
	grid += "-<br>";

	$('.grid').html(grid);
}

function applyCell(cell) {
	var color = $(".preview").css("color");
	var text = $(".preview").html();
	
	$(cell).css("color", color);
	$(cell).html(text);
}

function loadCells() {
	var html = '<option value="-1">NULL</option><option value="0">Blank</option>';
	$.get("/getCells", function(cells) {
		cells.forEach((cell) => {
			html += '<option value="' + cell["id"] + '">' + cell["name"] + '</option>';
			$('#brushes').html(html);
			$(".preview").css("color", "white");
			$(".preview").html("   ");
			$(".details").html("<h2>NULL Cell</h2><p>This cell does not exist. NULL cells are used to provide shape, boundaries and non-interactable areas.</p>");
		});
	});
}