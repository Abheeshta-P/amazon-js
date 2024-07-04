import { formatCurrency } from "../scripts/utils/money.js";

//Test suite
console.log("Money.js Format currency")
//normal
console.log("2095=20.95")
if(formatCurrency(2095)==='20.95') console.log("Passed")
else console.log("Failed")
//edge case
console.log("0=0.00")
if(formatCurrency(0)==='0.00') console.log("Passed")
else console.log("Failed")
console.log("2000.5=20.005==20.01")
if(formatCurrency(2000.5)==='20.01') console.log("Passed")
  else console.log("Failed")
console.log("2000.4=20.00")
if(formatCurrency(2000.4)==='20.00') console.log("Passed")
  else console.log("Failed")