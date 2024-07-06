import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import URLShortner from "./components/UrlShortner";
import Analytic from "./components/Analytics";
import Navbar from "./components/Navbar";
import LocalStorage from "./utils/localstroage";
import { ToastContainer } from "react-toastify";

function App() {
	const navigate = useNavigate();
	const [token, setToken] = useState(null);

	// fetch token from local-storage
	useEffect(() => {
		const fetchToken = async () => {
			const token = await LocalStorage();
			setToken(token);
		};
		fetchToken();
	}, [navigate]);
	if (!token) {
		navigate("/login");
	}

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Register />}></Route>
				<Route path="login" element={<Login />}></Route>
				<Route path="url_shortner" element={<URLShortner />}></Route>
				<Route path="analytics" element={<Analytic />}></Route>
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
