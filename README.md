代理转发服务

注意：因没有 **https** 需求，所以只支持 **http**。

## Dev

```
npm install
npm run dev
```

```
open http://localhost:3721
```

## How to use

需要在 Headers 中增加 target 字段，标识指向目标域名。

```
target: domain
```

http://server/[path] -> [domain]/[path]


## Docker Deploy

```
docker build --no-cache -t xbf321/proxy-server .
docker push xbf321/proxy-server:latest
docker run -d -p 3721:3721 -e PORT=3721 --restart unless-stopped  --name proxy-server xbf321/proxy-server:latest
```

