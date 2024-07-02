import {calculateCartQuantity, cart,removeFromCart, updateCart, updateDeliveryOption} from '../../data/cart.js'
import { getProductId } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

//to calculate total money
let productPriceCents=0;
export function renderPaymentSummary(){
  cart.forEach(cartItem => {
    const matchingProduct=getProductId(cartItem.productId);
    productPriceCents+=cartItem.quantity*matchingProduct.priceCents;
  });
  
  console.log(formatCurrency(productPriceCents))
}

