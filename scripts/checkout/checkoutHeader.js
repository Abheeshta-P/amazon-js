//since exporting cannot be done inside function

import { calculateCartQuantity } from "../../data/cart.js";

//update checkout header
export function updateCheckOutHeader(){
  const checkOutHeader=document.querySelector('.js-quantity-checkout');
  let quantity=calculateCartQuantity();
  let suffix=(quantity>0)?'items':'';
  checkOutHeader.textContent=`${quantity} ${suffix}`;
}