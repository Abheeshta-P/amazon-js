import { getOrderObject, orderDayName, orders, orderTimeCalculator } from "../data/orders.js"
import { fetchProducts, getProductId } from "../data/products.js"
import { updateCartQuantity } from "./utils/amazonHeaderUpdate.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

const url=new URL(window.location.href)
const orderID=url.searchParams.get('orderId')
const productID=url.searchParams.get('productId')

fetchProducts().then(()=>renderTrackingPage()).catch(err=>console.log("Error : "+err))

function renderTrackingPage(){
  updateCartQuantity()
  const orderTracking=document.querySelector('.js-order-tracking')
  const matchingProduct=getProductId(productID)
  const matchingOrderObject=getOrderObject(orderID)
  let matchingProductObject;
  matchingOrderObject.products.forEach(product => {
    if(product.productId===productID){
      matchingProductObject= product
    }
  });
  orderTracking.innerHTML+=`<div class="delivery-date">
          Arriving on ${orderDayName(matchingOrderObject.orderTime)}, ${orderTimeCalculator(matchingOrderObject.orderTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProductObject.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label" data-status="Preparing">
            Preparing
          </div>
          <div class="progress-label" data-status="Shipped">
            Shipped
          </div>
          <div class="progress-label" data-status="Delivered">
            Delivered
          </div>
           </div>
          <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
          `
 calculateTrackingStatusWidth(matchingOrderObject.orderTime,matchingProductObject.estimatedDeliveryTime)

}


function calculateTrackingStatusWidth(orderTime,deliveryTime){
  const now = dayjs(); // Current time
  const orderDate = dayjs(orderTime); // Order time
  const deliveryDate = dayjs(deliveryTime); // Delivery time

  // Calculate the total duration from order to delivery
  const totalDuration = deliveryDate.diff(orderDate, 'millisecond');
  
  // Calculate the elapsed time from order to now
  const elapsedTime = now.diff(orderDate, 'millisecond');
  
  // Calculate the progress percentage
  const progressPercentage = (elapsedTime / totalDuration) * 100;
  document.querySelector('.js-progress-bar').style.width=`${Math.min(progressPercentage, 100)}%`;

  let status;
  if(progressPercentage>=0&&progressPercentage<=49)
    status="Preparing"
  else if(progressPercentage>=50&&progressPercentage<=99)
    status="Shipped"
  else
  status="Delivered"

  //update the current status of text color
  document.querySelector(`[data-status="${status}"]`).classList.add('current-status')
}