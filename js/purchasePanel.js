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

function subtractPurchase(itemId){
	for (var i = 0; i < data.currentPurchase.length; i++) {
		if ( data.currentPurchase[i].itemId == itemId ){
			if (data.currentPurchase[i].quantity == 1){
				data.currentPurchase.splice(i, 1);
			} else {
				data.currentPurchase[i].quantity -=1;
			}
		}
	};
	updatePurchasePanel();
}

function updatePurchasePanel(){
	if (data.currentPurchase.length > 0){ // if purchases exist
		var html = '';
		for (var i = 0; i < data.currentPurchase.length; i++) {
			html+='<div class="purchase" onclick="subtractPurchase(\''+data.currentPurchase[i].itemId+'\')" itemId="'+data.currentPurchase[i].itemId+'"><span class="quantity">'+data.currentPurchase[i].quantity+'</span>x <span class="item">'+data.currentPurchase[i].name+'</span> @ <span class="pricePerUnit">'+dollars(data.currentPurchase[i].price)+'</span> ea - <span class="totalPrice">'+dollars(data.currentPurchase[i].price*data.currentPurchase[i].quantity)+'</span></div>';
		};
		if (html != ''){
			//

			html += "<p>Total Cost: "+dollars(totalCost())+"</p>";
		}
		data.purchaseHtml = html;
		$('.purchasePanel .body').html(html);
		displayPurchasePanel();
	} else { // else if no purchases
		closePurchasePanel();
	}
}

function finalizePurchase(){
	callback = function(){
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

		//update reports
			data.sales += totalCost();
			data.numOfSales += 1;
			if (data.smallestSale == 0 || totalCost() < data.smallestSale){
				data.smallestSale = totalCost();
			}
			if (data.largestSale == 0 || totalCost() > data.largestSale){
				data.largestSale = totalCost();
			}
			for (var i = 0; i < data.currentPurchase.length; i++) {
				var cashFromItem = data.currentPurchase[i].quantity*data.currentPurchase[i].price;
				for (var k = 0; k < data.inventory.length; k++) {
					if ( data.currentPurchase[i].itemId == data.inventory[k].id ){
						data.inventory[k].profit += cashFromItem;
						// adjust initialQuantity if quantity goes into the negatives
						while (data.inventory[k].quantity < 0){
							data.inventory[k].quantity += 1;
							data.inventory[k].initialQuantity += 1;
						}
					}
				};
			};
		// end update reports
		data.currentPurchase = [];
		data.purchaseHtml = '';
		updatePurchasePanel();
		updateMarket();
	}
	if (data.options.confirmPurchases){
		cConfirm("Confirm this purchase?<br/>"+data.purchaseHtml, callback);	
	} else {
		callback();
	}
	
}

function cancelPurchase(){
	callback = function(){
		data.currentPurchase = [];
		updatePurchasePanel();
		updateMarket();
	}
	if (data.options.confirmCancelPurchase){
		cConfirm("Cancel this purchase?", callback);	
	} else {
		callback();
	}
	
}





