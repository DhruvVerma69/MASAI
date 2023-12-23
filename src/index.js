let data = [];

let fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

let countryCard = (el) => {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("country-card");

  cardDiv.innerHTML = `
    <h2>${el.name.common}</h2>
    <img src="${el.flags.png}" alt="Flag">
    <p>Population: ${el.population}</p>
    <p>Region: ${el.region}</p>
    <p>Capital: ${el.capital}</p>
  `;

  return cardDiv;
};

let renderData = (data) => {
  let container = document.getElementById("all_countries");
  container.innerHTML = ""; // Clear previous data

  data.forEach((country) => {
    const card = countryCard(country);
    container.appendChild(card);
  });
};

let sortLogic = (order, data) => {
  return data.sort((a, b) => {
    const populationA = a.population;
    const populationB = b.population;

    if (order === "asc") {
      return populationA - populationB;
    } else if (order === "desc") {
      return populationB - populationA;
    } else {
      return 0;
    }
  });
};

let filterByRegionLogic = (data, regionName) => {
  if (regionName === "all") {
    return data;
  } else {
    return data.filter((country) => country.region === regionName);
  }
};

let handleSortAndFilter = () => {
  const sortSelect = document.getElementById("sort_population");
  const filterSelect = document.getElementById("filter_region");

  const applySortAndFilter = () => {
    const sortOrder = sortSelect.value;
    const filteredData = filterByRegionLogic(data, filterSelect.value);
    const sortedData = sortLogic(sortOrder, filteredData);
    renderData(sortedData);
  };

  sortSelect.addEventListener("change", applySortAndFilter);
  filterSelect.addEventListener("change", applySortAndFilter);
};

window.onload = async function () {
  await fetchCountries();
  renderData(data);
  handleSortAndFilter();
  // TODO: Add other necessary event listeners and complete other functions
};

if (typeof exports !== "undefined") {
  module.exports = {
    renderData,
    handleSortAndFilter,
    sortLogic,
    filterByRegionLogic,
    fetchCountries, // Fix the typo in the export
  };
}
