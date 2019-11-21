function selectBrush(select) {
	var count = document.getElementById('count');
	var reset = ".";
	for (var i = 1; i <= count; i++) {
		reset += i;
		document.getElementById(reset).style.visibility = "hidden";
		reset = ".";
	}

	var brush = "." + select.value;
	document.getElementById(brush).style.visibility = "hidden";
}