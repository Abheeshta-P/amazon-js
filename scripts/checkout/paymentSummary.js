import {calculateCartQuantity, cart,removeFromCart, updateCart, updateDeliveryOption} from '../../data/cart.js'
import { deliveryOptions, getDeliveryOptionId } from '../../data/deliveryOptions.js';
import { getProductId } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
  //to calculate money of all product
  let productPriceCents=0;
  //to calculate shipping cost of all products
  let shippingPriceCents=0;
  cart.forEach(cartItem => {
    const matchingProduct=getProductId(cartItem.productId);
    productPriceCents+=cartItem.quantity*matchingProduct.priceCents;
    //delivery option
    const deliveryOption=getDeliveryOptionId(cartItem.deliveryOptionId)
    
     shippingPriceCents+=deliveryOption.priceCents;
  });
  
  const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
  const taxCents=totalBeforeTaxCents*0.1// (totalBeforeTaxCents*10)/100
  const totalCostCents=totalBeforeTaxCents+taxCents;

  let quantity=calculateCartQuantity()
  const paymentSummaryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCostCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  const paymentSummaryContainer=document.querySelector('.js-payment-summary')
  paymentSummaryContainer.innerHTML=paymentSummaryHTML;
}

