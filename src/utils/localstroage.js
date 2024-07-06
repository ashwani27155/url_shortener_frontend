const useLocalStroage = async () => {
	const token = await localStorage.getItem("token");
	if (token) {
		return token;
	} else {
		return null;
	}
};

export default useLocalStroage;
