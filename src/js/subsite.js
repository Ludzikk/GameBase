const url = window.location.pathname;
const fileID = url.replace(/^\D+/g, "").slice(0, -5);
const apiKey = "42e075d8ddd042fc9c8bfad79f781be9";
const img = document.querySelector(".mainsub__section-img");
const gameName = document.querySelector(".mainsub__section-name");
const gameRating = document.querySelector(".mainsub__section-rating");
const gamePlaytime = document.querySelector(".mainsub__section-playtime");
const screenshotItem = document.querySelectorAll(".mainsub__section-item");
const platforms = document.querySelector(".mainsub__section-platforms");
const pcIcon = "fa-solid fa-desktop";
const psIcon = "fa-brands fa-playstation";
const xboxIcon = "fa-brands fa-xbox";
const items = [];
let currentScreenshot = 1;

fetch(`https://rawg.io/api/games?token&key=${apiKey}`)
	.then((res) => res.json())
	.then((data) => {
		items.push(data.results);
		setItems();
	});

const setItems = () => {
	for (let i = 0; i < 20; i++) {
		if (items[0][i].id == fileID) {
			img.setAttribute("src", items[0][i].background_image);
			img.setAttribute("alt", items[0][i].name);
			gameName.textContent = items[0][i].name;
			gameRating.textContent = `Rating: ${items[0][i].rating}`;
			gamePlaytime.textContent = `Playtime: ${items[0][i].playtime}h`;

			items[0][i].parent_platforms.forEach(platform => {
				const p = document.createElement("p");
				const i = document.createElement("i");
				p.setAttribute("class", "mainsub__section-platform");
				if(platform.platform.id === 1){
					i.setAttribute("class", pcIcon);
					i.textContent = " " + platform.platform.name;
					p.appendChild(i);
					platforms.appendChild(p);
				} else if (platform.platform.id === 2){
					i.setAttribute("class", psIcon);
					i.textContent = " " + platform.platform.name;
					p.appendChild(i);
					platforms.appendChild(p);
				} else if (platform.platform.id === 3){
					i.setAttribute("class", xboxIcon);
					i.textContent = " " + platform.platform.name;
					p.appendChild(i);
					platforms.appendChild(p);
				}
			})

			screenshotItem.forEach((item) => {
				item.firstElementChild.setAttribute(
					"src",
					items[0][i].short_screenshots[currentScreenshot].image
				);
				item.addEventListener("click", changePicture);
				currentScreenshot++;
			});
		}
	}
}

function changePicture() {
	img.setAttribute("src", this.firstElementChild.getAttribute("src"));
}
