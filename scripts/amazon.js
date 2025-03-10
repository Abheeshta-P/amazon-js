//if we add a cart variable here it causes naming conflict so make this as module and import cart.js here
//for modules we need to use a server
//import cart from '../data/cart.js' --> if we use default export

//import * as cartModule from '../data/cart.js';
//cartModule.cart also cartModule.addToCart('id')

import {addToCart, calculateCartQuantity} from '../data/cart.js'
import {products, fetchProducts} from '../data/products.js'
import { addItemToCart } from './utils/addToCartFunctionality.js';
import { updateCartQuantity } from './utils/amazonHeaderUpdate.js';

//loadProducts(renderProductsGrids);//callback
fetchProducts().then(()=>{
  renderProductsGrids()
})
// .catch(err=>{
//   console.log("Error : "+err)
// })

//async request is sent takes time to get the products until then this hould not be rendered so
function renderProductsGrids(){
  let productHTML=``;
  products.forEach((product)=>{
    updateCartQuantity()
         productHTML+=
          ` <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarImageURL()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
             ${product.productsFormatedPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class=js-quantity-selector-${product.id}>
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
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`
          //used kaebab case data-product-id
          //polymorphism : product.extraInfoHTTML() dont know which extraInfoHTTML will be called
  })
  
  document.querySelector('.js-products-grid').innerHTML=productHTML;
  
  // ************ To made cart interactive ***********

 addItemToCart()
  }
  