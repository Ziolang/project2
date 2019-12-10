function reload() {
	let gridType = $('#gridType').val();
	let content;
	let color;
	let img;
	var id = Number($('#brushes').val());

	if (id == -1) {
		if (gridType == "txt") {
			$(".preview").css("color", "black");
			$(".preview").html("&nbsp&nbsp&nbsp");
		}
		else {
			$(".preview").html('<img src="blank.png" style="background-color:white">');
		}
		}
	else if (id == 0) {
		if (gridType == "txt") {
			$(".preview").css("color", "black");
			$(".preview").html("{ }");
		}
		else {
			$(".preview").html('<img src="fourway.png" style="background-color:white">');
		}
		$(".details").html("<h2>Blank Cell</h2><p>This cell is a generic, empty, occupiable cell with no properties.</p>");
	}
	else {
		console.log("Searching by ID");

		console.log("Cell:" + id);

		$.get("/getCell", {cellID:id}, function(cell) {
			console.log("Got: " + cell["name"]);

			if (gridType == "txt") {
				if (cell["content"] == '.') {
					content = "{ }";
				}
				else
					content = "{" + cell["content"] + "}";
				color = cell["color"];
				$(".preview").css("color", color);
				$(".preview").html(content);
			}
			else {
				if (cell["content"] == '.')
					content = "&nbsp";
				else
					content = cell["content"];
				color = cell["color"];
				img = cell["img"];
				$(".preview").html('<img src="' + img +'" style="background-color:' + color + ';">');
			}

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

function initImgGrid() {
	$('#gridType').val("img");
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
			grid += '<img src="fourway.png" class="imgCell" id="' + position + '" onclick="applyImgCell(this)">';
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

	loadCells();
}

function initGrid() {
	$('#gridType').val("txt");
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

	loadCells();
}

function applyCell(cell) {
	var color = $(".preview").css("color");
	var text = $(".preview").html();
	var id = $('#brushes').val();
	
	$(cell).css("color", color);
	$(cell).html(text);
	$(cell).removeClass();
	$(cell).addClass(id);
	$(cell).addClass("cell");
}

function loadCells() {
	var html = '<option value="-1">NULL</option><option value="0" selected>Blank</option>';
	$.get("/getCells", function(cells) {
		cells.forEach((cell) => {
			html += '<option value="' + cell["id"] + '">' + cell["name"] + '</option>';
			$('#brushes').html(html);
			$(".details").html("<h2>Blank Cell</h2><p>This cell is a generic, empty, occupiable cell with no properties.</p>");
		});
	});

	reload();
}

function addCell() {
	var name = $('#name').val();
	var content = $('#content').val();
	var color = $('#color').val();
	var blocks = $('#blocks').val();
	var durability = $('#durability').val();
	var pr = $('#pr').val();
	var mr = $('#mr').val();
	var img = $('#img').val();
	var detail = $('#detail').val();

	if (name == "") {
		alert("Name must be filled in.");
		return;
	}

	if (content == "") {
		alert("Content must be filled in.");
		return;
	}

	var values = {
		name: name,
		content: content,
		color: color,
		blocks: blocks,
		durability: durability,
		pr: pr,
		mr: mr,
		img: img,
		detail: detail
	}

	console.log(values["name"]);

	$.post("/postCell", {cell: values}, function(result) {
		console.log("made it! With: " + result["succeeds"]);
	})
}

function validate() {
	var val = $("#durability").val();
	if (val > 100) {
		$("#durability").val("100");
	}
	if (val < 0 || isNaN(val)) {
		$("#durability").val("0");
	}
}

function imgPreview() {
	let val = $("#img").val();
	let color = $("#color").val();
	let content = $("#content").val();

	$("#showimg").html('<img src="' + val + '" style="background-color:' + color + '">');
	$("#showtxt").css("color", color);
	$("#showtxt").html("{" + content + "}");
}