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
let currentScreenshot = 1;

fetch(`https://rawg.io/api/games?token&key=${apiKey}`)
	.then((res) => res.json())
	.then((data) => {
		for (let i = 0; i < 20; i++) {
			if (data.results[i].id == fileID) {
				img.setAttribute("src", data.results[i].background_image);
				img.setAttribute("alt", data.results[i].name);
				gameName.textContent = data.results[i].name;
				gameRating.textContent = `Rating: ${data.results[i].rating}`;
				gamePlaytime.textContent = `Playtime: ${data.results[i].playtime}`;

				data.results[i].parent_platforms.forEach(platform => {
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
						data.results[i].short_screenshots[currentScreenshot].image
					);
					item.addEventListener("click", changePicture);
					currentScreenshot++;
				});
			}
		}
	});
function changePicture() {
	img.setAttribute("src", this.firstElementChild.getAttribute("src"));
}
