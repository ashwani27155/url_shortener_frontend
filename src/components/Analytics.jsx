import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axios.config";
const Analytic = () => {
	useEffect(() => {
		// fetch token from local-storage
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);
	const [token, setToken] = useState("");
	const [originalUrl, setOriginalUrl] = useState("");
	const [urlId, setUrlId] = useState("");
	const [shortenedUrl, setShortenedUrl] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setOriginalUrl(e.target.value);
		const urlData = e.target.value;
		const urlarray = urlData.split("/");
		setUrlId(urlarray[3]);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		axiosConfig
			.get(`/api/v1/url_analytics/${urlId}`)
			.then((response) => {
				if (response.data.shortId) {
					const urlData = response.data.count;
					setShortenedUrl(urlData);
					setError("");
					toast.success("Url Analytics Fetched sussessfully");
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
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
			onSubmit={handleSubmit}
		>
			<Typography variant="h4" component="h1" gutterBottom>
				Show Analytics
			</Typography>
			<div style={{ display: "flex", alignItems: "center" }}>
				<TextField
					label="Short URL"
					name="originalUrl"
					type="text"
					value={originalUrl}
					onChange={handleChange}
					required
				/>
				<Button
					variant="contained"
					color="success"
					type="submit"
					sx={{ ml: 2, p: 2 }}
				>
					Show Analytics
				</Button>
			</div>
			{error && (
				<Typography variant="h4" component="h1" gutterBottom>
					{error}
				</Typography>
			)}
			{shortenedUrl >= 0 && (
				<Box sx={{ mt: 2 }}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<TextField
							label="URL Clicked Analytics"
							name="URL Clicked"
							type="text"
							value={shortenedUrl}
							readOnly
						/>
					</div>
				</Box>
			)}
		</Box>
	);
};
export default Analytic;
