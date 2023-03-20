import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const LongIn = () => {
	const [formInfo, setFormInfo] = useState({});
	const [usuarios, setUsuarios] = useState([]);
	const [formErr, setFormErr] = useState({});
	const [show, setShow] = useState("password");
	const [loan, setLoan] = useState([]);
	const navigate = useNavigate();

	const changeHandler = (e) => {
		setFormInfo({
			...formInfo,
			[e.target.name]: e.target.value,
		});
	};

	const showHandler = (e) => {
		if (e.target.checked) {
			setShow("text");
		} else {
			setShow("password");
		}
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/User`, { withCredentials: true })
			.then((res) => {
				// console.log(res);
				setUsuarios(res.data.results);
			});
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/User/Login", formInfo, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				if (res.data?.err) {
					setFormErr(res.data.err);
				} else {
					setFormErr(null);
					navigate("/DashBoard");
				}
			})
			.catch((err) => console.log(err));
	};

	/*
todo
things to fix
1. the lateness interest is not being calculated correctly
2. the lateness to pay is not going up every time the function is called ( it stays the same and it should be increasing by the lateness interest every day after 5 days)
3. the day keeps increasint every time the function is call you  to fine a way  to put todays date and keep track of  todays date an previous dates so that the days late in the payment is not updated all the time 
4. dont know if it works but fine out if the number late neness is being updated correctly
5 if the loan is active  the function should run for that loan 
6 fine ount what the fuck is happenin with the dates in the add dates 

! you can use  1.1 to ad a 10 persent lateness interest to the loan
! how bout you use the lateness interest and  use it her for example if the lateness interest is 20 persent then you can use 20/100 to get 0.2 and then you can use 0.2 to multiply the principal payment to get the lateness payment
 */

	//try4
	//todo tings to do  fix number late and the total latenes payment  i think that they are no grabing the numbers that they already have so try loking into that
	const lateness = async (item) => {
		if (!item) {
			console.log("there is no loan here");
			return;
		}
		//getting todays date
		const today = moment();

		let paymentDate;
		let paymentId;
		let loanId; //* have loan id
		let latenessPayment;
		let daysLate;
		let totalLatenessPayment;
		let numberLateness;
		let currentLatenessPayment;
		let updatedPrincipalPayment;

		for (let i = 0; i < item.length; i++) {
			loanId = item[i]._id; //* have loan id
			numberLateness = item[i].numberLateness; //* total of late cuotas
			totalLatenessPayment = 0; //
			for (let n = 0; n < item[i].payments.length; n++) {
				latenessPayment = 0;
				daysLate = 0;
				currentLatenessPayment = 0;
				updatedPrincipalPayment = item[i].payments[n].principalPayment;
				paymentId = item[i].payments[n]._id; //* got payment id
				//!log console.log("this is paymentId", paymentId);

				paymentDate = moment(
					item[i].payments[n].paymentDate,
					"YYYY/MM/DD"
				);
				//!log console.log("this is the paymentDate", paymentDate);

				if (paymentDate.isBefore(today)) {
					const duration = moment.duration(today.diff(paymentDate));
					//!log console.log("this is duration", duration);
					let daysDifference = Math.abs(duration.asDays());
					daysLate = daysDifference;

					//dont know if you still want that
					// Add one day to payment date for each day late
					// paymentDate.add(daysDifference, "days");
					// console.log(
					// 	"this is paymentDate after adding days",
					// 	paymentDate
					// );
					//this is fix compare the days diference with the late nes days in the data ba if the days are the same run the code below else do no nothin or breate aout of the curent iteration maybe use continue

					if (
						Math.floor(daysDifference) <=
						item[i].payments[n].daysLate
					) {
						continue;
					}

					if (daysDifference >= 5) {
						numberLateness += 1;
						//!log console.log("this is daysLate", daysLate);
						for (let z = Math.floor(daysDifference); z >= 5; z--) {
							currentLatenessPayment =
								item[i].payments[n].principalPayment *
								(item[i].latenessInterest / 100);
							latenessPayment += currentLatenessPayment;
							updatedPrincipalPayment += currentLatenessPayment;
						}

						// Update principal payment with lateness payment
						//!log console.log("this is updatedPrincipalPayment",updatedPrincipalPayment);

						totalLatenessPayment += latenessPayment;

						// Update lateness payment for the loan payment
						try {
							//!log  console.log(`Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days llate is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`);

							const response = await axios.put(
								`http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`
							);

							//!log console.log(response.data);
						} catch (error) {
							console.log(error.response.data);
						}
					}
				}
			}
		}
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/Loan")
			.then((res) => {
				// console.log("this is the result of the loas", res);
				setLoan(res.data.results);
			})
			.catch((err) => {
				console.log("error:", err);
			});
	}, []);

	// console.log(lateness(loan))

	console.log("this is the lateness function ", lateness(loan));
	lateness(loan);

	return (
		<div>
			<h1 className="text-danger">
				{" "}
				you might want to change the input type to the time of repayment
				on the back end for the loans set it to numbers{" "}
			</h1>
			<h1>Iniciar sesión</h1>
			<Link to="/registrarse">
				<button className=" btn btn-secondary text-white">
					nueva cuenta
				</button>{" "}
			</Link>
			<form className="form-group " onSubmit={submitHandler}>
				<div>
					<label htmlFor="">Usuario </label>
					<select
						name="nombreDeUsuario"
						className="form-control"
						onChange={changeHandler}
					>
						<option value="" selected={true} disabled="disabled">
							seleccionar usuario
						</option>
						{usuarios.map((u) => {
							return (
								<option value={u.nombreDeUsuario} key={u._id}>
									{" "}
									{u.nombreDeUsuario}
								</option>
							);
						})}
					</select>
				</div>

				<div>
					<label htmlFor="">contraseña</label>
					<input
						type={show}
						name="contraseña"
						className="form-control"
						onChange={changeHandler}
					/>
					{formInfo.contraseña?.length > 0 &&
					formInfo.contraseña?.length < 3 ? (
						<p style={{ color: "red" }}>
							contraseña debe de ser por lo menos 3 caracteres
						</p>
					) : formErr.nombreDeUsuario ? (
						<p className="text-danger">
							{formErr.nombreDeUsuario?.msg}
						</p>
					) : formErr.contraseña ? (
						<p className="text-danger">{formErr.contraseña?.msg}</p>
					) : null}
				</div>
				<div>
					<label htmlFor="">mostrar contraseña</label>
					<input
						type="checkbox"
						name="checkbox"
						onChange={(e) => showHandler(e)}
					/>{" "}
					{/*make it that when this is check that the type changes from password to text */}
				</div>
				<button className="btn btn-success mt-3">
					{" "}
					iniciar session
				</button>
			</form>
			<div>
				{" "}
				make a clock that show the curent day of the week the day the
				month the year and the time dinamicaly use this function as
				reference var datetime = null, date = null;
				{/* var update = function () {
                            date = moment(new Date())
                            datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
                        };

                        $(document).ready(function(){
                            datetime = $('#datetime')
                            update();
                            setInterval(update, 1000);
                        }); */}
			</div>
			<div className="text-success">
				<h3>
					to enable dark mode uncomment the first line from index.css
					file
				</h3>
			</div>
			<div>
				<p className="text-danger">
					idea came into my head to have a flag(boolean) tha sets the
					a loan to true(or false when tey are done because the loan
					wont be true or false because i was never created) when is
					active but set to false when the las payment(cuota) is payed
					and while this boolean is true trow a erro message that does
					not alow one(OR SAYS THE WHILE THEY HAVE AT LEAST ONE CUOTA
					UN PAYED IN THEIR LAST(CURRENT LOAN) THEY ARE NOT ALOW TO
					HAVE MORE LOANS ) ALSO FIGRE OUT THE BLACK LISTING WITH A
					BOOLEAN()/ ALSO TALK WITH THE PEOPLE ABOUT A FEATURE THAT IF
					THEY ARE IN A GREEN LIST( ORE TRUSTED LIST ) THEY ARE ALOW
					TO HAVE ONE FEATURE (LIKE PAY LEST MONEY OR SOMETHING LIKE
					THAT ){" "}
				</p>
			</div>
			todo is hidden remember
			<div>
				<li>
					make use of the is active to make loan that will activate
					when a date is hit
				</li>
				<h1>todo list</h1>
				contenteditable="true" allow you do edit text that is not on a
				input tag
				<ol>
					<li contenteditable="true">
						use regex for the phone numbers
					</li>
					<li>
						make the app to be able to support companies == new db =
						companies will have their name , email , phone number ,
						and address and socials if they want and a description
						,: and use that info on the print component
					</li>
					<li>
						learn how to transfer messages and audio files from
						WhatsApp to this system/webpage
					</li>
					<li>make a calculator on the payment page</li>
					<li>
						learn how to make a drop down menu select multiple
						inputs (example) if a person selects a field that is not
						the first one then input that was selected is selected
						and aso the previous inputs before that ar also selected
						(idea) if more that oen input is selected make all the
						other inputs in to an array([]) and loop on that array
						to calculate the total amount( also use for the
						calculator later on){" "}
					</li>
					<li>add a way to store data locally</li>
					<li>
						genera info about the company(mission, vision , values)
					</li>
					<li>
						add sorting to the website (using useLocalStorage
						method)
					</li>
					<li>
						add socket.io (also add a messaging system) one to many
						tables perhaps
					</li>
					<li>
						{" "}
						how to add things to excel using react(data credit) also
						one that allow you to print(not needed)
					</li>
					<li>add a calculator(maybe us an api)</li>
					<li>add the loan(loans table ) and the rentals table</li>
					<li>add how to look by specific things</li>
					<li>
						how to recover deleted things (loans(person),rentals,){" "}
					</li>
					<li>
						se how many loans have taken or have had in past and the
						time that loan was set(payed back){" "}
					</li>
					<li>
						maybe how to render the page on the persons chose
						language(not needed){" "}
					</li>
					<li>
						{" "}
						add to be able to add documents to every individual
						(loaned, rental)
					</li>
					<li>
						how to calculate the amount of payments that a person
						need to make all round (and the day of those payments){" "}
					</li>
					<li>history of payments</li>
					<li>
						add a chart on that show how much mony is coming and out
						and how much interest is coming in{" "}
					</li>
					<li> to be able to make bonus to you payments </li>
					<li>
						{" "}
						make customs components alerts (go watch the video about
						custom alerts in your YouTube )
					</li>
					<li>
						come see this div to dynamically render the React
						component language
						{/* import React, { useState, useEffect } from 'react';

                    const App = () => {
                    const [language, setLanguage] = useState('en');

                 useEffect(() => {
            const deviceLanguage =
                    (navigator.language || navigator.userLanguage).slice(0, 2);
                    setLanguage(deviceLanguage);
                    }, []);

                     return <div>{language}</div>;
                    };

export default App;*/}
					</li>
					<li>write a better spellcheck app</li>
					<li>learn how to build blockchain application</li>
				</ol>
			</div>
		</div>
	);
};

export default LongIn;

/* for the loans you need 

before you create a loan fine a way that the workers can preview
so they can tell the clientes the total amount that they need to pay
the interés they will need to pay back
the days that they need to pay  and they amount that they need to pay that day 


adn add places where they need to sign both the client and then worker


1 id for the loan
    fine a way to make the id     maybe set a state that will go up and attach the current number  to one specific loan 

2 the name of the client

3 date of the loan 
    1 from this you need to make function that will alow the workers to update loans 
    2 see the  total amount that the person needs to pay 
    3 see  the amount that they need to pay the day that they are suppose to 
    4 if they dont pay they will hav to pay a lateness  fee and that late ness comes 5 days after the current cuota is not payed
    5 a way that the clients can add bonuses to the current cuota instead of the full cuota 
    6 a history of payment and that has the day they pay ,the amount and the cuota/s number
        1 this must have the amount of total full cuotas that are payed
        2 total amount that has been payed at the time
        3 total capital that has been payed 
        4 and the total capital that has been payed

4 amount of the loan

5 inters rate

6 then amount of cuotas

7 repayment period 
    1 monthly
    2 every 15 days
    3 weekly
*/
