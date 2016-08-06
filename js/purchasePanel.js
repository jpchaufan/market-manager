function displayPurchasePanel(){
	if (data.currentPurchase.length > 0){
		$('.purchasePanel').css("display","inline-block");
	} else {
		data.closePurchasePanel();
	}
}

function closePurchasePanel(){
	$('.purchasePanel').hide();
}

function totalCost(){
	var amount = 0;
	for (var i = 0; i < data.currentPurchase.length; i++) {
		amount += data.currentPurchase[i].price*data.currentPurchase[i].quantity;
	};
	return amount;
}


function updatePurchasePanel(){
	if (data.currentPurchase.length > 0){ // if purchases exist
		var html = '';
		for (var i = 0; i < data.currentPurchase.length; i++) {
			html+='<div class="purchase" id="'+data.currentPurchase[i].name+'"><span class="quantity">'+data.currentPurchase[i].quantity+'</span>x <span class="item">'+data.currentPurchase[i].name+'</span> @ <span class="pricePerUnit">'+dollars(data.currentPurchase[i].price)+'</span> ea - <span class="totalPrice">'+dollars(data.currentPurchase[i].price*data.currentPurchase[i].quantity)+'</span></div>';
		};
		if (html != ''){
			//

			html += "<p>Total Cost: "+dollars(totalCost())+"</p>";
		}
		$('.purchasePanel .body').html(html);
		displayPurchasePanel();
	} else { // else if no purchases
		closePurchasePanel();
	}
}

function finalizePurchase(){
	var conf = confirm("Confirm purchase of "+dollars(totalCost())+"?");
	if (conf){ 
		for (var i = 0; i < data.currentPurchase.length; i++) { // update quantities in inventory
			var item = data.currentPurchase[i].name;
			var amount = data.currentPurchase[i].quantity;
			for (var k = 0; k < data.inventory.length; k++) {
				if (item == data.inventory[k].name){
					data.inventory[k].quantity -= amount;
					data.itemsSold += amount;
				}
			};
		};
		data.sales += totalCost();
		data.currentPurchase = [];
		updatePurchasePanel();
		updateMarket();
	}
}

function cancelPurchase(){
	if ( confirm("Cancel this purchase?") ){
		data.currentPurchase = [];
		updatePurchasePanel();
	}
}





