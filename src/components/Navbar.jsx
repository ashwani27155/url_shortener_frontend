import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalStorage from "../utils/localstroage";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [token, setToken] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchToken = async () => {
			const token = await LocalStorage();
			setToken(token);
		};

		fetchToken();
	}, [token]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
		window.location.reload();
		alert("Logged out successfully!");
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					URL Shortener
				</Typography>

				{token && (
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				)}
				{token && (
					<Button color="inherit" component={Link} to="/analytics">
						View Analytics
					</Button>
				)}
				{token && (
					<Button color="inherit" component={Link} to="/url_shortner">
						URL Shortener
					</Button>
				)}

				{!token && (
					<Button color="inherit" component={Link} to="/login">
						Login
					</Button>
				)}
				{!token && (
					<Button color="inherit" component={Link} to="/signup">
						Signup
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
