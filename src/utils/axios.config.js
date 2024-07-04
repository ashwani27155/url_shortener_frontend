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

// import axios from "axios";

// const instance = axios.create({
//   baseURL : 'http://127.0.0.1:8000/api/',
//   headers: {
// //  Authorization: `<Your Auth Token>`,
//     Content-Type: "application/json",
//     timeout : 1000,
//   },
//   // .. other options
// });

// export default instance;
