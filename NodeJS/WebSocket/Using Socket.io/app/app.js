// const socket = io("ws://localhost:8080");

// // Listen for incoming messages
// socket.on("message", (text) => {
// 	const el = document.createElement("li");
// 	el.innerHTML = text;
// 	document.querySelector("ul").appendChild(el);
// });

// // Send message and analytics data when button is clicked
// document.querySelector("button").onclick = () => {
// 	const text = document.querySelector("input").value;
// 	socket.emit("message", text);

// 	// Emit analytics event for sending a message
// 	socket.emit("analytics", {
// 		event: "send_message",
// 		message: text,
// 		timestamp: Date.now(),
// 	});

// 	document.querySelector("input").value = "";
// };

// // Emit analytics event when the page loads
// window.onload = () => {
// 	socket.emit("analytics", { event: "page_load", timestamp: Date.now() });
// };
