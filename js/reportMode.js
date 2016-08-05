function displayReport(){
	$("#mode #report").show();
	updateReport();
}

function updateReport(){
	var report = "You made "+dollars(data.sales)+" dollars! hurray woo";
	$("#mode #report").html(report);
}