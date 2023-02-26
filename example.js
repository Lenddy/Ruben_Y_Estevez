// // const weekly = 7
// // const byWeekly = 15
// // const monthly = 30
// // const repeat = 13

// // const dates =(time,again)=>{
// //     let allDate=[];
// //     let day = 30
// //     let month = 7
// //     let year = 2023
// //     for(let i = again; i > 0 ; i--){
// //         if(time == time){
// //             day += time
// //             if(day > 31){
// //                 day -= 31
// //                 month += 1
// //                 if( month == 13 ){
// //                     month = 1
// //                     year += 1
// //                     allDate.push(`${day}/${month}/${year}`) //date format dd/mm/year
// //                 }else{
// //                     allDate.push(`${day}/${month}/${year}`) //date format dd/mm/year
// //                 }}else{
// //                 allDate.push(`${day}/${month}/${year}`) //date format dd/mm/year
// //                 }
// //             }
// //         }
// //     return allDate
// // }

// // console.log(dates(weekly,repeat))




// // function calculateLoan(principal, rate, term) {
// //     rate = rate / 100 / 52;
// //     let numPayments = term * 52;
// //     let weeklyInterest = principal * rate;
// //     let remainingBalance = principal;
// //     let payment = (principal * rate * Math.pow((1 + rate), numPayments)) / (Math.pow((1 + rate), numPayments) - 1);
// //     for (let i = 0; i < numPayments; i++) {
// //         remainingBalance += weeklyInterest;
// //         remainingBalance -= payment;
// //     }
// //     return payment;
// // }
// // console.log(calculateLoan(20000, 2.5, 13))

// // saber dividir el interes y el capital mientras baja 

// function loanCalculator(amount, interestRate, years, paymentFrequency) {
//     let paymentPerYear;
//     if (paymentFrequency === "weeks") {
//       paymentPerYear = 52;
//     } else if (paymentFrequency === "months") {
//       paymentPerYear = 12;
//     } else if (paymentFrequency === "by-weekly") {
//       paymentPerYear = 26;
//     } else {
//       return "Invalid payment frequency. Please enter either 'weeks', 'months', or 'by-weekly'.";
//     }
  
//     const r = interestRate / 100 / paymentPerYear;
//     const n = paymentPerYear * years;
//     const p = amount * r / (1 - (1 + r) ** (-n));
  
//     const result = [];
//     let balance = amount;
  
//     for (let i = 0; i < n; i++) {
//       const interestPayment = balance * r;
//       const paymentToCapital = p - interestPayment;
//       balance -= paymentToCapital; 
  
//       result.push({
//         paymentNumber: i + 1,
//         steadyPayment: p.toFixed(2),
//         interestPayment: interestPayment.toFixed(2),
//         paymentToCapital: paymentToCapital.toFixed(2),
//         balance: balance.toFixed(2),
//         currency: "DOP",
//         paymentFrequency: paymentFrequency
//       });
//     }
  
//     return result;
//   }
  

//   console.log(loanCalculator(20000,2.5,1,"weeks"))



// let  ZeroPaddedInput=(number)=> {
//   let newNumber = ""
//   if (number < 10) {
//       newNumber = `00${number}`;
//   } else {
//       newNumber = `0${number}`;
//   }
//   return newNumber
//   };

//   console.log(ZeroPaddedInput(10))

// const payments = [
//     {
//       _id: 1,
//       isPaid: true,
//       amount: 1,
//       number: 3
//     },
//     {
//       _id: 2,
//       isPaid: false,
//       amount: 1,
//       number: 4
//     },
//     {
//       _id: 3,
//       isPaid: false,
//       amount: 1,
//       number: 1
//     },
//   ];
  
//   const idThreshold = 2;
  
//   const filteredPayments = payments.filter(p => p._id <= idThreshold && p.isPaid == false);
  
//   // console.log(filteredPayments);

//   let total = 0
//   let totalNumber = 0
//   // for(let i = 0 ; i > payments.length - 1; i++){
//   //   total += payments[i].amount
//   // }
//   // console.log(total)

//   filteredPayments.forEach(item =>{
//     total += item.amount
//     totalNumber += item.number
//   })

//   // const sum = payments.reduce((total,obj)=>{
//   //   return total + obj.amount
//   // },0)

// // console.log(total)
// // console.log(totalNumber)
// // console.log(sum)
// // console.log(parseFloat(1.15))



// const numberWithCommas=(x)=>{
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }


// console.log(numberWithCommas(10000000))















const countryChanges = {};

const addCountryChange = (country, ...coins) => {
    const total = coins.reduce((acc, coin) => acc + coin.value, 0);
    const changeFunc = amount => {
        if (!amount) {
        return {};
        }
        const coinCounts = {};
        if (amount >= total) {
        coins.forEach(coin => {
            if (amount >= coin.value) {
            const coinName = coin.name + (coin.value > 1 ? 's' : '');
            coinCounts[coinName] = Math.floor(amount / coin.value);
            amount %= coin.value;
            }
        });
        }
        return coinCounts;
    };
    countryChanges[country] = changeFunc;
};


addCountryChange("United States", {name: "quarter", value: 25}, {name: "dime", value: 10}, {name: "nickel", value: 5}, {name: "penny", value: 1});

addCountryChange("Dominican republic", {name: "quarter", value: 25}, {name: "dime", value: 10}, {name: "nickel", value: 5}, {name: "penny", value: 1});

console.log(countryChanges["United States"](68)); // { quarter: 2, dime: 1, nickel: 1, penny: 3 }
console.log(countryChanges["Dominican republic"](35)); // { quarter: 4 }


addCountryChange("Republica Dominicana",{name:"2000 pesos",value:2000},{name:"1000 pesos",value:1000},{name:"500 pesos",value:500},{name:"200 pesos",value:200},{name:"100 pesos",value:100},{name:"50 pesos",value:50},{name:"25 pesos",value:25},{name:"10 pesos",value:10},{name:"5 pesos",value:5},{name:"1 pesos",value:1})


// addCountryChange("Republica Dominicana", {name:"2000 pesos",value:2000}, {name:"1000 pesos",value:1000}, {name:"500 pesos",value:500}, {name:"200 pesos",value:200}, {name:"100 pesos",value:100}, {name:"50 pesos",value:50}, {name:"25 pesos",value:25}, {name:"10 pesos",value:10}, {name:"5 pesos",value:5}, {name:"1 pesos",value:1});


// console.log(countryChanges["Republica Dominicana"](1100))
// console.log(countryChanges)