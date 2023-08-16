const url = window.location.pathname;
const fileID = parseInt(url.slice(7).slice(0, -5));
const apiKey = "42e075d8ddd042fc9c8bfad79f781be9";
const img = document.querySelector(".mainsub__section-img");
const gameName = document.querySelector(".mainsub__section-name");
const gameRating = document.querySelector(".mainsub__section-rating");
const gamePlaytime = document.querySelector(".mainsub__section-playtime");
const screenshotItem = document.querySelectorAll(".mainsub__section-item");
let currentScreenshot = 1;

fetch(`https://rawg.io/api/games?token&key=${apiKey}`)
	.then((res) => res.json())
	.then((data) => {
		data.results.forEach((game) => {
			if (game.id == fileID) {
				img.setAttribute("src", game.background_image);
				img.setAttribute("alt", game.name);
				gameName.textContent = game.name;
				gameRating.textContent = `Rating: ${game.rating}`;
				gamePlaytime.textContent = `Playtime: ${game.playtime}`;

				screenshotItem.forEach((item) => {
					item.firstElementChild.setAttribute(
						"src",
						game.short_screenshots[currentScreenshot].image
					);
					currentScreenshot++;
					item.addEventListener("click", changePicture);
				});
			}
		});
	});

function changePicture() {
	img.setAttribute("src", this.firstElementChild.getAttribute("src"));
}
