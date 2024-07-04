import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useLocalStroage from "../utils/localstroage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
	const token = useLocalStroage();
	const nevigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		nevigate("/login");
		alert("Logged out successfully!");
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					URL Shortner
				</Typography>
				{token && (
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				)}
				{!token && (
					<Button color="inherit" component={Link} to="/login">
						Login
					</Button>
				)}
				{!token && (
					<Button color="inherit" component={Link} to="/">
						Signup
					</Button>
				)}
				{token && (
					<Button color="inherit" component={Link} to="/analytics">
						View Analytics
					</Button>
				)}
				{token && (
					<Button color="inherit" component={Link} to="/url_shortner">
						URL Shortner
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
