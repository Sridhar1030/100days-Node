// Debugger.js

// A simple function to add two numbers
function add(a, b) {
	return a + b;
}

// A function to demonstrate the use of debugger
function compute() {
	const num1 = 10;
	const num2 = 20;

	// Use debugger statement to pause execution here
	debugger;

	const result = add(num1, num2);
	console.log(`The result is: ${result}`);

	// Another debugger statement
	debugger;

	return result;
}

// Call the function
compute();
