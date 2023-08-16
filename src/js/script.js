const apiKey = "42e075d8ddd042fc9c8bfad79f781be9";
const items = document.querySelectorAll(".main__section-item");
let currentItemNum = 0;
items.forEach((item) => {
	fetch(`https://rawg.io/api/games?token&key=${apiKey}`)
		.then((res) => res.json())
		.then((data) => {
			const img = item.firstElementChild;
			const name = item.children[1];
			const rating = item.children[2].firstElementChild;
			const playTime = item.children[2].lastElementChild;
			const realeseDate = item.lastElementChild;
			img.setAttribute("src", data.results[currentItemNum].background_image);
			name.textContent = data.results[currentItemNum].name;
			rating.textContent = "Rating " + data.results[currentItemNum].rating;
			playTime.textContent =
				"Playtime" + " " + data.results[currentItemNum].playtime + " h";
			realeseDate.textContent = data.results[currentItemNum].released;
			item.setAttribute("href", `./games/${data.results[currentItemNum].id}.html`)

			currentItemNum++;

			if(rating.textContent.slice(7) >= 4.5){
				rating.style.color = `green`;
			} else if (rating.textContent.slice(7) >= 4){
				rating.style.color = `orange`;
			} else {
				rating.style.color = `red`;
			}
		})
		.catch((error) => console.error("Error:", error));
});
