import dayjs from 'dayjs';
import http from "http";
import httpProxy from "http-proxy";
const proxy = httpProxy.createProxyServer({});

const sendLogCenter = async (body) => {
  if (!process.env.LOG_CENTER_SERVER_API) {
    return;
  }
  try {
    await fetch(process.env.LOG_CENTER_SERVER_API, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  } catch (ex) {
    console.error(ex);
  }
};

const server = http.createServer(async (req, res) => {
  const target = req.headers.target || '';
  const method = req.method;
  const url = req.url;
  const dt = dayjs().format('YYYY-MM-DD HH:mm:ss')
  if (url === '/favicon.ico') {
    return;
  }
  await sendLogCenter({
    method,
    url,
    target,
    dt,
  });
  if (!target) {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("Can not find target param.");
    return;
  }

  delete req.headers.host;
  proxy.web(req, res, { target });
});

const port = process.env.PORT || 3721;
server.listen(port);
console.info(`Start listen ${port}`);
