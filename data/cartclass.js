class Cart {
  //properties
  cartItems=undefined;
  localStorageName=undefined;

  //methods
    loadFromStorage(){
      this.cartItems=JSON.parse(localStorage.getItem(this.localStorageName))
      if(!this.cartItems){
        this.cartItems=[{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity:2,
          deliveryOptionId:'1'
        },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity:1,
          deliveryOptionId:'2'
        }];
      }
      
    }
    saveToLocalStorage(){
      //adding to local storage
      localStorage.setItem(this.localStorageName,JSON.stringify(this.cartItems)) 
   }
   addToCart(productId,quantity=1){
    let matchingItem;//undifined is not found
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId===productId)  
          matchingItem=cartItem;
      })
      if(matchingItem)
        matchingItem.quantity+=quantity;
      else
        this.cartItems.push({
          productId,//destructuring property
          quantity,
          deliveryOptionId:'1'// default all are set to free delivery
        });
        this.saveToLocalStorage();
       }
  
       removeFromCart(productId){
        const newCart=[];
        
        //create new cart except the element for which delete is clicked
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId!==productId)
            newCart.push(cartItem)
          //newCart.push({productId:cartItem.productId,quantity:cartItem.quantity})
        })
        //change the cart
        this.cartItems=newCart;
        this.saveToLocalStorage();
  }
  updateCart(productId,quantity){  
    //update the quantity of that item
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId==productId){
         cartItem.quantity=quantity;
        }
      })
    this.saveToLocalStorage();
  }
  calculateCartQuantity(){
    let quantity=0;
    this.cartItems.forEach((cartItem)=>{
      quantity+=cartItem.quantity;
    })
    if(quantity===0)
      quantity=''
    return quantity;
  }
  updateDeliveryOption(newOptionId,productId){
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId==productId)
        cartItem.deliveryOptionId=newOptionId;
    })
   this.saveToLocalStorage();
  }
  }
  
  const cart=new Cart();
  cart.localStorageName='cart-oop'
  cart.loadFromStorage()
const buisnessCart=new Cart();
buisnessCart.localStorageName='cart-buisness'
buisnessCart.loadFromStorage();
console.log(cart)
console.log(buisnessCart)
