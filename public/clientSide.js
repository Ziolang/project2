

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
		$(".details").html("<h2>Blank Cell</h2><p>This cell is a generic, empty, occupiable cell with no properties.</p>");
	}
	else if (id == 0) {
		if (gridType == "txt") {
			$(".preview").css("color", "black");
			$(".preview").html("{ }");
		}
		else {
			$(".preview").html('<img src="fourway.png" style="background-color:white">');
		}
		$(".details").html("<h2>NULL Cell</h2><p>This cell does not exist. It can't be entered, interacted with or passed through. NULL Cells are best used for giving a grid a less square shape.</p>");
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
			grid += '<span id="' + position + '" name="0" class="imgCell" onclick="applyImgCell(this)"><img style="background-color:white;" src="fourway.png"></span>';
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
	$('#save').html('Name your grid: <input id="gridname" type="text"><button onclick="saveGrid()">Save Grid</button>');

	loadCells();
	saveGrid();
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
			grid += '<span name="0" class="cell" id="' + position + '" onclick="applyCell(this)">{ }</span> ';
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
	$('#save').html('Name your grid: <input id="gridname" type="text"><button onclick="saveGrid()">Save Grid</button>');

	loadCells();
	saveGrid();
}

function applyCell(cell) {
	var color = $(".preview").css("color");
	var text = $(".preview").html();
	var id = $('#brushes').val();
	
	$(cell).css("color", color);
	$(cell).html(text);
	$(cell).removeClass();
	$(cell).attr("name", id);
	$(cell).addClass("cell");
	saveGrid();
}

function applyImgCell(cell) {
	var text = $(".preview").html();
	var id = $('#brushes').val();
	
	$(cell).html(text);
	$(cell).removeClass();
	$(cell).attr("name", id);
	$(cell).addClass("imgCell");
	saveGrid();
}

function loadCells() {
	let gridType = $('#gridType').val();
	var html = '<option value="-1">NULL</option><option value="0" selected>Blank</option>';
	$.get("/getCells", function(cells) {
		cells.forEach((cell) => {
			html += '<option value="' + cell["id"] + '">' + cell["name"] + '</option>';
			$('#brushes').html(html);
			$(".details").html("<h2>Blank Cell</h2><p>This cell is a generic, empty, occupiable cell with no properties.</p>");
			if (gridType == "txt") {
				$(".preview").css("color", "black");
				$(".preview").html("{ }");
			}
			else {
				$(".preview").html('<img src="fourway.png" style="background-color:white">');
			}
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

	console.log(values["detail"]);

	$.post("/postCell", {cell: values}, function(result) {
		console.log("made it! With: " + result["succeeds"]);
	})

	alert("Successfully added " + name + " Cell to the database!");

	loadCells();
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

function preview() {
	let val = $("#img").val();
	let color = $("#color").val();
	let content = $("#content").val();

	if (content == ".")
		content = "&nbsp";

	$("#showimg").html('<img src="' + val + '" style="background-color:' + color + '">');
	$("#showtxt").css("color", color);
	$("#showtxt").html("{" + content + "}");
}

function deleteCell() {
	var id = Number($('#brushes').val());
	
	if (id <= 0) {
		alert("You cannot delete NULL or Blank cells.");
		return;
	}

	if (confirm("You are about to permanently delete this cell. Are you sure?") == false)
		return;

	$.post("/killCell", {id:id}, function(result) {
		console.log("made it! With: " + result["succeeds"]);
	});

	loadCells();
}

function saveGrid() {
	var gridname = $('#gridname').val();
	var id;
	var rows = $("#rows").val();
	var columns = $("#columns").val();
	var letter = 'A';
	var letterx = 65;
	var position = '';
	var grid = { 
			"name" : gridname,
			"rows" : rows,
			"columns" : columns,
			"positions" : {

			}
	};

	for (var r = 0; r < rows; r++) {
		for (var c = 0; c < columns; c++) {
			letter = String.fromCharCode(letterx);
			position = letter + (c + 1);
			id = $("#" + position).attr("name");
			grid["positions"][position] = id;
		}
		letterx++;
	}
	var gridstring = JSON.stringify(grid);

	$('#saved').val(gridstring);
	//$.post("/saveGrid", {grid:grid}, function(result) {});

	//console.log(grid);
}

function copy() {
	var grid = document.getElementById("saved");

	grid.select();
	grid.setSelectionRange(0, 99999);

	document.execCommand("copy");

	alert("Copied grid file to clipboard. Save it to any text file.");
}

function applyJson() {
	let gridType = $('#gridType').val();
	var data = $('#saved').val();
	var grid = JSON.parse(data);
	$('#rows option[value="' + grid["rows"] + '"]').prop("selected", true);
	$('#columns option[value="' + grid["columns"] + '"]').prop("selected", true);
	$('#gridname').val(grid["name"]);

	var id;
	var letter = 'A';
	var letterx = 65;
	var position = '';
	var content;
	var color;
	var img;
	var item;

	for (var r = 0; r < grid["rows"]; r++) {
		for (var c = 0; c < grid["columns"]; c++) {
			letter = String.fromCharCode(letterx);
			position = letter + (c + 1);
			item = '#' + position;
			id = grid["positions"][position];

			console.log(position + " and " + item + " and " + id);
			if (id == -1) {
				console.log(item);
				if (gridType == "txt") {
					$(item).css("color", "black");
					$(item).html("&nbsp&nbsp&nbsp");
				}
				else {
					$(item).html('<img src="blank.png" style="background-color:white">');
				}
			}
			else if (id == 0) {
				console.log(item);
				if (gridType == "txt") {
					$(item).css("color", "black");
					$(item).html("{ }");
				}
				else {
					$(item).html('<img src="fourway.png" style="background-color:white">');
				}
				
			}
			else {
				$.get("/getCell", {cellID:id}, function(cell) {
					console.log("found: " + cell["name"] + "Editting: " + item);
					if (gridType == "txt") {
						if (cell["content"] == '.') 
							content = "{ }";
						else 
							content = "{" + cell["content"] + "}";

						color = cell["color"];
						name = cell["id"];
						
						$(item).css("color", color);
						$(item).html(content);
						$(item).removeClass();
						$(item).attr("name", name);
						$(item).addClass("cell");
					}
					else {
						$(item).html('<img src="' + cell["img"] + '" style="background-color:' + cell["color"] + '">');
					}
				})
			}   
		}
		letterx++;
	}
}