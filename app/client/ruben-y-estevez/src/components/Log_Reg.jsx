import React from "react";
import LongIn from "./LongIn";
import Register from "./Register";

const Log_Reg = () => {
	return (
		<div>
			<div className="d-inline-flex p-2 bd-highlight ">
				<div className="card  " style={{ width: "18rem" }}>
					<div className="card-body">
						{/* <h5 className="card-title">info</h5> */}
						<LongIn />
					</div>
				</div>
			</div>

			<div className="d-inline-flex p-2 bd-highlight ">
				<div className="card  " style={{ width: "18rem" }}>
					<div className="card-body">
						{/* <h5 className="card-title">info</h5> */}
						<Register />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Log_Reg;
