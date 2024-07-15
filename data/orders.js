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

console.log(orderTimeCalculator('2024-07-15T15:43:12.216Z')) 