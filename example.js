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



let  ZeroPaddedInput=(number)=> {
  let newNumber = ""
  if (number < 10) {
      newNumber = `00${number}`;
  } else {
      newNumber = `0${number}`;
  }
  return newNumber
  };

  console.log(ZeroPaddedInput(10))