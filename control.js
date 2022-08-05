"use strict";
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
let data;
const searchbtn = document.querySelector(".search");
const ulbtn = document.querySelector(".suggestions");

const FetchingData = async function (e) {
  const resp = await fetch(endpoint);
  data = await resp.json();
  return data;
};
FetchingData();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
searchbtn.addEventListener("keyup", function (e) {
  ulbtn.innerHTML = "";
  if (this.value === "") {
    const DefaultMarkup = `
        <li>Filter for a city</li>
        <li>or a state</li>`;

    return ulbtn.insertAdjacentHTML("afterbegin", DefaultMarkup);
  } else {
    const filterData = data.filter(
      (d) =>
        d.city.toLowerCase().includes(this.value.toLowerCase()) ||
        d.state.toLowerCase().includes(this.value.toLowerCase())
    );
    const MarkUp = filterData
      .map((data) => {
        const state = data.state;
        const city = data.city;
        const population = data.population;
        return `<li>
        <span class="name"> ${city}, ${state}</span>
        <span class="population">${numberWithCommas(population)}</span>
        </li> `;
      })
      .join("");
    console.log(filterData);
    ulbtn.insertAdjacentHTML("afterbegin", MarkUp);
  }
});
