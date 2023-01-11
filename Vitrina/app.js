let totalPrice = 0;

const basket = [];

const products = [
	{
		name: 'Lenovo Yoga',
		price: 3000
	},
	{
		name: 'Acer Aspire',
		price: 1800
	},
	{
		name: 'Dell Vostro',
		price: 3400
	}
];


function onBuy(productName) {
	if (!basket.find(p => p.name == productName)) {
		const product = products.find(p => p.name == productName);
		basket.push(product);
		updateCart();
	}
	else {
		alert('Продукт уже в кашей корзине.');
	}

}

function removeProduct(productName) {
	const productIndex = basket.findIndex(p => p.name == productName);
	basket.splice(productIndex, 1);
	updateCart();
}


function updateCart() {
	const cartElem = document.querySelector('.cart-list');
	cartElem.innerHTML = '';
	totalPrice = 0;
	for (const p of basket) {
		const cartItemElem = document.createElement('li');
		cartItemElem.innerHTML = `<a href="#" onclick="removeProduct('${p.name}')">${p.name}</a>`;
		cartElem.appendChild(cartItemElem);
		totalPrice += p.price;
	}

	updateTotalPrice();
}

function updateTotalPrice() {
	const totalPriceElem = document.querySelector('.total-price');
	totalPriceElem.innerText = totalPrice;
}


(() => {
	// create cards
	const productsElem = document.querySelector('.products');
	for (const p of products) {
		const prod = document.createElement('div');
		prod.classList.add('product');
		prod.innerHTML = `<h3>${p.name}</h3>
							<p>Price: <span>${p.price}</span></p>
							<button onclick="onBuy('${p.name}')">Buy</button>`;
		productsElem.appendChild(prod);
	}

	updateTotalPrice();


})();