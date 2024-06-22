let productHTML=``;
products.forEach((product)=>{
       productHTML+=
        ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class=js-quantity-selector-${product.id}>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
        //used kaebab case data-product-id
})

document.querySelector('.js-products-grid').innerHTML=productHTML;

//use button to add item to cart
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{

  //to identify which element was clicked
  button.addEventListener('click',()=>{
    const productId=button.dataset.productId;

    //to identify which value was selected in select 
    const selectElement=document.querySelector(`.js-quantity-selector-${productId}`);
    //gives string value by default in DOM  , while adding it concatenates so
    const selectedValue = parseInt(selectElement.value); //or use Number()

    // Check if the product already exists in the cart by inbuilt find which returns that item if it is found else undifined
    //const productInCart = cart.find(item => item.name === productName);

    // a similar implementation of this is using for each loop
    let matchingItem;//undifined is not found
    cart.forEach((item)=>{
      if(item.id===productId)  
        matchingItem=item;
    })
    if(matchingItem)
      matchingItem.quantity+=selectedValue;
    else
      cart.push({
        id: productId,
        quantity: selectedValue
      });
    console.log(cart)
    updateCartQuantity();
  })
})


//update cart quantity in image
function updateCartQuantity(){
  let quantity=0;
  cart.forEach((item)=>{
    quantity+=item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML=quantity;
}