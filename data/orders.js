import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


export const orders=JSON.parse(localStorage.getItem('orders'))||[]

export function addOrder(order){
  orders.unshift(order)
  saveToStorage()
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders))
}

export function orderTimeCalculator(orderTime) {
  const date = dayjs(orderTime);
  const orderDay = date.date();
  const orderMonth=date.format('MMMM');
  return `${orderMonth} ${orderDay}`;
}

export function orderDayName(orderTime){
  const date = dayjs(orderTime);
  const dayName = date.format('dddd');
  return dayName;
}
export function getOrderObject(orderId){
  let matchingOrder;
  orders.forEach(order => {
    if(order.id==orderId)
      matchingOrder=order;
  });
  return matchingOrder;
}