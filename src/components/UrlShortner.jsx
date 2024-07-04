import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axios.config";

const URLShortner = () => {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortenedUrl, setShortenedUrl] = useState("");
	const [error, setError] = useState("");
	const [token, setToken] = useState(""); // State

	const handleChange = (e) => {
		setOriginalUrl(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		axiosConfig
			.post(`api/v1/short_url`, { originalUrl: originalUrl })
			.then((response) => {
				if (response.data.shortId) {
					const urlData = response.data.shortId;
					const shortUrlData = `http://localhost:8081/${urlData}`;
					setShortenedUrl(shortUrlData);
					setError("");
					toast.success("Url shortner Done sussessfully");
				}
			})
			.catch((error) => {
				console.error("There was an error!");
				toast.error(error.response?.data?.message);
			});
	};

	useEffect(() => {
		//Fetch token from localStorage or sessionStorage
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shortenedUrl);
		alert("Copied to clipboard!");
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
				Short URL
			</Typography>
			<div style={{ display: "flex", alignItems: "center" }}>
				<TextField
					label="Original URL"
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
					Shorten URL
				</Button>
			</div>
			{error && (
				<Typography variant="h3" color="error" gutterBottom>
					{error}
				</Typography>
			)}
			{shortenedUrl && (
				<Box sx={{ mt: 2 }}>
					<Typography variant="h6" gutterBottom>
						Shortened URL:
					</Typography>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Typography
							label="Shortened URL"
							name="shortenedUrl"
							type="text"
							readOnly
						>
							{shortenedUrl}
						</Typography>
						<Button
							variant="outlined"
							onClick={copyToClipboard}
							sx={{ ml: 2, p: 2 }}
						>
							Copy To Clipboard
						</Button>
					</div>
				</Box>
			)}
		</Box>
	);
};

export default URLShortner;
