import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../utils/axios.config";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		axiosConfig
			.post("/api/v1/auth/signup", formData)
			.then((response) => {
				if (response.status === 200) {
					toast.success(response.data.message);
					navigate("/login");
				}
			})
			.catch((error) => {
				console.error(
					"There was an error!",
					error.response ? error.response.data : error.message
				);
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
				Registration Page
			</Typography>
			<TextField
				label="Name"
				name="name"
				type="text"
				value={formData.name}
				onChange={handleChange}
				required
			/>
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
				Have an Account?
				<Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
					Click Here to Login
				</Link>
			</Typography>
		</Box>
	);
};

export default Register;
