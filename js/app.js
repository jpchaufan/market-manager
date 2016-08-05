data = {
	inventory: [],
	currentPurchase: [],
	sales: 0
}



var marketModeHTML = '';

function setMode(mode){
	hideAll();
	if (mode == 'inventory'){
		displayInventory();
	} else if (mode == 'market') {
		displayMarket();
	} else if (mode == 'report'){
		displayReport();
	}
}

function hideAll() {
	$("#mode #inventory").hide();
	$("#mode #market").hide();
	$("#mode #report").hide();
}

function updateViews(){
	updateInventoryList();
	updateMarket();
	updatePurchasePanel();
}


function dollars(n){
	return '$'+(n/100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function validNum(input){
	if (typeof input == 'number' && input > 0){
		return true;
	} else {
		return false;
	}
}

//setMode('inventory');

$('html').click(console.log(data));


