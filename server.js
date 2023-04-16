const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/home.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const extname = path.extname(filePath);

  let contentType;

  if (/^\.html?$/.test(extname)) {
    contentType = 'text/html';
  } else if (/^\.css$/i.test(extname)) {
    contentType = 'text/css';
  } else if (/^\.js$/i.test(extname)) {
    contentType = 'text/javascript';
  } else if (/^\.jpe?g$/i.test(extname)) {
    contentType = 'image/jpeg';
  } else if (/^\.png$/i.test(extname)) {
    contentType = 'image/png';
  } else if (/^\.gif$/i.test(extname)) {
    contentType = 'image/gif';
  } else if (/^\.svg$/i.test(extname)) {
    contentType = 'image/svg+xml';
  } else {
    contentType = 'text/plain';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Page not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});