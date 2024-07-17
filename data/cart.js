// export default cart;

//use localStorage
export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))

  //default value
  if(!cart){
    cart=[]
  }
  
}



//save to local storage
function saveToLocalStorage(){
   //adding to local storage
   localStorage.setItem('cart',JSON.stringify(cart)) 
}
//add to cart
export function addToCart(productId,quantity=1){

 let matchingItem;//undifined is not found
   cart.forEach((cartItem)=>{
     if(cartItem.productId===productId)  
       matchingItem=cartItem;
   })
   if(matchingItem)
     matchingItem.quantity+=quantity;
   else
     cart.push({
       productId,//destructuring property
       quantity,
       deliveryOptionId:'1'// default all are set to free delivery
     });
     saveToLocalStorage();
    }
    
    //remove from cart
export function removeFromCart(productId){
      const newCart=[];
      
      //create new cart except the element for which delete is clicked
      cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId)
          newCart.push(cartItem)
        //newCart.push({productId:cartItem.productId,quantity:cartItem.quantity})
      })
      //change the cart
      cart=newCart;
      saveToLocalStorage();
}

//update cart
export function updateCart(productId,quantity){  
  //update the quantity of that item
  cart.forEach((cartItem)=>{
    if(cartItem.productId==productId){
       cartItem.quantity=quantity;
      }
    })
  saveToLocalStorage();
}

export function calculateCartQuantity(){
  let quantity=0;
  cart.forEach((cartItem)=>{
    quantity+=cartItem.quantity;
  })
  if(quantity===0)
    quantity=''
  return quantity;
}

//update delivery option
export function updateDeliveryOption(newOptionId,productId){
  cart.forEach((cartItem)=>{
    if(cartItem.productId==productId)
      cartItem.deliveryOptionId=newOptionId;
  })
  saveToLocalStorage();
}