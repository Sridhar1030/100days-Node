#!/usr/bin/env node

import { writeFileSync, unlinkSync } from 'fs';

// Get arguments passed from the command line
const [,, command, fileName] = process.argv;

if (command === 'create') {
    writeFileSync(fileName, '', 'utf8');
    console.log(`File ${fileName} created.`);
} else if (command === 'delete') {
    unlinkSync(fileName);
    console.log(`File ${fileName} deleted.`);
} else {
    console.log('Invalid command. Use "create" or "delete".');
}
