//Uses normalization of data to avoid redundancy of option choosen
// full dependncy on deliveryOptionId in second normal form

//Esm ecma script module to load external library : Default export with only one function
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

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

// Day JS : Library (Code wrote by other devs)
//Create a date to deliver and format accordingly

// Function to calculate delivery day, skipping weekends
export function dayCalculator(deliveryDays) {
  const today = dayjs();
  let deliveryDay = today.add(deliveryDays, 'day');
  deliveryDay = isWeekend(deliveryDay);
  return deliveryDay.format('dddd, MMMM D');
}

// Function to adjust the delivery day if it falls on a weekend
function isWeekend(deliveryDay) {
  let deliveryFormat = deliveryDay.format('dddd');
  while (deliveryFormat === 'Saturday' || deliveryFormat === 'Sunday') {
    deliveryDay = deliveryDay.add(1, 'day');
    deliveryFormat = deliveryDay.format('dddd');
  }
  return deliveryDay;
}