const items = document.querySelectorAll(".main__section-item");

items.forEach((item) => {
	const randomItem = () => {
		const randomNum = Math.floor(Math.random() * 19);
		fetch(`https://fakestoreapi.com/products/${randomNum}`)
			.then((res) => res.json())
			.then((json) => {
				const itemPrice = json.price;
				const itemName = json.title;

				const imgOfItem = item.firstElementChild;
				const nameOfItem = item.children[1];
				const priceOfItem = item.children[2];
				imgOfItem.setAttribute("src", json.image);
				nameOfItem.textContent = itemName;
				priceOfItem.textContent = itemPrice + "$";
			});
	};
	randomItem();
});
