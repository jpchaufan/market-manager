function newItem(value, q, p){
	data.inventory.push(
		{
			name: value,
			quantity: q,
			initialQuantity: q,
			price: p*100
		}
	);
	displayInventory();
	document.getElementById("inventoryForm").reset();
}




function displayInventory(){
	$("#mode #inventory").show();


	updateInventoryList();
}

function updateInventoryList(){
	if (data.inventory.length > 0){
		var html = "<tr><th>item</th><th>quantity</th><th>price</th></tr>"
		for (var i = 0; i < data.inventory.length; i++) {
			html += "<tr><td>"+data.inventory[i].name+"</td><td>"+data.inventory[i].quantity+"/"+data.inventory[i].initialQuantity+"</td><td>"+dollars(data.inventory[i].price)+"</td></tr>"
		};
	} else {
		var html = ''
	}
	document.getElementById("inventoryList").innerHTML = html;
}


//test prep

newItem('carrots', 12, 3);
newItem('beets', 15, 3);
newItem('garlic', 8, 2.5);