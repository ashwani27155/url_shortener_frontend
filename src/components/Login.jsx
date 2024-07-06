import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../utils/axios.config";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const nevigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		axiosConfig
			.post("/api/v1/auth/signin", formData)
			.then((response) => {
				if (response.status === 200) {
					const token = response.data.accessToken;
					// Save token to localStorage
					localStorage.setItem("token", token);
					toast.success(response.data.message);
					nevigate("/url_shortner");
					window.location.reload();
				}
			})
			.catch((error) => {
				console.error("There was an error! while login");
				toast.error(error.response.data.message);
			});
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
			onSubmit={handleSubmit}
		>
			<Typography variant="h4" component="h1" gutterBottom>
				User Login Page
			</Typography>
			<TextField
				label="Email"
				name="email"
				type="email"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<TextField
				label="Password"
				name="password"
				type="password"
				value={formData.password}
				onChange={handleChange}
				required
			/>
			<Button
				variant="contained"
				color="success"
				type="submit"
				sx={{ mt: 2, width: "28ch" }}
			>
				Submit
			</Button>
			<Typography
				variant="button"
				component="p"
				to="/login"
				sx={{
					mt: 2,
					width: "25ch",
					display: "block",
					textAlign: "center",
					textDecoration: "none",
					color: "black",
					mx: "auto",
				}}
			>
				Don't Have an Account?
				<Link to="/" style={{ textDecoration: "none", color: "blue" }}>
					Click Here to Register
				</Link>
			</Typography>
		</Box>
	);
};

export default Login;
