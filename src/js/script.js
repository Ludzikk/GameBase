const apiKey = "42e075d8ddd042fc9c8bfad79f781be9";
const items = document.querySelectorAll(".main__section-item");
const games = [];
let currentItemNum = 0;

fetch(`https://rawg.io/api/games?token&key=${apiKey}`)
	.then((res) => res.json())
	.then((data) => {
		games.push(data.results);
		setItems();
	})
	.catch((error) => console.error("Error:", error));

const setItems = () => {
	items.forEach((item) => {
		const img = item.firstElementChild;
		const name = item.children[1];
		const rating = item.children[2].firstElementChild;
		const playTime = item.children[2].lastElementChild;
		const realeseDate = item.lastElementChild;

		img.setAttribute("src", games[0][currentItemNum].background_image);
		name.textContent = games[0][currentItemNum].name;
		rating.textContent = "Rating " + games[0][currentItemNum].rating;
		playTime.textContent =
			"Playtime" + " " + games[0][currentItemNum].playtime + " h";
		realeseDate.textContent = games[0][currentItemNum].released;
		item.setAttribute("href", `./games/${games[0][currentItemNum].id}.html`);

		currentItemNum++;

		if (rating.textContent.slice(7) >= 4.5) {
			rating.style.color = `green`;
		} else if (rating.textContent.slice(7) >= 4) {
			rating.style.color = `orange`;
		} else {
			rating.style.color = `red`;
		}
	});
};
