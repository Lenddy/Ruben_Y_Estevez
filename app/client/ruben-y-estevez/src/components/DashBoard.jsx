import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import axios from "axios";
import moment from "moment";

const DashBoard = (props) => {
	const [user, setUser] = useState({});
	const [person, setPerson] = useState([]);
	const [loan, setLoan] = useState([]);
	const navigate = useNavigate();

	let interest = (15000 * (14 * 0.01)) / 13;
	let total = 15000 / 13 + interest;

	const onload = () => {
		axios
			.get("http://localhost:8000/api/People", { withCredentials: true }) //
			.then((res) => {
				console.log("this is the result", res);
				setPerson(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/User/loggedUser", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.result) {
					setUser(res.data.result);
				}
			})
			.catch((err) => {
				console.log("error", err);
				navigate("/");
			});
	}, []);

	const logout = () => {
		axios
			.get("http://localhost:8000/api/User/logout", {
				withCredentials: true,
			})
			.then((res) => {
				navigate("/");
			})
			.catch((err) => {
				console.log("error", err);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/People", { withCredentials: true }) //
			.then((res) => {
				console.log("this is the result", res);
				setPerson(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []); //when i put the state person it keep re rendering

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
			for (let n = 0; n < item[i].payments.length; n++) {
				latenessPayment = 0;
				daysLate = 0;
				totalLatenessPayment = 0;
				numberLateness = item[i].numberLateness;
				currentLatenessPayment = 0;
				updatedPrincipalPayment = item[i].payments[n].principalPayment;
				paymentId = item[i].payments[n]._id; //* got payment id
				console.log("this is paymentId", paymentId);

				paymentDate = moment(
					item[i].payments[n].paymentDate,
					"YYYY/MM/DD"
				);
				console.log("this is the paymentDate", paymentDate);

				if (paymentDate.isBefore(today)) {
					const duration = moment.duration(today.diff(paymentDate));
					console.log("this is duration", duration);
					let daysDifference = Math.abs(duration.asDays());

					//dont know if you still want that
					// Add one day to payment date for each day late
					// paymentDate.add(daysDifference, "days");
					// console.log(
					// 	"this is paymentDate after adding days",
					// 	paymentDate
					// );
					//this is fix compare the days diference with the late nes days in the data ba if the days are the same run the code below else do no nothin or breate aout of the curent iteration maybe use continue

					if (
						Math.floor(daysDifference) ===
						item[i].payments[n].daysLate
					) {
						continue;
					}

					if (daysDifference >= 5) {
						daysLate = daysDifference;
						numberLateness += 1;
						console.log("this is daysLate", daysLate);
						for (let z = Math.floor(daysDifference); z >= 5; z--) {
							currentLatenessPayment =
								item[i].payments[n].principalPayment *
								(item[i].latenessInterest / 100);
							latenessPayment += currentLatenessPayment;
							updatedPrincipalPayment += currentLatenessPayment;
						}

						// Update principal payment with lateness payment
						console.log(
							"this is updatedPrincipalPayment",
							updatedPrincipalPayment
						);

						totalLatenessPayment += latenessPayment;

						// Update lateness payment for the loan payment
						try {
							console.log(
								`Updating lateness payment for loan ${loanId} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days late is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`
							);

							const response = await axios.put(
								`http://localhost:8000/api/Loan/update/Lateness/${loanId}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`
							);

							console.log(response.data);
						} catch (error) {
							console.log(error.response.data);
						}
					}
				}
			}
		}
	};

	// const lateness = async (item) => {
	//     try {
	//       if (!item) {
	//         return;
	//       }
	//       const today = moment();
	//       let paymentDate, paymentId, loanId, latenessPayment, daysLate, totalLatenessPayment, numberLateness, currentLatenessPayment, updatedPrincipalPayment;
	//       item.forEach(({_id, payments, numberLateness, latenessInterest}) => {
	//         payments.forEach(({_id: paymentId, paymentDate, principalPayment}) => {
	//           latenessPayment = 0;
	//           daysLate = 0;
	//           totalLatenessPayment = 0;
	//           currentLatenessPayment = 0;
	//           updatedPrincipalPayment = principalPayment;
	//           const paymentDateMoment = moment(paymentDate, "YYYY/MM/DD");
	//           if (paymentDateMoment.isBefore(today)) {
	//             const duration = moment.duration(today.diff(paymentDateMoment));
	//             const daysDifference = Math.abs(duration.asDays());
	//             paymentDateMoment.add(daysDifference, "days");
	//             if (daysDifference >= 5) {
	//               daysLate = daysDifference;
	//               numberLateness += 1;
	//               for (let z = Math.floor(daysDifference); z > 5; z--) {
	//                 currentLatenessPayment = principalPayment * (latenessInterest / 100);
	//                 latenessPayment += currentLatenessPayment;
	//                 updatedPrincipalPayment += currentLatenessPayment;
	//               }
	//               totalLatenessPayment += latenessPayment;
	//               console.log(`Updating lateness payment for loan ${_id} with payment ID ${paymentId}: lateness payment is ${latenessPayment}, days late is ${daysLate}, total lateness payment is ${totalLatenessPayment}, number of days late is ${daysDifference}`);
	//               const response = await axios.put(`http://localhost:8000/api/Loan/update/Lateness/${_id}/${paymentId}/${latenessPayment}/${updatedPrincipalPayment}/${daysLate}/${totalLatenessPayment}/${numberLateness}`);
	//               console.log(response.data);
	//             }
	//           }
	//         });
	//       });
	//     } catch (error) {
	//       console.log(error.response.data);
	//     }
	//   };

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/Loan")
			.then((res) => {
				console.log("this is the result of the loas", res);
				setLoan(res.data.results);
			})
			.catch((err) => {
				console.log("error:", err);
			});
	}, []);

	// console.log(lateness(loan))

	console.log("this is the lateness function ", lateness(loan));

	return (
		<div>
			<h1>
				make all this information into tabs when you learn material ui
			</h1>
			<p className="text-primary">
				{" "}
				add a field or sub field with then loan request form{" "}
			</p>
			<Link to="/nuevo/cliente">
				<button className=" btn btn-secondary text-white">
					agregar cliente
				</button>{" "}
			</Link>
			<Link to="/Prestamos">
				<button className=" btn btn-secondary text-white">
					Prestamos
				</button>{" "}
			</Link>
			<h1>hola {user.nombre} ya iniciaste sesión</h1>
			<button className="btn btn-warning" onClick={logout}>
				{" "}
				salir{" "}
			</button>
			<div>
				<h1>todas los clientes</h1>
				{person.length === 0 ? (
					<div>
						{" "}
						<p className="text-danger">
							{" "}
							no hay clientes todavía agrega uno nuevo
						</p>
						<Link to="/nuevo/cliente">
							<button className=" btn btn-secondary text-white">
								agregar nuevo cliente
							</button>{" "}
						</Link>
					</div>
				) : (
					person.map((p, idx) => {
						return (
							<div
								className="d-inline-flex p-2 bd-highlight "
								key={p._id}
							>
								<div
									className="card  "
									style={{ width: "18rem" }}
								>
									<img
										className="card-img-top "
										src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI="
										alt="client"
									/>
									<div className="card-body">
										<h5 className="card-title">
											{p.name} {p.Lname}
										</h5>
										<p>
											{p.idType}: {p.idNum}
										</p>
										<p>Teléfono: {p.pNumber}</p>
										<div>
											<hr />
											<Link
												to={`/${p._id}`}
												className="btn btn-success card-text"
											>
												ver
											</Link>
											|
											<Link
												to={`/editar/cliente/${p._id}`}
												className="btn btn-primary"
											>
												Editar Cliente
											</Link>
											|
											<ConfirmDelete
												id={p._id}
												reload={onload}
												name={p.name}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default DashBoard;
