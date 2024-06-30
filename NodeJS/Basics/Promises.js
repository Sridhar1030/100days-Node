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
        // Simulate an asynchronous operation
		setTimeout(() => {
			const success = true; // Simulate a condition
			if (success) {
				resolve("Custom operation was successful!");
			} else {
				reject("Custom operation failed.");
			}
		}, 1000);
	});
}

getActivity()
	.then((activity) => {
		console.log(activity);
	})
	.catch((error) => {
		console.log(error);
	});

//  * Most compact way
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
