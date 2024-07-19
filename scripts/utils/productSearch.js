import { fetchProducts, products } from "../../data/products.js";
import { addItemToCart } from "./addToCartFunctionality.js";
// Function to get URL parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to handle the search
function handleSearch(searchValue) {
  const url = new URL(window.location);
  if (window.location.pathname !== '/index.html') {
    // Redirect to index.html with the search query
    window.location.href = `index.html?search=${encodeURIComponent(searchValue)}`;
  } 
  else{
    url.searchParams.set('search', searchValue);
    window.location.href = url.href; // Redirect with the search query
    performSearch(searchValue)
  }
 
}

// Function to perform the search and render results
function performSearch(searchValue) {
  document.querySelector('.js-products-grid').innerHTML = '';
  let found = false;
  products.forEach(product => {
    if (searchKeyword(product.keywords, searchValue)) {
      console.log("Got it");
      productHTML(product);
      found = true;
    }
  });

  if (!found) {
    const bodyGrid = document.querySelector('.js-products-grid');
    bodyGrid.innerHTML = `<div style="margin-left:20px;margin-top:20px; font-size:20px;  white-space: nowrap; "><b>${searchValue} </b>is not found</div>`;
    console.log("Not found");
  }
  addItemToCart();
}

// Function to create the product HTML
function productHTML(product) {

  const productGrid = document.querySelector('.js-products-grid');
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');

  productContainer.innerHTML = `
    <div class="product-image-container">
      <img class="product-image" src="${product.image}">
    </div>
    <div class="product-name limit-text-to-2-lines">${product.name}</div>
    <div class="product-rating-container">
      <img class="product-rating-stars" src="${product.getStarImageURL()}">
      <div class="product-rating-count link-primary">${product.rating.count}</div>
    </div>
    <div class="product-price">${product.productsFormatedPrice()}</div>
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    ${product.extraInfoHTTML()}
    <div class="product-spacer"></div>
    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png"> Added
    </div>
    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
  `;
  
  productGrid.appendChild(productContainer);

  
}

// Function to check if the keyword matches
function searchKeyword(keywords, value) {
  return keywords.some(keyword => keyword.toLowerCase() === value.toLowerCase());
}

// Attach event listener to the search button
document.addEventListener('DOMContentLoaded', () => {

  const searchButton = document.querySelector('.js-search-button');
  searchButton.addEventListener('click', () => {
    const searchField = document.querySelector('.search-bar');
    const searchValue = searchField.value;
    console.log(searchValue);
    handleSearch(searchValue);
  });

  // Check if there is a search parameter in the URL
  const searchValue = getQueryParam('search');
  if (searchValue) {
    fetchProducts().then(() => {
      if (window.location.pathname === '/index.html') {
        performSearch(searchValue);
      }
    }).catch(err => console.log("Error : " + err));
  }


});
