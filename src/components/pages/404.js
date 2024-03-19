import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
	return (
		<div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "30px" }}>
			<h1>Page doesn`t exist</h1>
			<ErrorMessage />
			<button
				style={{ display: "block", padding: "15px 50px", fontSize: "20px", borderRadius: "5px", border: "none", color: "#fff", backgroundColor: "#777", cursor: "pointer" }}>
				<Link to=".."> Home Page </Link>
			</button>
		</div>
	)
}

export default Page404;