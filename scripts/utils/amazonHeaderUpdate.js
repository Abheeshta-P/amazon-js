import { calculateCartQuantity } from "../../data/cart.js";

  
  //update cart quantity in image
  export function updateCartQuantity(){
    let quantity=calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerText=quantity;
  }
