function displayOptions(){
	$("#mode #options").show();
}

//initialize options
	$('#displayNameOption').change(function(){
		displayNameChange( $('#displayNameOption').attr('value') );
	});
	displayNameChange(data.options.displayName);
//
	$('#confirmPurchasesOption').change(function(){
		confirmPurchaseChange($('#confirmPurchasesOption').is(":checked"));
	});
	confirmPurchaseChange($('#confirmPurchasesOption').prop("checked", data.options.confirmPurchases));
//
	$('#confirmDeleteItemOption').change(function(){
		confirmDeleteItem($('#confirmDeleteItemOption').is(":checked"));
	});
	confirmDeleteItem($('#confirmDeleteItemOption').prop("checked", data.options.confirmDeleteItem));

	$('#confirmCancelPurchaseOption').change(function(){
		confirmCancelPurchase($('#confirmCancelPurchaseOption').is(":checked"));
	});
	confirmCancelPurchase($('#confirmCancelPurchaseOption').prop("checked", data.options.confirmCancelPurchase));

	$('#currencySymbolOption').change(function(){
		currencySymbolChange( $('#currencySymbolOption').attr('value') );
	});
	currencySymbolChange(data.options.currencySymbol);
// end initialize options


function displayNameChange(value){
	if ((value.length > 20 || value.length < 4) && value != '') {
		cAlert("Between 4 and 20 characters please.");
		$('#displayNameOption').attr('value', '');
	} else if ( value != '' ){
		$('h1').html(value);
		data.options.displayName = value;
		return;
	}
	$('h1').html('Market Manager');
	data.options.displayName = 'Market Manager';
}
function confirmPurchaseChange(value){
	if (value){
		data.options.confirmPurchases = true;
	} else {
		data.options.confirmPurchases = false;
	}
}
function confirmDeleteItem(value){
	if (value){
		data.options.confirmDeleteItem = true;
	} else {
		data.options.confirmDeleteItem = false;
	}
}
function confirmCancelPurchase(value){
	if (value){
		data.options.confirmCancelPurchase = true;
	} else {
		data.options.confirmCancelPurchase = false;
	}
}
function currencySymbolChange(value){
	if (value.length > 5) {
		cAlert("At most 4 characters please.");
		$('#currencySymbolOption').attr('value', '$');
		data.options.currencySymbol = value;
	} else {
		data.options.currencySymbol = value;
		$('#currencySymbolOption').attr('value', value);
	}
}
