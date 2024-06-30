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

server.listen(process.env.PORT || 3721);
console.info('Start listen');