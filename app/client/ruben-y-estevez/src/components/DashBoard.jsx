import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import axios from "axios";
import moment from "moment";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import AllLoans from "./loans/AllLoans";

const DashBoard = (props) => {
	const [user, setUser] = useState({});
	const [person, setPerson] = useState([]);
	const [search, setSearch] = useState("");
	const [tab, setTab] = useState("1");
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

	const tabChange = (e, newVal) => {
		setTab(newVal);
	};

	return (
		<div>
			<h1>
				{" "}
				put welcome (name) Today is (date and time) and make it in line
				element
			</h1>
			<TabContext value={tab}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList
						arial-label="tabs example"
						onChange={tabChange}
						centered
					>
						<Tab
							label="Clientes"
							value="1"
							icon={<PersonIcon />}
							iconPosition="start"
						/>
						<Tab label="casi viene" value="2" />
						<Tab label="casi viene" value="3" disabled />
					</TabList>
				</Box>
				<TabPanel value="1">
					<p>
						try to use the npm install react-swipeable-views latter
						to allow a swipe animation on the tabs
					</p>
					<p className="text-primary">
						{" "}
						add a field or sub field with then loan request form{" "}
					</p>
					<Link to="/nuevo/cliente">
						<button className=" btn btn-secondary text-white">
							agregar cliente
						</button>{" "}
					</Link>
					<button className="btn btn-warning" onClick={logout}>
						{" "}
						salir{" "}
					</button>
					<div>
						<h1>todas los clientes</h1>
						<div>
							<p className="text-warning">
								search client: by(add later) :
								<input
									type="text"
									onChange={(e) => setSearch(e.target.value)}
									placeholder="search..."
								/>
							</p>
						</div>
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
							person
								.filter((p, idx) =>
									p.fullName
										.toLowerCase()
										.includes(search.toLowerCase())
								)
								.map((p, idx) => {
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
														{p.fullName}
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
				</TabPanel>
				<TabPanel value="2">
					<AllLoans />
				</TabPanel>
				<TabPanel value="3">casi viene</TabPanel>
			</TabContext>
		</div>
	);

	// <SwipeableViews
	//     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
	//     index={value}
	//     onChangeIndex={handleChangeIndex}
	//   ></SwipeableViews>
};

export default DashBoard;
