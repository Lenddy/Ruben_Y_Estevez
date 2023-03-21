// const moment = require("moment");
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
// let dict = {
//  name : "lenddy",
//  lName:  "Morales",
//  age : 19
// }
// let dict2 = {
//  name : "ana",
//  lName:  "estevez",
//  age : 19
// }
// console.table([dict,dict2])

// console.log(13*0.1)

// const lateness2 = async (item) => {
// 	//do nothing if empty
// 	if (!item) {
// 		return;
// 	}

// 	const today = moment(); //todays date
// 	//initialized variables
// 	let paymentDate;
// 	let paymentId;
// 	let loanId;
// 	let latenessPayment;
// 	let daysLate;
// 	let totalLatenessPayment;
// 	let numberLateness;

// 	//first loop through the loans
// 	for (let i = 0; i < item.length; i++) {
// 		loanId = item[i]._id;
// 		latenessPayment = 0;
// 		daysLate = 0;
// 		totalLatenessPayment = 0;
// 		numberLateness = 0;

// 		//second loop through the payments of a loan
// 		for (let n = 0; n < item[i].payments.length; n++) {
// 			//get the payment date of the payment
// 			paymentDate = moment(item[i].payments[n].paymentDate, "YYYY/MM/DD");

// 			//check if the payment date is before todays date
// 			if (paymentDate.isBefore(today)) {
// 				//this is the amount of days that the payment is late
// 				const duration = moment.duration(today.diff(paymentDate));
// 				let daysDifference = Math.abs(duration.asDays());

// 				//todo i think this is not necessary
// 				if (daysDifference > 0) {
// 					// Add one day to payment date for each day late
// 					paymentDate.add(daysDifference, "days");
// 				}

// 				//check if the payment is more than or == 5 days late
// 				if (daysDifference >= 5) {
// 					daysLate += daysDifference;
// 					paymentId = item[i].payments[n]._id;
// 					latenessPayment +=
// 						item[i].payments[n].principalPayment *
// 						(item[i].latenessInterest / 100);
// 					//todo i think this needs to be mode some were else like the while loop
// 					totalLatenessPayment += latenessPayment;
// 					numberLateness++;

// 					// Update principal payment with lateness payment
// 					let updatedPrincipalPayment = (item[i].payments[
// 						n
// 					].principalPayment += latenessPayment);

// 					// Update lateness payment for the loan payment
// 					while (daysDifference >= 5) {
// 						try {
// 							console.log(
// 								`Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days late is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`
// 							);

// 							const response = await axios.put(
// 								`http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`
// 							);

// 							console.log(response.data);
// 						} catch (error) {
// 							console.log(error.response.data);
// 						}
// 						// todo the total lateneess shuld be out side of this loop
// 						// Reduce daysDifference by 5 and increase lateness payment accordingly
// 						daysDifference -= 1;
// 						// latenessPayment =
// 						// 	item[i].payments[n].principalPayment *
// 						// 	(item[i].latenessInterest / 100);

// 						// Add updated lateness payment to the total lateness payment
// 						// totalLatenessPayment += latenessPayment;

// 						// Increase the updated principal payment by the current lateness payment
// 						updatedPrincipalPayment += latenessPayment;
// 					}
// 				}
// 			}
// 		}
// 	}

// 	console.log("Finished updating lateness payments");
// 	return item;
// };

// const lateness = async (item) => {
//     //do nothing if empty
//     if(!item) return;

//     //gets todays date
//     const today = moment();

//     //initialized variables
//     let paymentDate;
//     let paymentId;
//     let loanId;
//     let latenessPayment;
//     let daysLate;
//     let totalLatenessPayment;
//     let numberLateness;

//     //first loop through the loans
//     for(let i = 0; i < item.length; i++){
//         //now the id of the loan = = to the first loan in the array
//         loanId = item[i]._id;
//         //the lateness payment is 0
//         latenessPayment = 0;
//         //the days late is 0
//         daysLate = 0;
//         //the total lateness payment is 0
//         totalLatenessPayment = 0;
//         //the number of lateness is 0
//         numberLateness = 0;

//         //second loop through the payments of a loan
//         for(let n = 0; n < item[i].payments.length; n++){
//             //we get the payment date of the current payment
//             paymentDate = moment(item[i].payments[n].paymentDate, "YYYY/MM/DD");

//             //we check if the due date of the current payment is before todays date
//             if(paymentDate.isBefore(today)){

//             //this is the amount of days that the payment is late
//             const duration = moment.duration(today.diff(paymentDate));
//             let daysDifference = Math.abs(duration.asDays())

//                 //consider later if it is necessary
//             if(daysDifference > 0){
//                 // Add one day to payment date for each day late
//                 paymentDate.add(daysDifference, "days");
//             }

//             //check if the payment is more than or == 5 days late
//             if(daysDifference >= 5){
//                 //we add the days that the payment is late
//                 daysLate += daysDifference;
//                 //we get the id of the current payment
//                 paymentId = item[i].payments[n]._id;
//                 //we get the lateness payment of the current payment
//                 latenessPayment += item[i].payments[n].principalPayment * (item[i].latenessInterest / 100);
//                 //we add the lateness payment to the total lateness payment
//                 totalLatenessPayment += latenessPayment;
//                 //we add one to the number of lateness
//                 numberLateness++;

//                 // Update principal payment with lateness payment
//                 let updatedPrincipalPayment = (item[i].payments[n].principalPayment += latenessPayment);

//                 // Update lateness payment for the loan payment
//                 while(daysDifference >= 5){
//                     try{
//                         console.log(`Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days late is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`);

//                         const response = await axios.put(`http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`);

//                         console.log(response.data);
//                     }catch(error){
//                         console.log(error.response.data);
//                     }

//                     // Reduce daysDifference by 5 and increase lateness payment accordingly
//                     daysDifference -= 1;
//                     // latenessPayment = item[i].payments[n].principalPayment * (item[i].latenessInterest / 100);

//                     // Add updated lateness payment to the total lateness payment
//                     // totalLatenessPayment += latenessPayment;

//                     // Increase the updated principal payment by the current lateness payment
//                     updatedPrincipalPayment += latenessPayment;
//                 }

//             }
//         }

//     }
// }

//i want a function that will go to  every payment that is in a loan
// this function will check if the payment is late// you know the payment is late when you compare todays date wiht the payment date if the diference in days is >= 5
// if the payment is late then you will  add a late ness fee of the late ness interest
//you will have to  calculate the lateness payment   to do this you need to  multiply what the principal payment is  * (the lateness interest/100)
//you will also need a  2 diferent variable one to have the current calculated lateness to be added and one to have the total lateness payment
//then you add the  principal payment + the current lateness payment that you just got
//you repeat this proses until the day s is == to todays date  remember that you add the latenes  if the payment is 5  or more days due
//after the proses of the adding the late nes  you make a api call to add all the values

// {loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}
// const lateness = async (item) => {
// 	if (!item) {
// 		return;
// 	}
// 	//getting todays date
// 	const today = moment();

// 	let paymentDate;
// 	let paymentId;
// 	let loanId; //* have loan id
// 	let latenessPayment;
// 	let daysLate;
// 	let totalLatenessPayment;
// 	let numberLateness;
// 	let currentLatenessPayment;
// 	let updatedPrincipalPayment;

// 	for (let i = 0; i < item.length; i++) {
// 		loanId = item[i]._id; //* have loan id
// 		for (let n = 0; n < item[i].payments.length; n++) {
// 			latenessPayment = 0;
// 			daysLate = 0;
// 			totalLatenessPayment = 0;
// 			numberLateness = item[i].numberLateness;
// 			currentLatenessPayment = 0;
// 			updatedPrincipalPayment = item[i].payments[n].principalPayment;
// 			paymentId = item[i].payments[n]._id; //* got payment id
// 			console.log("this is paymentId", paymentId);

// 			paymentDate = moment(item[i].payments[n].paymentDate, "YYYY/MM/DD");
// 			console.log("this is the paymentDate", paymentDate);

// 			if (paymentDate.isBefore(today)) {
// 				const duration = moment.duration(today.diff(paymentDate));
// 				console.log("this is duration", duration);
// 				let daysDifference = Math.abs(duration.asDays());

// 				// Add one day to payment date for each day late
// 				// paymentDate.add(daysDifference, "days");
// 				// console.log(
// 				// 	"this is paymentDate after adding days",
// 				// 	paymentDate
// 				// );

// 				if (daysDifference >= 5) {
// 					daysLate = daysDifference;
// 					console.log("this is daysLate", daysLate);
// 					for (
// 						let z = Math.floor(daysDifference - 5);
// 						z < daysDifference;
// 						z++
// 					) {
// 						currentLatenessPayment =
// 							item[i].payments[n].principalPayment *
// 							(item[i].latenessInterest / 100);
// 						latenessPayment += currentLatenessPayment;
// 						updatedPrincipalPayment += currentLatenessPayment;
// 					}

// 					// Update principal payment with lateness payment
// 					console.log(
// 						"this is updatedPrincipalPayment",
// 						updatedPrincipalPayment
// 					);

// 					totalLatenessPayment += latenessPayment;
// 					numberLateness++;

// 					// Update lateness payment for the loan payment
// 					try {
// 						console.log(
// 							`Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days late is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`
// 						);

// 						const response = await axios.put(
// 							`http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`
// 						);

// 						console.log(response.data);
// 					} catch (error) {
// 						console.log(error.response.data);
// 					}

// 					// Reduce daysDifference by 5 and increase lateness payment accordingly
// 					daysDifference -= 1;
// 					// latenessPayment =
// 					// 	item[i].payments[n].principalPayment *
// 					// 	(item[i].latenessInterest / 100);

// 					// Add updated lateness payment to the total lateness payment
// 					// totalLatenessPayment += latenessPayment;

// 					// Increase the updated principal payment by the current lateness payment
// 					updatedPrincipalPayment += latenessPayment;
// 				}
// 			}
// 		}
// 	}
// };

// const loans = {
// 	results: {
// 		_id: "640ea7fd8e90ac4c4e7332de",
// 		loanIdNumber: 1,
// 		dateAdded: "2023-03-13T00:00:00.000Z",
// 		loanAmount: 1000,
// 		interest: 10,
// 		latenessInterest: 10,
// 		totalLatenessPayment: 0,
// 		numberLateness: 0,
// 		cuotasNumber: 5,
// 		timeType: "Mensual",
// 		payments: [
// 			{
// 				_id: 1,
// 				interestPayment: 18.181818181818183,
// 				capitalPayment: 186.84584366870783,
// 				principalPayment: null,
// 				paymentDate: "2023/03/3",
// 				balance: 794.972338149474,
// 				isPaid: false,
// 				daysLate: 0,
// 				latenessPayment: 0,
// 			},
// 			{
// 				_id: 2,
// 				interestPayment: 14.45404251180862,
// 				capitalPayment: 190.5736193387174,
// 				principalPayment: 205.02766185052602,
// 				paymentDate: "2023/04/3",
// 				balance: 589.944676298948,
// 				isPaid: false,
// 				daysLate: 0,
// 				latenessPayment: 0,
// 			},
// 			{
// 				_id: 3,
// 				interestPayment: 10.726266841799056,
// 				capitalPayment: 194.30139500872696,
// 				principalPayment: 205.02766185052602,
// 				paymentDate: "2023/05/3",
// 				balance: 384.91701444842204,
// 				isPaid: false,
// 				daysLate: 0,
// 				latenessPayment: 0,
// 			},
// 			{
// 				_id: 4,
// 				interestPayment: 6.998491171789492,
// 				capitalPayment: 198.02917067873653,
// 				principalPayment: 205.02766185052602,
// 				paymentDate: "2023/06/3",
// 				balance: 179.88935259789602,
// 				isPaid: false,
// 				daysLate: 0,
// 				latenessPayment: 0,
// 			},
// 			{
// 				_id: 5,
// 				interestPayment: 3.2707155017799283,
// 				capitalPayment: 201.75694634874608,
// 				principalPayment: 205.02766185052602,
// 				paymentDate: "2023/07/3",
// 				balance: -25.138309252629995,
// 				isPaid: false,
// 				daysLate: 0,
// 				latenessPayment: 0,
// 			},
// 		],
// 		totalInterest: 53.63133420899528,
// 		totalPrincipal: 1025.13830925263,
// 		total: 1025.13830925263,
// 		totalPaid: 0,
// 		dates: [
// 			"2023/03/27",
// 			"2023/04/11",
// 			"2023/04/26",
// 			"2023/05/11",
// 			"2023/05/26",
// 		],
// 		loanFullyPaid: false,
// 		active: true,
// 		client_id: "63df15c5c64ca24b926c4caf",
// 		createdAt: "2023-03-13T04:35:09.488Z",
// 		updatedAt: "2023-03-16T17:58:24.696Z",
// 		__v: 0,
// 	},
// };
// console.log(lateness(loans));
