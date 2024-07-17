import {calculateCartQuantity, cart} from '../../data/cart.js'
import {  getDeliveryOptionId } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';
import { getProductId } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
  console.log(cart)
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

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
  `;

  const paymentSummaryContainer=document.querySelector('.js-payment-summary')
  paymentSummaryContainer.innerHTML=paymentSummaryHTML;

  const placeOrder=document.querySelector('.js-place-order-button')
  placeOrder.addEventListener('click',async()=>{
if(calculateCartQuantity()==0) return;
    try{
      const response=await fetch('https://supersimplebackend.dev/orders',{
        //what type of method
        method:'POST',
        //what type of content
        headers:{
          'Content-Type':'application/json'
        },
        //actual content being sent (here json so stringify)
        body:JSON.stringify({
          //in documentation the required key for placing order is cart so make it a key with actual cart as value
          cart:cart
        })
      })
      console.log(response)
      const responseJsonOrder=await response.json()
      addOrder(responseJsonOrder)
      localStorage.removeItem('cart')
      console.log(responseJsonOrder)
      window.location.href='orders.html'
    }catch(err){
      console.log("Unexpected error try later"+err)
    }
    
  })
}



