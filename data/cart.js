// export default cart;

//use localStorage
export let cart=JSON.parse(localStorage.getItem('cart'))

//default value
if(!cart){
  cart=[{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId:'1'
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }];
}



//save to local storage
function saveToLocalStorage(){
   //adding to local storage
   localStorage.setItem('cart',JSON.stringify(cart)) 
}
//add to cart
export function addToCart(productId){
  //to identify which value was selected in select 
  const selectElement=document.querySelector(`.js-quantity-selector-${productId}`);
  //gives string value by default in DOM  , while adding it concatenates so
  const quantity = parseInt(selectElement.value); //or use Number()

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