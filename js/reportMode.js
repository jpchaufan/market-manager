function updateReportings(){
	data.reportings = [{
		title: "Net Sales",
		value: dollars(data.sales)+' / '+dollars(totalInvVal())+ " ("+data.sales/totalInvVal().toFixed(2)+"%)"
		},
		{
			type: "item",
			title: "Items Sold",
			value: data.itemsSold+' / '+totalItemCount()+" ("+data.itemsSold/totalItemCount()+"%)"
		}
	];	
}

function totalItemCount(){
	var totalItems = 0;
	for (var i = 0; i < data.inventory.length; i++) {
		totalItems += data.inventory[i].initialQuantity;
	};
	return totalItems;
}

function totalInvVal(){
	total = 0;
	for (var i = 0; i < data.inventory.length; i++) {
		total += data.inventory[i].quantity*data.inventory[i].price;
	};
	return total;
}

function displayReport(){
	$("#mode #report").show();
	updateReport();
}

function updateReport(){
	updateReportings();
	var report = ''
	for (var i = 0; i < data.reportings.length; i++) {
		report += "<li>"+data.reportings[i].title+": "+data.reportings[i].value+"</li>"
	};

	$("#mode #report ul").html(report);
}