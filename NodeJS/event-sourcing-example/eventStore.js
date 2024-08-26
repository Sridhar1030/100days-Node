// eventStore.js
const events = [];

const storeEvent = (event) => {
	events.push(event);
};

const getEvents = () => {
	return events;
};

module.exports = {
	storeEvent,
	getEvents,
};
