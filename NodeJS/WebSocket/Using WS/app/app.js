const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = ({ data }) => {
	console.log("message from server ", data);

};


document.querySelector('button').onclick = () =>{
    socket.send('hello')
}