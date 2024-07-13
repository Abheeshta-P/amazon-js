import { loadProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cartoop.js"
// import "../data/cartclass.js"
/*

model view control : MVC (Design pattern) => These run in loop
Splits code into 3 parts
1. Model : saves and manages data (data folder here with data js files)
2. View : takes data and displays it on page (checkout.js rendering the products)
3. Controller : run some code whhen we interact with the page (Event listeners)

*/
loadProducts(()=>{
  renderOrderSummary()
  renderPaymentSummary()
})
