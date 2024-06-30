import http from 'http';
import httpProxy from 'http-proxy';
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    const target = req.headers.target;
    if (!target) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Can not find target param.');
        return;
    }
    delete req.headers.host;
    proxy.web(req, res, { target });
});

const port = process.env.PORT || 3721;
server.listen(port);
console.info(`Start listen ${port}`);