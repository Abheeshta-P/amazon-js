//Uses normalization of data to avoid redundancy of option choosen
// full dependncy on deliveryOptionId in second normal form

export const deliveryOptions=[{
  id:'1',
  deliveryDays:7,
  priceCents:0
},{
  id:'2',
  deliveryDays:3,
  priceCents:499
},
{
  id:'3',
  deliveryDays:1,
  priceCents:999
}]

export function getDeliveryOptionId(selectedOption){
  let deliveryOption;
  //connection between cart data and the deliveryOptions is deliveryOptionId
  deliveryOptions.forEach((option)=>{
    if(selectedOption===option.id){
      deliveryOption=option;
    }
  })
  return deliveryOption||deliveryOptions[0];//deaflt if we wont find
}