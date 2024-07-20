import {cart,removeFromCart, updateCart, updateDeliveryOption} from '../../data/cart.js'
import {getProductId} from '../../data/products.js'//named exports
import { deliveryOptions, getDeliveryOptionId,dayCalculator} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { updateCheckOutHeader } from './checkoutHeader.js';
export function renderOrderSummary(){
let cartHTML='';
let checkOutContainer=document.querySelector('.js-order-summary');

if(cart.length===0){
  cartHTML=`<div class="shop-now-button-container"><button class="button-primary no-item-cart-button js-no-item-cart-button">
            Shop now
          </button></div>`
}
//to generate dynamic products
cart.forEach((cartItem)=>{
  const productId=cartItem.productId;
  //get matching product id
  const matchingProduct=getProductId(productId);
  const selectedOption=cartItem.deliveryOptionId;
  //connection between cart data and the deliveryOptions is deliveryOptionId
  const deliveryOption=getDeliveryOptionId(selectedOption);
 
  let deliverDate=dayCalculator(deliveryOption.deliveryDays);

  cartHTML+=`<div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliverDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.productsFormatedPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input"data-product-id=${matchingProduct.id}></input>
                  <span class="save-quantity-link link-primary"data-product-id=${matchingProduct.id} >
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link "data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>`
})

//put items to page
checkOutContainer.innerHTML=cartHTML;
if(cart.length===0){
   document.querySelector('.js-no-item-cart-button').addEventListener('click',()=>{
    window.location.href='index.html'
})
}
// UPDATE quantity related function
function updateUIValue(productId){
//add start and input for that element
  const container=document.querySelector(`.js-cart-item-container-${productId} `)
/*  container.querySelector('.js-update-quantity-link').classList.remove('is-updating-quantity')
  container.querySelector('.quantity-label').classList.remove('is-updating-quantity')
  container.querySelector('.quantity-input').classList.remove('is-editing-quantity')
  container.querySelector('.save-quantity-link').classList.remove('is-editing-quantity')
*/
  const newQuantity=Number(container.querySelector('.quantity-input').value);

  //edge condition
  if(newQuantity<=0 || newQuantity>=1000){
    alert('Quantity must be at least 1 and less than 1000');
    mvc();
    return;
  }
  container.querySelector('.quantity-label').textContent=newQuantity;

  //update that elements's product quantity
  updateCart(productId,newQuantity);

  //update the header
  //to change the html while updating
   mvc();
}
updateCheckOutHeader()

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const productId = event.target.dataset.productId;
    updateUIValue(productId);
  }
}

//DELIVERY OPTION related functions

function deliveryOptionsHTML(matchingProduct,cartItem){
  let deliveryHTML='';
  deliveryOptions.forEach((deliveryOption)=>{
    const formatedDeliveryDate=dayCalculator(deliveryOption.deliveryDays);
    const priceString=deliveryOption.priceCents===0?'FREE':` ${matchingProduct.productsFormatedPrice()} - `
    const isChecked=deliveryOption.id===cartItem.deliveryOptionId?'checked':'';

    deliveryHTML+=
    `
              <div class="delivery-option js-delivery-option"
              data-product-id=${matchingProduct.id}
              data-delivery-option-id=${deliveryOption.id}>
                  <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${formatedDeliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`
  })
  return deliveryHTML;
}


//*********** Event listners **************
// Select all elements with the class 'js-delete-quantity-link' and add an event listener to each one
document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
  // For each link, add a 'click' event listener
  link.addEventListener('click', () => {
    // Code to execute when the link is clicked goes here
    const productId=link.dataset.productId;

    //to remove that product from cart
    removeFromCart(productId);
    //every element that we get from the dom has remove assosiated with it
    //const containerRemove=document.querySelector(`.js-cart-item-container-${productId}`)
    //  containerRemove.remove();
 mvc();
  });
});

//Select all the elements with the class js-update-quantity-link and add eventlistner
document.querySelectorAll('.js-update-quantity-link')
.forEach((link)=>{
  link.addEventListener(('click'),()=>{
    //Get the product id of that link
    const productId=link.dataset.productId;

    //add start and input for that element
    const container=document.querySelector(`.js-cart-item-container-${productId} `)
    container.querySelector('.save-quantity-link').classList.add('is-editing-quantity')
    container.querySelector('.quantity-input').classList.add('is-editing-quantity')
    container.querySelector('.quantity-label').classList.add('is-updating-quantity')
    link.classList.add('is-updating-quantity')
})
})


document.querySelectorAll('.quantity-input').forEach((input) => {
  input.addEventListener('keydown', handleKeyDown);
});

//Select all the elements with the class save-quantity-link and add eventlistner
document.querySelectorAll('.save-quantity-link')
.forEach((link)=>{
  link.addEventListener(('click'),()=>{
    //Get the product id of that link
    const productId=link.dataset.productId;
    //Updattion of Ui and the value
   updateUIValue(productId)
})
})

//add event listeners to all the option 
document.querySelectorAll('.js-delivery-option')
  .forEach((option)=>{
    option.addEventListener('click',()=>{
      //gets delivery option id from the div of that option dataset variable
      //gets product id from the product to which the option belongs(in html element creation from cart item it gets the additional info about products from product dataset by matching the product id that matched element's product id is passed here)
      const {deliveryOptionId,productId}=option.dataset;
      updateDeliveryOption(deliveryOptionId,productId)
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}

  //update the header
  //to change the html while updating
function mvc(){
  renderOrderSummary();
  updateCheckOutHeader();
  renderPaymentSummary();
}