document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const countriesList = document.getElementById("countriesList");
  const suggestionsContainer = document.getElementById("searchSuggestions");

  let currentCountryIndex = 0; // Index for the next/previous buttons

  // Function to clear suggestions
  const clearSuggestions = () => {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
  };

  // Function to update the country display
  const updateCountry = (country) => {
    // Ensure the path is correct relative to the 'static' directory
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
  };

  // Fetch country by index for next/previous functionality
  const fetchCountryByIndex = (index) => {
    fetch("/fetch-countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.error) {
          updateCountry(data);
        } else {
          console.error(data.error || "Error fetching country by index.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Event listeners for the pagination buttons
  prevButton.addEventListener("click", function () {
    if (currentCountryIndex > 0) {
      currentCountryIndex -= 1;
      fetchCountryByIndex(currentCountryIndex);
    }
  });

  nextButton.addEventListener("click", function () {
    // Assuming we don't know the total number of countries,
    // we will attempt to fetch the next country. If there isn't one,
    // an error will be logged to the console.
    currentCountryIndex += 1;
    fetchCountryByIndex(currentCountryIndex);
  });

  // Function to handle the search action
  const handleSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((countries) => {
          if (countries && countries.length > 0) {
            updateCountry(countries[0]); // Display the first result
            clearSuggestions();
          } else {
            countriesList.innerHTML = "<p>No countries found.</p>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // Input event for search suggestions
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length > 0) {
      suggestionsContainer.style.display = "block";
      fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((countries) => {
          suggestionsContainer.innerHTML = ""; // Clear previous suggestions
          countries.forEach((country) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = country.name; // Use country.name for text
            suggestionItem.addEventListener("click", () => {
              searchInput.value = country.name;
              updateCountry(country); // Update display with the clicked country
              clearSuggestions();
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
  searchButton.addEventListener("click", handleSearch);

  // Fetch the first country when the page loads
  fetchCountryByIndex(currentCountryIndex);
});
