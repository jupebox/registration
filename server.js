const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found!');
            return;
        }
        const pathParts = filePath.split('.');
        let contentType;
        switch (pathParts.reverse()[0].toLowerCase()) {
            case 'css':
                contentType = 'text/css';
                break;
            case 'js':
                contentType = 'text/javscript';
                break;
            default:
                contentType = 'text/html';
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

const port = 8080;
server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on http://localhost:8080');
});
