const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const API_BASE = 'https://opendata.immigration.gov.tw';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // API Proxy Logic
    if (parsedUrl.pathname === '/proxy') {
        const apiPath = parsedUrl.query.path;
        if (!apiPath) {
            res.writeHead(400);
            return res.end('Missing path parameter');
        }

        console.log(`Proxying request to: ${API_BASE}${apiPath}`);

        https.get(`${API_BASE}${apiPath}`, (apiRes) => {
            res.writeHead(apiRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            apiRes.pipe(res);
        }).on('error', (e) => {
            console.error(e);
            res.writeHead(500);
            res.end('Proxy Error');
        });
        return;
    }

    // Static File Server Logic
    let filePath = '.' + parsedUrl.pathname;
    if (filePath === './') filePath = './index.html';

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`API Proxy active at http://localhost:${PORT}/proxy?path=...`);
});
