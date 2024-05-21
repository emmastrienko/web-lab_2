import CoffeeData from "./CoffeeData.js";

const cardsContainer = document.getElementById("cards");
let startIndex = 0;
const cardsPerLoad = 8;
const cardsHTML = document.getElementById("cards");

function renderCard(card) {
  return `
    <div class="card">
      <img src=${card.imagelink_square}>
      <h2>${card.name}</h2>
      <p><span>Price: &nbsp;</span><span class="price">${card.prices[1].price}$</span></p>
      <div>
      <span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
       <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
      </svg>
      </span>

      <span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>
      </span>
      </div>
      <button id="details"><a href="#id01">Details</a></button>
    </div>
  `;
}

// function renderCards(start, end, data) {
//   const fragment = document.createDocumentFragment();
//   for (let i = start; i < end && i < data.length; i++) {
//     const cardHTML = renderCard(data[i]);
//     const cardElement = document
//       .createRange()
//       .createContextualFragment(cardHTML);
//     fragment.appendChild(cardElement);
//   }
//   cardsContainer.appendChild(fragment);
// }

function renderCards(start, end, data) {
  for (let i = start; i < end && i < data.length; i++) {
    cardsHTML.innerHTML += renderCard(data[i]);
  }
}

const moreBtn = document.getElementById("more-btn");
const searchInput = document.getElementById("searchInput");

function loadMoreCards() {
  const endIndex = startIndex + cardsPerLoad;
  renderCards(startIndex, endIndex, CoffeeData);
  startIndex = endIndex;

  moreBtn.style.display = startIndex >= CoffeeData.length ? "none" : "block";
}

function search() {
  cardsContainer.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = CoffeeData.filter((card) =>
    card.name.toLowerCase().includes(searchTerm)
  );
  if (filteredData.length === 0) {
    cardsContainer.innerHTML = `There is no results with '${searchInput.value}'`;
  }
  startIndex = 0;
  renderCards(startIndex, cardsPerLoad, filteredData);
  moreBtn.style.display = startIndex >= filteredData.length ? "none" : "block";
}

loadMoreCards();

const filterContainer = document.getElementById("filterButtons");

const coffeeTypes = [...new Set(CoffeeData.map((coffee) => coffee.type))];

coffeeTypes.forEach((type) => {
  const button = document.createElement("button");
  button.setAttribute("data-type", type);

  const buttonText = type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  button.textContent = buttonText;
  filterContainer.appendChild(button);
});

moreBtn.addEventListener("click", loadMoreCards);

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", search);

document
  .querySelector("#filterButtons")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      let buttons = document.querySelectorAll(".filter button");
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      event.target.classList.add("active");

      cardsContainer.innerHTML = "";
      const searchTerm = event.target.getAttribute("data-type");

      if (searchTerm === "all") {
        loadMoreCards();
      } else {
        const filteredData = CoffeeData.filter(
          (card) =>
            card.type === searchTerm &&
            card.name.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        if (filteredData.length === 0) {
          cardsContainer.innerHTML = `There is no results with '${searchInput.value}'`;
        }
        startIndex = 0;
        renderCards(startIndex, cardsPerLoad, filteredData);
        moreBtn.style.display =
          cardsPerLoad >= filteredData.length ? "none" : "block";
      }
    }
  });

// const detailsBtn = document.getElementsByClassName("details");
// detailsBtn.addEventListener("click", (event) => {

// });
