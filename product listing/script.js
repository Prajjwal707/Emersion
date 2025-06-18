// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const productGrid = document.getElementById('productGrid');
const resultsCount = document.getElementById('resultsCount');

// API Endpoints
const ALL_PRODUCTS_URL = 'https://dummyjson.com/products';
const SEARCH_URL = 'https://dummyjson.com/products/search?q=';

// Initial load - fetch all products
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(ALL_PRODUCTS_URL);
});

// Search button click event
searchBtn.addEventListener('click', () => {
    performSearch();
});

// Enter key in search input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Perform search with validation
function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    // Reset error message
    errorMessage.textContent = '';
    
    // Input validation
    if (!searchTerm) {
        errorMessage.textContent = 'Please enter a search term.';
        searchInput.focus();
        return;
    }
    
    if (searchTerm.length < 2) {
        errorMessage.textContent = 'Search term must be at least 2 characters.';
        return;
    }
    
    // Perform the search
    const searchURL = `${SEARCH_URL}${encodeURIComponent(searchTerm)}`;
    fetchProducts(searchURL);
}

// Fetch products from API
async function fetchProducts(url) {
    try {
        // Show loading state
        productGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading products...</p>
            </div>
        `;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        displayProducts(data.products);
        
        // Update results count
        resultsCount.textContent = `Displaying ${data.products.length} products`;
        
    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading products. Please try again later.</p>
            </div>
        `;
    }
}

// Display products in the grid
function displayProducts(products) {
    if (!products || products.length === 0) {
        productGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No products found. Try a different search term.</p>
            </div>
        `;
        return;
    }
    
    // Clear previous results
    productGrid.innerHTML = '';
    
    // Create product cards
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Generate star rating
        const stars = Math.round(product.rating);
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<i class="fas fa-star${i <= stars ? '' : '-half-alt'}"></i>`;
        }
        
        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    ${starsHTML} ${product.rating}
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <span class="product-category">${product.category}</span>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}