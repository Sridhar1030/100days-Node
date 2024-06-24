// consoleExample.js



// console.log() - for general output of logging information
console.log('This is a log message.');

// console.error() - for outputting errors
console.error('This is an error message.');

// console.warn() - for outputting warnings
console.warn('This is a warning message.');

// console.time() and console.timeEnd() - for timing operations

console.time('Time loop'); //the label for console.time and console.timeEnd shuld be same
for (let i = 0; i < 100; i++) {
    // some code to execute
    console.log(i);
}
console.timeEnd('Time loop');

// console.trace() - for tracing the code execution
function functionA() {
    functionB();
}

function functionB() {
    console.trace('Trace in functionB');
}

functionA();
