function updateReportings(){
	data.reportings = [{
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
			list: true,
			runFunc: "perItemDetails"
		}
	];	
}

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
	var report = '<ul>';
	for (var i = 0; i < data.reportings.length; i++) {
		if (!data.reportings[i].list){
			report += "<li>"+data.reportings[i].title+": "+data.reportings[i].value+"</li>"	
		} else {
			//report += "<div class='reportSublist'>";
			for (var i = 0; i < data.inventory.length; i++) {
				report += "<li><b>"+data.inventory[i].name+"</b></li><ul>";
				var sold = data.inventory[i].initialQuantity-data.inventory[i].quantity;
				var total = data.inventory[i].initialQuantity;
				report += "<li>Total Sold: "+sold+"/"+total+" ("+Math.round(sold/total*100)+"% of total "+data.inventory[i].name+")</li>";
				if (data.sales == 0) {
					var zeroGuard = 0;
				} else {
					var zeroGuard = Math.round(data.inventory[i].profit/data.sales*100);
				}
				report += "<li>Money from "+data.inventory[i].name+": "+dollars(data.inventory[i].profit)+" ("+zeroGuard+"% of Net Sales)</li>";

				report += "</ul>"
			};
			//report += "</div>"
		}
		
	};
	report += "</ul>";
	$("#mode #report .reportList").html(report);
}