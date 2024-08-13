import axios from "axios";

export const fetchUserData = async (userId) => {
	try {
		const response = await axios.get(
			`https://api.example.com/users/${userId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
