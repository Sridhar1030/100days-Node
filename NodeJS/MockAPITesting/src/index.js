import { fetchUserData } from "./api/userApi";

const run = async () => {
	try {
		const userData = await fetchUserData(123);
		console.log(userData);
	} catch (error) {
		console.error("Error fetching user data:", error);
	}
};

run();
