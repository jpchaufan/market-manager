function displayMarket(){
	$("#mode #market").show();
	updateMarket();
}

function updateMarket(){
	var html = ''
	if (data.inventory.length == 0){
		html = "<p>No items in your market inventory!</p><p>Click on <b>Inventory Mode</b> along the top to set up your market items.</p>";
	}
	for (var i = 0; i < data.inventory.length; i++) {
		html += '<button onclick="sellItem(\''+data.inventory[i].name+'\')" id="'+data.inventory[i].name+'"><div class="name">'+data.inventory[i].name+'</div><div class="quantity">'+data.inventory[i].quantity+'/'+data.inventory[i].initialQuantity+'</div><div class="price">'+dollars(data.inventory[i].price)+'</div></button>';
	}
	$("#marketPanel").html(html);
}
function sellItem(value){
	//check if item has already been purchased once
	var found = false
	for (var i = 0; i < data.currentPurchase.length; i++) {
		if (data.currentPurchase[i].name == value){
			found = true;
			data.currentPurchase[i].quantity += 1;
			break;
		}			

	};
	if (!found){
		//find the price from the inventory list
		var price;
		for (var i = 0; i < data.inventory.length; i++) {
			if (value == data.inventory[i].name ){
				price = data.inventory[i].price
			}
		};
		data.currentPurchase.push(
			{
				name: value,
				quantity: 1,
				price: price
			}
		);	
	}	
	displayMarket();
	updatePurchasePanel();
	console.log(data.currentPurchase);
}