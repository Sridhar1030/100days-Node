exports.handler = async (event) => {
	// Extracting arguments from the event object
	const { name, description } = event.arguments;

	// Add your business logic here

	const item = {
		id: Date.now().toString(),
		name,
		description,
	};

	// Return the new item
	return item;
};
