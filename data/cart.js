// export default cart;
export const cart=[];

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
