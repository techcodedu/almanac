document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const countriesList = document.getElementById("countriesList");
  const suggestionsContainer = document.getElementById("searchSuggestions");

  // Function to clear suggestions
  const clearSuggestions = () => {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
  };

  // Function to update the country display
  const updateCountry = (country) => {
    if (country && country.name) {
      const imagePath = `/static/images/flags/${country.name.toLowerCase()}.png`;
      countriesList.innerHTML = `
          <div class="country-item mb-3">
              <div class="card">
                  <div class="row g-0 align-items-center">
                      <div class="col-md-4">
                          <img src="${imagePath}" class="img-fluid rounded-start" alt="Flag of ${country.name}">
                      </div>
                      <div class="col-md-8">
                          <div class="card-body">
                              <h5 class="card-title">${country.name}</h5>
                              <p class="card-text">Capital: ${country.capital_city}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
    } else {
      countriesList.innerHTML = "<p>Country data is not available.</p>";
    }
  };

  // Function to handle search and fetch countries
  const handleSearch = (searchTerm) => {
    fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
      .then((response) => response.json())
      .then((countries) => {
        if (countries.length > 0) {
          // If the search term is not empty, display the first result
          if (searchTerm.length > 0) {
            updateCountry(countries[0]);
          } else {
            // If the search term is empty, display all results
            countriesList.innerHTML = ""; // Clear the list
            countries.forEach(updateCountry);
          }
        } else {
          countriesList.innerHTML = "<p>No countries found.</p>";
        }
        clearSuggestions(); // Clear suggestions
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Input event for search suggestions
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length > 0) {
      suggestionsContainer.style.display = "block";
      fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((suggestions) => {
          suggestionsContainer.innerHTML = ""; // Clear previous suggestions
          suggestions.forEach((suggestion) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener("click", () => {
              searchInput.value = suggestion;
              handleSearch(suggestion);
            });
            suggestionsContainer.appendChild(suggestionItem);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      clearSuggestions();
    }
  });

  // Search button click event
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    handleSearch(searchTerm);
  });

  // Fetch the first country when the page loads
  fetch("/fetch-countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: 0 }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        updateCountry(data);
      } else {
        console.log(data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
