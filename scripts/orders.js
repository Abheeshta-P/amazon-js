import { orders, orderTimeCalculator } from "../data/orders.js";
import { getProductId,fetchProducts} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
fetchProducts().then(()=>generateOrderHTML())

function generateOrderHTML(){
  const orderGrid=document.querySelector('.js-orders-grid')
  // console.log(orders)
  orders.forEach(order => {
    orderGrid.innerHTML+=`
     <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeCalculator(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-grid" data-orderId=${order.id}>
            
          </div>
        </div>
    `
    renderOrders(order)
  })
}
function renderOrders(order){


    let orderDetailsGrid=document.querySelector('.js-order-details-grid')
    order.products.forEach((product)=>{
      const matchingProduct=getProductId(product.productId)
            orderDetailsGrid.innerHTML+=`
           <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${orderTimeCalculator(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
      `
    })
}
