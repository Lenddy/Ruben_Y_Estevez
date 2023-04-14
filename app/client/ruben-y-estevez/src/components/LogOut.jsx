import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
	const navigate = useNavigate();

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
	return (
		<div>
			<button onClick={logout} className="btn btn-danger">
				Salir
			</button>
		</div>
	);
};

export default LogOut;
