function displayOptions(){
	$("#mode #options").show();
}

//initialize options
	$('#displayNameOption').change(function(){
		displayNameChange( $('#displayNameOption').attr('value') );
	});
	
//
	$('#confirmPurchasesOption').change(function(){
		confirmPurchaseChange($('#confirmPurchasesOption').is(":checked"));
	});
	
//
	$('#confirmDeleteItemOption').change(function(){
		confirmDeleteItem($('#confirmDeleteItemOption').is(":checked"));
	});
	

	$('#confirmCancelPurchaseOption').change(function(){
		confirmCancelPurchase($('#confirmCancelPurchaseOption').is(":checked"));
	});
	

	$('#currencySymbolOption').change(function(){
		currencySymbolChange( $('#currencySymbolOption').attr('value') );
	});

	$('#autoSaveOption').change(function(){
		autoSaveChange($('#autoSaveOption').is(":checked"));
	});
	

	function setOptionsFromData(){
		displayNameChange(data.options.displayName);

		$('#displayNameOption').attr('value', data.options.displayName);
		confirmPurchaseChange(data.options.confirmPurchases);
		$('#confirmPurchasesOption').prop('checked', data.options.confirmPurchases);
		confirmDeleteItem(data.options.confirmDeleteItem);
		$('#confirmDeleteItemOption').prop('checked', data.options.confirmDeleteItem);
		confirmCancelPurchase(data.options.confirmCancelPurchase);
		$('#confirmCancelPurchaseOption').prop('checked', data.options.confirmCancelPurchase);
		currencySymbolChange(data.options.currencySymbol);
		$('#confirmSymbolChangeOption').attr('value', data.options.confirmSymbolChange);
		autoSaveChange(data.options.autoSave);
		$('#autoSaveOption').prop('checked', data.options.autoSave);
		
	}
	setOptionsFromData();
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
function autoSaveChange(value){	
	if (value){
		data.options.autoSave = true;
	} else {
		data.options.autoSave = false;	
	}
}












