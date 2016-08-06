data = {
	invId: 0,
	inventory: [],
	currentPurchase: [],
	sales: 0,
	itemsSold: 0
}

function nameFromId(id){
	for (var i = 0; i < data.inventory.length; i++) {
		if( data.inventory[i].id == id ){
			return data.inventory[i].name;
		}
	};
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
	if (typeof parseInt(input) == 'number' && input > 0){
		return true;
	} else {
		return false;
	}
}

function validInt(input){
	if ( (Math.round(input) == input) && validNum(input) ){
		return true;
	}
	return false;
}

function validItem(input){
	if ( (/^[a-z0-9\-\,\.\#\$\@ ]+$/i).test(input) ){
		return true;
	}
	return false;
}

//setMode('inventory');



