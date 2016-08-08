var reportings;
function updateReportings(){
	reportings = [
		{
			list: false,
			title: "Net Sales",
			value: dollars(data.sales)+' / '+dollars(totalInvVal())+ " ("+Math.round(data.sales/totalInvVal()*100)+"%)"
		},
		{
			list: false,
			title: "Items Sold",
			value: data.itemsSold+' / '+totalItemCount()+" ("+Math.round(data.itemsSold/totalItemCount()*100)+"%)"
		},
		{
			list: false,
			title: "Total Sales",
			value: data.numOfSales
		},
		{
			list: false,
			title: "Average Sale Amount",
			value: avgSaleAmount()
		},
		{
			list: false,
			title: "Smallest Sale",
			value: dollars(data.smallestSale)
		},
		{
			list: false,
			title: "Largest Sale",
			value: dollars(data.largestSale)
		},
		{
			list: true
		}
	];	
}
updateReportings();

function avgSaleAmount(){
	if (data.numOfSales == 0){
		return 0
	} 
	return dollars(data.sales / data.numOfSales);
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
		total += data.inventory[i].initialQuantity*data.inventory[i].price;
	};
	return total;
}

function displayReport(){
	$("#mode #report").show();
	updateReport();
}

function updateReport(){
	if (data.inventory.length == 0){
		console.log('inv length == 0, not updating reports');
		return;
	}
	updateReportings();
	var report = '<ul>';
	for (var i = 0; i < reportings.length; i++) {
		if (reportings[i].list === false){
			report += "<li>"+reportings[i].title+": "+reportings[i].value+"</li>"	
		} else {
			//report += "<div class='reportSublist'>";
			for (var k = 0; k < data.inventory.length; k++) {
				report += "<li><b>"+data.inventory[k].name+"</b></li><ul>";
				var sold = data.inventory[k].initialQuantity-data.inventory[k].quantity;
				var total = data.inventory[k].initialQuantity;
				report += "<li>Total Sold: "+sold+"/"+total+" ("+Math.round(sold/total*100)+"% of total "+data.inventory[k].name+")</li>";
				if (data.sales == 0) {
					var zeroGuard = 0;
				} else {
					var zeroGuard = Math.round(data.inventory[k].profit/data.sales*100);
				}
				report += "<li>Money from "+data.inventory[k].name+": "+dollars(data.inventory[k].profit)+" ("+zeroGuard+"% of Net Sales)</li>";

				report += "</ul>"
			};
			//report += "</div>"
		}
		
	};
	report += "</ul>";
	$("#mode #report .reportList").html(report);
}