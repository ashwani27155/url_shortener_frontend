import axios from "axios";

import LocalStroage from "./localstroage";
const token = LocalStroage() || "";
console.log("token==", token);
const axiosConfig = axios.create({
	baseURL: "http://localhost:8081",
	headers: {
		"Content-Type": "application/json",
		token: token,
	},
});

export default axiosConfig;
