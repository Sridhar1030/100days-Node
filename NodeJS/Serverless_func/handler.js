"use strict";

module.exports.hello = async (event) => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Hello, your function executed successfully!",
				input: event,
			},
			null,
			2
		),
	};
};
