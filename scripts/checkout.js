import {calculateCartQuantity, cart,removeFromCart, updateCart} from '../data//cart.js'
import {products} from '../data/products.js'
import { formatCurrency } from './utils/money.js';


let cartHTML='';
let checkOutContainer=document.querySelector('.order-summary');

//to generate dynamic products
cart.forEach((cartItem)=>{
  const productId=cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if(product.id==productId)
      matchingProduct=product;
  })
  cartHTML+=`<div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
})

//put items to page
checkOutContainer.innerHTML=cartHTML;

// UPDATE quantity related function
function updateUIValue(productId){
  //add start and input for that element
  const container=document.querySelector(`.js-cart-item-container-${productId} `)
  container.querySelector('.js-update-quantity-link').classList.remove('is-updating-quantity')
  container.querySelector('.quantity-label').classList.remove('is-updating-quantity')
  container.querySelector('.quantity-input').classList.remove('is-editing-quantity')
  container.querySelector('.save-quantity-link').classList.remove('is-editing-quantity')

  const newQuantity=Number(container.querySelector('.quantity-input').value);

  //edge condition
  if(newQuantity<=0 || newQuantity>=1000){
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }
  container.querySelector('.quantity-label').textContent=newQuantity;

  //update that elements's product quantity
  updateCart(productId,newQuantity);

  //update the header
  updateCheckOutHeader();
}

//update checkout header
export function updateCheckOutHeader(){
  const checkOutHeader=document.querySelector('.js-quantity-checkout');
  let quantity=calculateCartQuantity();
  checkOutHeader.textContent=`${quantity}`;
}
updateCheckOutHeader()

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const productId = event.target.dataset.productId;
    updateUIValue(productId);
  }
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
   const containerRemove=document.querySelector(`.js-cart-item-container-${productId}`)
   containerRemove.remove();
   updateCheckOutHeader();
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
    updateUIValue(productId);
})
})

// Day JS : Library (Code wrote by other devs)

//Create a date to deliver and format accordingly
const today=dayjs()
const deliveryDay=today.add(7, 'days')
console.log(deliveryDay.format('dddd, MMMM D')) 