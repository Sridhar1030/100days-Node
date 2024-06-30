const { default: axios } = require("axios");
const axiosRequest = require("axios");
// let reponse = axiosRequest.get("https://www.boredapi.com/api/activity")

// //!this will not execute without promise as it takes some time for the response to come
// console.log(reponse.data.activity)

//with promise
// axiosRequest
//     .get("https://www.boredapi.com/api/activity")
//     .then((response) => {
//         console.log(response.data.activity)
//     })
//     .catch((error) => {
//         console.log(error)
//     })

//!with async function
async function getBoredActivity() {
	try {
		let response = await axiosRequest.get(
			"https://www.boredapi.com/api/activity"
		);
		console.log(response.data.activity);
	} catch (error) {
		console.log(error);
	}
}

getBoredActivity();

// !custom promise
function getActivity() {
	return new Promise((resolve, reject) => {
		axiosRequest
			.get("https://www.boredapi.com/api/activity")
			.then((response) => {
				resolve(response.data.activity);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

getActivity()
	.then((activity) => {
		console.log(activity);
	})
	.catch((error) => {
		console.log(error);
	});

// !STANDARD WAY TO CREATE A PROMISE
async function Activity() {
	try {
		let response = await axios.get("https://www.boredapi.com/api/activity");
		console.log(response.data.activity);
	} catch (error) {
		console.log(error);
	}
}

Activity();
