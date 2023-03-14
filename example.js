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



// const  ZeroPaddedInput=(number)=> {
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















// const countryChanges = {};

// const addCountryChange = (country, ...coins) => {
//     const total = coins.reduce((acc, coin) => acc + coin.value, 0);
//     const changeFunc = amount => {
//         if (!amount) {
//         return {};
//         }
//         const coinCounts = {};
//         if (amount >= total) {
//         coins.forEach(coin => {
//             if (amount >= coin.value) {
//             const coinName = coin.name + (coin.value > 1 ? 's' : '');
//             coinCounts[coinName] = Math.floor(amount / coin.value);
//             amount %= coin.value;
//             }
//         });
//         }
//         return coinCounts;
//     };
//     countryChanges[country] = changeFunc;
// };


// addCountryChange("United States", {name: "quarter", value: 25}, {name: "dime", value: 10}, {name: "nickel", value: 5}, {name: "penny", value: 1});

// addCountryChange("Dominican republic", {name: "quarter", value: 25}, {name: "dime", value: 10}, {name: "nickel", value: 5}, {name: "penny", value: 1});

// console.log(countryChanges["United States"](68)); // { quarter: 2, dime: 1, nickel: 1, penny: 3 }
// console.log(countryChanges["Dominican republic"](35)); // { quarter: 4 }


// addCountryChange("Republica Dominicana",{name:"2000 pesos",value:2000},{name:"1000 pesos",value:1000},{name:"500 pesos",value:500},{name:"200 pesos",value:200},{name:"100 pesos",value:100},{name:"50 pesos",value:50},{name:"25 pesos",value:25},{name:"10 pesos",value:10},{name:"5 pesos",value:5},{name:"1 pesos",value:1})


// // addCountryChange("Republica Dominicana", {name:"2000 pesos",value:2000}, {name:"1000 pesos",value:1000}, {name:"500 pesos",value:500}, {name:"200 pesos",value:200}, {name:"100 pesos",value:100}, {name:"50 pesos",value:50}, {name:"25 pesos",value:25}, {name:"10 pesos",value:10}, {name:"5 pesos",value:5}, {name:"1 pesos",value:1});


// // console.log(countryChanges["Republica Dominicana"](1100))
// // console.log(countryChanges)


// let amount = 2833.25
// let toPay =0
// let sum = 0
// for(let i = 0 ;i <amount;i++ ){
//     if(amount >= 0 ){
//         sum++
//         amount-= 150
//         toPay += 150
//         // amount += 88.5
        

//     }else break
// }
// console.log(sum)
// console.log(amount)
// console.log(toPay)



// let sti:number ="string"
// console.log(sti)
// sti =19
// console.log(sti)





// _id
// 640b7062620abde3fff3c424

// ObjectId
// loanIdNumber
// 1

// Int32
// dateAdded
// 2023-03-10T00:00:00.000+00:00

// Date
// loanAmount
// 8000

// Int32
// interest
// 10

// Int32
// latenessInterest
// 10

// Int32

// totalLatenessPayment
// 0

// Int32
// numberLateness
// 0

// Int32
// cuotasNumber
// 4

// Int32
// timeType
// Mensual

// String

// payments
// Array

// Array

// 0
// Object

// Object
// _id
// 1

// Int32
// interestPayment
// 0

// Int32
// capitalPayment
// 2041.839555018402

// Double
// principalPayment
// 2041.839555018402

// Double
// paymentDate
// 2023/03/09

// String
// balance
// 5958.160444981598

// Double
// isPaid
// false

// Boolean

// 1
// Object

// Object
// _id
// 2

// Int32
// interestPayment
// 0

// Int32
// capitalPayment
// 2041.839555018402

// Double
// principalPayment
// 2041.839555018402

// Double
// paymentDate
// 2023/03/09

// String
// balance
// 3916.3208899631954

// Double
// isPaid
// false

// Boolean

// 2
// Object

// Object
// _id
// 3

// Int32
// interestPayment
// 0

// Int32
// capitalPayment
// 2041.839555018402

// Double
// principalPayment
// 2041.839555018402

// Double
// paymentDate
// 2023/03/09

// String
// balance
// 1874.4813349447934

// Double
// isPaid
// false

// Boolean

// 3
// Object

// Object
// _id
// 4

// Int32
// interestPayment
// 0

// Int32
// capitalPayment
// 2041.839555018402

// Double
// principalPayment
// 2041.839555018402

// Double
// paymentDate
// 2023/03/09

// String
// balance
// -167.35822007360866

// Double
// isPaid
// false

// Boolean
// totalInterest
// 0

// Int32
// totalPrincipal
// 8167.358220073608

// Double
// total
// 8167.358220073608

// Double
// totalPaid
// 0

// Int32

// dates
// Array

// Array
// 0
// 2023/03/09

// String
// 1
// 2023/03/09

// String
// 2
// 2023/03/09

// String
// 3
// 2023/03/09

// String
// loanFullyPaid
// false

// Boolean
// active
// true

// Boolean
// client_id
// 63e8aa670d214ee12995b257

// ObjectId
// createdAt
// 2023-03-10T17:43:22.084+00:00

// Date
// updatedAt
// 2023-03-10T17:43:22.084+00:00

// Date



// function addLatenessAmount(loan, payment) {
//     const latenessInterestRate = loan.latenessInterest / 100;
//     const dueDate = new Date(loan.dateAdded);
//     dueDate.setDate(dueDate.getDate() + loan.cuotasNumber * 30);
//     const paymentDate = new Date(payment.paymentDate);
//     const lateDays = Math.floor((paymentDate - dueDate) / (24 * 60 * 60 * 1000)) - 5;
//     const latenessAmount = Math.max(0, payment.balance * latenessInterestRate * lateDays);
//     payment.balance += latenessAmount;
//     payment.latenessGenerated = Math.max(0, lateDays);
//     loan.totalLatenessPayment += latenessAmount;
//     loan.numberLateness += Math.max(0, lateDays);
//     loan.total += latenessAmount;
//     loan.totalPaid += payment.principalPayment + payment.interestPayment + latenessAmount;
//     loan.payments[payment._id - 1] = payment;
//     loan.dates[payment._id - 1] = payment.paymentDate;
//     loan.loanFullyPaid = loan.total <= 0;
//     return loan;
//   }





/*
the moment the page loads 

you need to go over all the loans 

for each individual loan  you need to go into the payment array 

then you need to check the payment  date of every individual payment 

if the payment date of that payment is == or > than todays date you need to make a api call to upgrade you 3 to four thing 
    1 totalLatenessPayment  // is the total of all the lateness that the client have paid 
        you need to get the current amount totalLatenessPayment + the amount that the payments is late 

    2 numberLateness // you need to update the amount of times the client has been late the dame 

    3 add a lateNess key to the payments array and the amount of lateNess is determine by the percentage of the lateness interest


    you can also add a new key to the payments that show the amount of days that a payments has be late

*/