console.log("Script start");

// Using setTimeout to delay execution by 1 second
setTimeout(() => {
    console.log("setTimeout: Executed after 1 second");
}, 1000);

// Using setInterval to execute code every 2 seconds
const intervalId = setInterval(() => {
    console.log("setInterval: Executed every 2 seconds");
}, 2000);

// Using setImmediate to execute code immediately after the current event loop iteration
setImmediate(() => {
    console.log(
    "setImmediate: Executed immediately after the current event loop iteration"
    );
});

// Using process.nextTick to exec   ute code at the end of the current operation
process.nextTick(() => {
    console.log("process.nextTick: Executed at the end of the current operation");
});

console.log("Script end");

// Stop the interval after 10 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval cleared");
}, 10000);
