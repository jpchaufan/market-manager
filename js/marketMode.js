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
		html += '<button class="purchaseBtn" onclick="sellItem(\''+data.inventory[i].id+'\')" id="'+data.inventory[i].id+'">';
		html += '<div class="name">'+data.inventory[i].name+'</div><div class="quantity"><span class="currentQuantity">'+data.inventory[i].quantity+'</span>/<span class="initialQuantity">'+data.inventory[i].initialQuantity+'</span></div><div class="price">'+dollars(data.inventory[i].price)+'</div></button>';
	}
	$("#marketPanel").html(html);
	if (data.options.btnImg){
		imgToBtn();
	} else {
		undoImgToBtn();
	}
}
function sellItem(itemId){
	//check if item has already been purchased once
	var found = false
	for (var i = 0; i < data.currentPurchase.length; i++) {
		if (data.currentPurchase[i].itemId == itemId){
			found = true;
			data.currentPurchase[i].quantity += 1;

			break;
		}			

	};
	if (!found){
		//find the price from the inventory list
		var price;
		for (var i = 0; i < data.inventory.length; i++) {
			if (itemId == data.inventory[i].id ){
				var value = data.inventory[i].name;
				var price = data.inventory[i].price;
			}
		};
		data.currentPurchase.push(
			{
				itemId: itemId,
				name: value,
				quantity: 1,
				price: price
			}
		);
	}	
	updatePurchasePanel();

	//lower currentQuantity in real time
	var $elem = $('#marketPanel button#'+itemId+' span.currentQuantity');
	$elem.html($elem.html()-1);
}



//Image to button system


var buttonImgs = [
	{
		name: 'carrot',
		img: 'carrot.jpg',
		fontColor: 'white'
	},
	{
		name: 'broccoli',
		img: 'broccoli.jpg',
		fontColor: 'white'
	},
	{
		name: 'asparagus',
		img: 'asparagus.jpg',
		fontColor: 'white'
	},
	{
		name: 'flower',
		img: 'flowers.jpg',
		fontColor: 'black'
	},
	{
		name: 'cauliflower',
		img: 'cauliflower.jpg',
		fontColor: 'white'
	},
	{
		name: 'celery',
		img: 'celery.jpg',
		fontColor: 'black'
	},
	{
		name: 'garlic',
		img: 'garlic.jpg',
		fontColor: 'black'
	},
	{
		name: 'potato',
		img: 'potato.jpg',
		fontColor: 'black'
	},
	{
		name: 'radish',
		img: 'radish.jpg',
		fontColor: 'black'
	},
	{
		name: 'green onion',
		img: 'green_onions.jpg',
		fontColor: 'black'
	}	
];


function imgToBtn(){
	
	for (var i = 0; i < buttonImgs.length; i++) {
		var name = buttonImgs[i].name
		var img = buttonImgs[i].img
		var fontColor = buttonImgs[i].fontColor
		if (fontColor === 'white'){
			var bg = 'rgba(0,0,0,.5)'; 
		} else {
			var bg = 'rgba(255,255,255,.5)';
		}
		$( "button:contains('"+name+"')" ).css( "background", "url('imgs/"+img+"')" );
		$( "button:contains('"+name+"')" ).css( "background-size", "100% 100%" );
		$( "button:contains('"+name+"') div.name" ).css( "color", fontColor );
		$( "button:contains('"+name+"') div.name" ).css( "background-color", bg );
		$( "button:contains('"+name+"') div.name" ).css( "top", "1.5em" );
		$( "button:contains('"+name+"') div" ).css( "position", "relative" );
		$( "button:contains('"+name+"') div.quantity" ).css( "display", "inline-block" );
		$( "button:contains('"+name+"') div.price" ).css( "display", "inline-block" );
		$( "button:contains('"+name+"') div.price" ).css( "top", "1.8em" );
		$( "button:contains('"+name+"') div.price" ).css( "margin", "0 .1em" );
		$( "button:contains('"+name+"') div.price" ).css( "font-size", ".9em" );
		$( "button:contains('"+name+"') div.quantity" ).css( "top", "1.8em" );
		$( "button:contains('"+name+"') div.quantity" ).css( "margin", "0 .1em" );
		$( "button:contains('"+name+"') div.quantity" ).css( "font-size", ".9em" );
	};
}
function undoImgToBtn(){
	for (var i = 0; i < buttonImgs.length; i++) {
		$( "button:contains('"+buttonImgs[i].name+"')" ).removeAttr('style');
		$( "button:contains('"+buttonImgs[i].name+"') div" ).removeAttr('style');	
	};
}












