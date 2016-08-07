function newItem(value, q, p){
	if ( !validItem(value) ){
		cAlert("Item can only have numbers, letters, and the symbols - . , # $ @ ");
		return;
	}
	if ( !validInt(q) ){
		cAlert("Quantity must be a whole number.");
		return;
	}
	if ( !validNum(p) ){
		cAlert("Price must be a number.");
		return;
	}
	
	data.inventory.push(
		{
			id: data.invId,
			name: value,
			quantity: parseInt(q),
			initialQuantity: parseInt(q),
			price: p*100,
			profit: 0
		}
	);
	data.invId += 1;
	displayInventory();
	document.getElementById("inventoryForm").reset();
}

function displayInventory(){
	$("#mode #inventory").show();
	updateInventoryList();
}

function updateInventoryList(){
	if (data.inventory.length > 0){
		var html = "<tr><th>Item</th><th>Quantity</th><th>Price</th><th></th></tr>"
		for (var i = 0; i < data.inventory.length; i++) {
			html += "<tr class='display_"+data.inventory[i].id+"'> <td>"+data.inventory[i].name+"</td><td>"
			+data.inventory[i].quantity+"/"+data.inventory[i].initialQuantity+"</td><td>"
			+dollars(data.inventory[i].price)+"</td><td><span class='editLi' onclick='editLi(\""
			+data.inventory[i].id+"\")'>edit</span></td></tr>";

			html += "<tr class='edit_"+data.inventory[i].id+"'><td><input type='text' class='"+data.inventory[i].id+"Name' value='"+data.inventory[i].name+
			"' /></td><td><input class='"+data.inventory[i].id+"Quantity' type='text' value='"+data.inventory[i].quantity+"/"+data.inventory[i].initialQuantity+"'/></td>";
			html += "<td><input type='text'  class='"+data.inventory[i].id+"Price' value='"+data.inventory[i].price/100+"' </td>";
			html += "<td> <span class='updateLi' onclick='updateLi(\""+data.inventory[i].id+"\")' >update</span> <span class='spacer'>|</span> <span class='deleteLi' onclick='deleteLi(\""+data.inventory[i].id+"\")' >delete</span></td></tr>"
		};
	} else {
		var html = '';
	}
	document.getElementById("inventoryList").innerHTML = html;
}

function deleteInventory(){
	callback = function(){
		data.inventory = [];
		updateInventoryList();
	}
	cConfirm("Really delete entire inventory?", callback);
}

function editLi(itemId){
	$('.display_'+itemId).hide();
	$('.edit_'+itemId).show();
	$('.'+itemId+'Name').focus();
}
function updateLi(itemId){
	var name = $('.'+itemId+'Name').attr('value');
	var q = $('.'+itemId+'Quantity').attr('value');
	var p = $('.'+itemId+'Price').attr('value');
	if ( !validItem(name) ){
		cAlert("Item can only have numbers, letters, and the symbols - . , # $ @ ");
		return;
	}
	if ( !validQuanttitySet(q) ){
		cAlert("Enter in format: quantity/max quantity (eg. 5/10 for five out of ten)");
		return;
	}
	
	if ( !validNum(p) ){
		cAlert("Price must be a number.");
		return;
	}

	var quantity = parseInt(q.match(/^[0-9]+/));
	var initialQuantity = q.match(/\/[0-9]+$/);
	initialQuantity = parseInt(initialQuantity[0].match(/[0-9]+/));

	if ( !(quantity <= initialQuantity) ){
		cAlert("Current quantity can't be greater than max quantity.");
		return;
	}

	for (var i = 0; i < data.inventory.length; i++) {
		if (data.inventory[i].id == itemId){
			data.inventory[i].name = name;
			data.inventory[i].quantity = parseInt(quantity);
			data.inventory[i].initialQuantity = initialQuantity;
			data.inventory[i].price = p*100;
			updateInventoryList();
		}
	};

	$('.display_'+item).show();
	$('.edit_'+item).hide();
}
function deleteLi(itemId){
	callback = function(){
		for (var i = 0; i < data.inventory.length; i++) {
			if ( data.inventory[i].id == itemId ){
				data.inventory.splice(i, 1);
				updateInventoryList();
				return;
			}
		};
	}
	if (data.options.confirmDeleteItem){
		cConfirm("really delete "+nameFromId(itemId)+"?", callback);	
	} else {
		callback();
	}
	
}

$('#inventoryForm input').on('keydown',function(e){
	if (e.keyCode == 13){
		newItem(item.value, quantity.value, price.value);
	}

});

//test prep

newItem('carrots', 12, 3);
newItem('beets', 15, 3);
newItem('garlic', 8, 2.5);
newItem('potato basket', 20, 4);
newItem('greens - sm bag', 30, 3.5);
newItem('greens - lg bag', 18, 6);











