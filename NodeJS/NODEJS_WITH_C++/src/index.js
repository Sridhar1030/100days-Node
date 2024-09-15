// src/index.js
const fs = require('fs');
const path = require('path');
const { WebAssembly } = require('webassembly');

// Load the WebAssembly binary
const wasmPath = path.join(__dirname, '../build/add.wasm');
const wasmBuffer = fs.readFileSync(wasmPath);

// Initialize WebAssembly module
(async () => {
    const { instance } = await WebAssembly.instantiate(wasmBuffer);
    const { add } = instance.exports;

    // Use the add function
    const result = add(5, 7);
    console.log(`5 + 7 = ${result}`);
})();
