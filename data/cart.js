// export default cart;
export let cart=[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1
}];

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
       quantity
     });
}

//remove from cart
export function removeFromCart(productId){
  const newCart=[];
  
   //create new cart except the element for whic delete is clicked
   cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId)
      newCart.push(cartItem)
      //newCart.push({productId:cartItem.productId,quantity:cartItem.quantity})
   })
   //change the cart
   cart=newCart;
   console.log(cart)
}