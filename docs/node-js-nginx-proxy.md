---
title: Nginx反向代理部署Node.js应用配置方法
date: "2013-08-13"
cover: https://c2.is26.com/wp-image/2013/08/Screen-Shot-2013-08-13-at-6.58.12-PM.png
---

![nodejs-nginx-proxy](https://c2.is26.com/wp-image/2013/08/Screen-Shot-2013-08-13-at-6.58.12-PM.png)

这篇文章仅仅是Mark，供自己以后使用。

一般来说使用node.js开发的webapp都不会是默认的80端口，以官方文档演示为例

```javascript
var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(1337, "127.0.0.1");
```

使用的是1337端口，用户必须在网址后加入:1337才能访问站点，一般默认HTTP端口是80，监听80端口能让网址看起来更简洁。我在linode上配置了LNMP环境，使用的是nginx，需要使用反向代理，配置nginx反向代理的代码参考如下。 比如说我的某域名为 fitbit.is26.com ，node.js的通讯端口为1337，则:

```nginx
server{
listen 80;
server_name fitbit.is26.com;
index index.html index.htm index.php default.html default.htm default.php;
location / {
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_set_header X-NginX-Proxy true;
proxy_pass https://127.0.0.1:1337/;
proxy_redirect off;
}
}
```

将网站域名设置好，然后端口设置为80，将所有从fitbit.is26.com:80的请求传递到nodejs程序去。 保存nginx conf文件后，记得要restart nginx，方能生效。
