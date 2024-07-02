# 代理转发服务

注意：因没有 **https** 需求，所以只支持 **http**。

## Dev

```bash
npm install
npm run dev
```

```bash
open http://localhost:3721
```

## How to use

需要在 Headers 中增加 target 字段，标识指向目标域名。

```bash
target: domain
```

http://server/[path] -> [domain]/[path]

## Docker Deploy

参数说明：

* PORT:启动端口
* LOG_CENTER_SERVER_API:日志记录，用于分析请求是否转发成功

```bash
docker build --no-cache -t xbf321/proxy-server .
docker push xbf321/proxy-server:latest
docker run -d -p 3721:3721 -e PORT=3721 -e LOG_CENTER_SERVER_API=API --restart unless-stopped  --name proxy-server xbf321/proxy-server:latest
```
