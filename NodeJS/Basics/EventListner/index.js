const Order = require('./order');

const myOrder = new Order();

// Listener for 'orderPlaced' event
myOrder.on('orderPlaced', (data) => {
    console.log(`Order placed: ${data.orderId} for item: ${data.item}`);
    // Additional logic (e.g., sending confirmation email)
});

// Listener for 'orderCanceled' event
myOrder.on('orderCanceled', (data) => {
    console.log(`Order canceled: ${data.orderId}`);
    // Additional logic (e.g., refund processing)
});

// Simulate placing and canceling orders
myOrder.placeOrder(101, 'Laptop');
myOrder.placeOrder(102, 'Phone');
myOrder.cancelOrder(101);
