function selectBrush(select) {
	var count = document.getElementById('count');
	var reset = ".";
	for (var i = 1; i <= count; i++) {
		reset += i;
		$(reset).css("visibility", "hidden");
		reset = ".";
	}

	var brush = "." + select.value;
	$(brush).css("visibility", "visible");
}