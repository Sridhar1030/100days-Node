import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

// Define a route to stream a file
app.get('/download', (req, res) => {
    const filePath = 'F:/100days-Node/NodeJS/File_Streaming/Syllabus.pdf'; 
    // const filePath = 'F:/100days-Node/NodeJS/File_Streaming/example.txt'; 
    
    console.log('filePath:', filePath);
    
    // Ensure the file exists
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('File not found:', err);
            return res.status(404).end();
        }
        
        // Set appropriate headers
        res.writeHead(200, {
            // 'Content-Type': 'text/plain',
            'Content-Type': 'application/pdf',
            'Content-Length': stats.size
        });
        
        // Create a readable stream from the file and pipe it to the response
        const readableStream = fs.createReadStream(filePath);
        readableStream.pipe(res);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
