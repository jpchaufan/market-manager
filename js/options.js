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
	
	$('#themeOption').change(function(){
		themeChange($('#themeOption').val());
	});

	$('#btnImgOption').change(function(){
		btnImgChange($('#btnImgOption').is(":checked"));
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
		themeChange(data.options.theme);
		$('#themeOption').val(data.options.theme);
		btnImgChange(data.options.btnImgs);
		$('#btnImgOption').prop('checked', data.options.btnImg);

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
function themeChange(value){
	data.options.theme = value;

	//reset theme
	var changed = ['body', 'header', '#menu', 'h1', 'nav span', '#mode'];
	for (var i = 0; i < changed.length; i++) {
		$(changed[i]).removeAttr('style');
	};
	if (data.options.theme == 'forest'){
		$("body").css('color', '#3f3f3f');
		$('header, #menu').css('background-color', '#61380B');
		$('header').css('color', '#61380B');
		$('h1').css('text-shadow', '2px 2px 2px rgba(255, 255, 255, .7)');
		$('h1').css('-webkit-text-shadow', '2px 2px 2px rgba(255, 255, 255, .7)');
		$('h1').css('-moz-text-shadow', '2px 2px 2px rgba(255, 255, 255, .7)');
		$('h1').css('-o-text-shadow', '2px 2px 2px rgba(255, 255, 255, .7)');
		$('nav span').css('text-decoration', 'none');
		$('nav span').css('color', '#a2a2a2');
		$("body").css('background-color', '#21610B');
		$('#mode').css('background-color', 'rgba(255, 255, 255, .3)');
		$('#mode').css('box-shadow', '0 0 8px 8px rgba(255, 255, 255, .3)');
		$('#mode').css('-webkit-box-shadow', '0 0 8px 8px rgba(255, 255, 255, .3)');
		$('#mode').css('-moz-box-shadow', '0 0 8px 8px rgba(255, 255, 255, .3)');
		$('#mode').css('-o-box-shadow', '0 0 8px 8px rgba(255, 255, 255, .3)');
		$('#mode').css('border-radius', '12px');
		$('#mode').css('-webkit-border-radius', '12px');
		$('#mode').css('-moz-border-radius', '12px');
		$('#mode').css('-o-border-radius', '12px');

	} else if (data.options.theme == 'clouds'){
		$("body").css('background-image', 'url("imgs/bg-clouds.jpg")');
		$("body").css('background-size', '100% 100%');
	} else if (data.options.theme == 'chloe'){
		$("body").css('background-image', 'url("imgs/bg-chloe.jpg")');
		$("body").css('background-size', '100% 100%');
	} 
}
function btnImgChange(value){	
	console.log(value);
	if (value){
		data.options.btnImg = true;
	} else {
		data.options.btnImg = false;
	}
}





//btn img select populate
var option = '';
for (var i = 0; i < buttonImgs.length; i++) {
	option += "<option>"+buttonImgs[i].name+"</option>";
	
};
$('#btnImgSelect').html(option);







