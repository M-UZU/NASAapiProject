// JavaScript code to handle the functionality

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistoryList = document.getElementById('search-history');

// Load the current APOD image on page load
window.addEventListener('load', () => {
    getCurrentImageOfTheDay();
    displaySearchHistory();
});

// Handle form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
    saveSearch(selectedDate);
});


// Function to fetch the APOD for the current date
function getCurrentImageOfTheDay() {
    const apiKey = 'YqKSAUYlig9Vi8x8nFcetVSwDXdRkfWUgGTgcxz5'; // Replace with your API key
    const currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate);

    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
    
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayAPOD(data);
        })
        .catch((error) => {
            console.error('Error fetching current APOD:', error);
        });
        console.log(apiUrl);
}


// Function to fetch and display the APOD for a specific date
function getImageOfTheDay(date) {
    const apiKey = 'YqKSAUYlig9Vi8x8nFcetVSwDXdRkfWUgGTgcxz5'; // Replace with your API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayAPOD(data);
        })
        .catch((error) => {
            console.error('Error fetching APOD:', error);
        });
}

// Function to display the APOD image
function displayAPOD(data) {
    currentImageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title} style="width:600px; height:600px;">
        <p>${data.title}</p>
        <p>${data.explanation}</p>
    `;
}

// Function to save the search date to local storage
function saveSearch(date) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.unshift(date);
    searchHistory = searchHistory.slice(0, 5); // Limit to 5 recent searches
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

// Function to display search history
function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryList.innerHTML = '';
    searchHistory.forEach((date) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = date;
        link.href = '#'; // You can set this to '#' or leave it empty
        link.addEventListener('click', (e) => {
            e.preventDefault();
            getImageOfTheDay(date);
        });
        listItem.appendChild(link);
        searchHistoryList.appendChild(listItem);
    });
}
