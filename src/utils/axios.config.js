
import axios from "axios";
import LocalStorage from "./localstroage";
const axiosConfig = axios.create({
	baseURL: "https://url-shortner-kii5.onrender.com",
	headers: {
		"Content-Type": "application/json",
	},
});
axiosConfig.interceptors.request.use(
	async (config) => {
		try {
			const token = await LocalStorage();
			console.log("Fetched token:", token);

			if (token) {
				config.headers["token"] = token;
			}

			return config;
		} catch (error) {
			console.error("Error fetching token:", error);
			return Promise.reject(error);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosConfig;
