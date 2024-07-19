import { addToCart } from "../../data/cart.js";
import { updateCartQuantity } from "./amazonHeaderUpdate.js";

export function messageAdded(productId,timerId){
  //to select a item which was added
  const messageAddedToCart=document.querySelector(`.js-added-to-cart-${productId}`)
  clearTimeout(timerId)
  timerId=setTimeout(()=>{
    messageAddedToCart.classList.remove('isVisible');
  },2000)
  messageAddedToCart.classList.add('isVisible');
}
export function addItemToCart(){
   let timerId;
    console.log("Clicked")
    //use button to add item to cart
    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  
      //to identify which element was clicked
      button.addEventListener('click',()=>{
        const {productId}=button.dataset;//destructuring property
    
        //to invoke added message
        messageAdded(productId,timerId)
    
        // Check if the product already exists in the cart by inbuilt find which returns that item if it is found else undifined
        //const productInCart = cart.find(item => item.name === productName);
    //to identify which value was selected in select 
    const selectElement=document.querySelector(`.js-quantity-selector-${productId}`);
    //gives string value by default in DOM  , while adding it concatenates so
    const quantity = parseInt(selectElement.value); //or use Number()
        // a similar implementation of this is using for each loop
        addToCart(productId,quantity);
        updateCartQuantity();
      })
    })
    
  }
