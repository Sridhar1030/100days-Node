const EventEmitter = require("events");


class Order extends EventEmitter {
	constructor() {
		super();
	}

	placeOrder(orderId, item) {
		console.log(`Placing order for ${item} with order ID: ${orderId}`);
		this.emit("orderPlaced", { orderId, item });
	}

	cancelOrder(orderId) {
		console.log(`Canceling order with ID: ${orderId}`);
		this.emit("orderCanceled", { orderId });
	}

}
module.exports = Order;
