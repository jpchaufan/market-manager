function displayPurchasePanel(){
	if (data.currentPurchase.length > 0){
		$('#purchasePanel').show();
	} else {
		data.closePurchasePanel();
	}
}

function closePurchasePanel(){
	$('#purchasePanel').hide();
}

function totalCost(){
	var amount = 0;
	for (var i = 0; i < data.currentPurchase.length; i++) {
		amount += data.currentPurchase[i].price*data.currentPurchase[i].quantity;
	};
	return amount;
}


function updatePurchasePanel(){
	var html = ''
	for (var i = 0; i < data.currentPurchase.length; i++) {
		html+='<div class="purchase" id="'+data.currentPurchase[i].name+'"><span class="quantity">'+data.currentPurchase[i].quantity+'</span>x <span class="item">'+data.currentPurchase[i].name+'</span> @ <span class="pricePerUnit">'+dollars(data.currentPurchase[i].price)+'</span> ea - <span class="totalPrice">'+dollars(data.currentPurchase[i].price*data.currentPurchase[i].quantity)+'</span></div>'
	};
	if (html != ''){
		//

		html += "<p>Total Cost: "+dollars(totalCost())+"</p>"
	}
	$('#purchasePanel .body').html(html);
	displayPurchasePanel();
}