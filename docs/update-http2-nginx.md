---
title: 让你的网站升级到HTTP/2
date: "2015-10-05"
cover: https://c2.is26.com/blog/2015/10/http2.jpg
tags:
  - develop
---

![](https://c2.is26.com/blog/2015/10/http2.jpg)

相比前端界、APP开发中各种新事物层出不穷，服务端的新标准和新技术相对而言关注的人就少多了，这些标准、技术是互联网的基石，可是跟消费者、用户有点距离，什么毫秒级别100%的乃至500%的性能提升，多少KB字节的优化balabala对于用户来说也是没有多大感受，某种程度上，觉得倒蛮心疼的，吃水的不会记得挖井的人，吃好水的人记不住保护环境的人，最后记住的都是饮水机的代言人。

> 今年早些时候，Nginx 曾发布过一个 early-alpha patch 来提供对 HTTP/2 的支持，但从最新发布的 Nginx 1.9.5 开始，http_v2_module 已经替换了 ngx_http_spdy_module 并正式开始提供全面的 HTTP/2 支持。

前段时间在看《HTTP权威指南》，想着就再折腾一下吧。

HTTP/2今年也算是一个热点，几经扭转，终于在今年5月定稿发布了。

谷娘同他的亲儿子Chrome早早地就在推SPDY，世界上几个最大的网站Facebook、雅虎、Twitter、Youtube也都早早地部署了SPDY协议。今年二月，在HTTP/2.0集成了SPDY并进入标准化的最后阶段时，Google宣布不再开发SPDY。

然，SPDY这个小妾某种程度上可以理解已经被休了，或者换个角度，SPDY正式当上了正房大夫人。

对于SPDY和HTTP/2的详细就不再啰嗦，强烈推荐一下360前端工程师[@屈光宇](https://x.com/qgy18)的系列文章:

- [HTTP/2 与 WEB 性能优化（一）](https://imququ.com/post/http2-and-wpo-1.html)
- [HTTP/2 与 WEB 性能优化（二）](https://imququ.com/post/http2-and-wpo-2.html)
- [HTTP/2 与 WEB 性能优化（三）](https://imququ.com/post/http2-and-wpo-3.html)

挺欣赏[@屈光宇](https://x.com/qgy18)前辈的，对HTTP和Web性能的研究十分深入，他的博客就是集Web优化大成者。

下面说下如何升级到HTTP/2，目前[nginx 1.9.5](https://nginx.org/en/CHANGES)已经实验性地支持HTTP/2了。

#### SSL部署

对于从无到有的问题就不再这里再多废文墨，请大家自行谷歌`SSL部署`和`HTTPS`等关键字即可。

#### CentOS / Red Hat 升级HTTP/2

首先升级nginx版本，确保使用的是主源（包含了最新实验发行版）。

修改`/etc/yum.repos.d/nginx.repo`的nginx仓库地址

```bash
[nginx]
name=nginx repo
baseurl=https://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

如果还没有安装nginx，直接执行`yum install nginx`，如果已经安装了，则可以通过`yum clean all && yum update nginx`升级。

#### Ubuntu / Debian 升级HTTP/2

同理，首先修改apt仓库源`/etc/apt/source.list`的地址，增加下面两行仓库。

```bash
deb https://nginx.org/packages/mainline/debian/ codename nginx
deb-src https://nginx.org/packages/mainline/debian/ codename nginx
```

接下来执行`apt-get clean && apt-get install nginx`即可。

#### 验证Nginx版本

下面确认我们机器上的Nginx已经升级到至少`1.9.5`版本。

```
$ nginx -v
nginx version: nginx/1.9.5
```

#### Nginx启动HTTP/2

开启HTTP/2也十分简单，直接在指定的域名`nginx.conf`中配置。

```nginx
server {
  listen        443 ssl http2;
  server_name   luolei.org;
  #SSL配置
  ssl                   on;
  ssl_certificate       /etc/nginx/conf.d/certificate.crt;
  ssl_certificate_key   /etc/nginx/conf.d/certificate.key;
}
```

在`listen`后面增加`http2`即可。

- **注意:不能混用SPDY和HTTP/2，如果你两个都同时开启，会报错。**

```bash
nginx: [warn] invalid parameter "spdy": ngx_http_spdy_module was superseded by ngx_http_v2_module in /etc/nginx/conf.d/vhost.conf:12
```

#### 重启Nginx

`service nginx restart`重启nginx。

这个时候回到你的浏览器，打开开发者工具，进入`网络Network`，打开`Protocol`。

![](https://c2.is26.com/blog/2015/10/http-dev.jpg)

刷新一下你的网页，主域的`Protocol`已经变了成了`h2`，这就意味着已经成功升级到HTTP/2。

或者使用Chrome的网络工具，在地址栏中输入`chrome://net-internals/#http2`

![](https://c2.is26.com/blog/2015/10/http2-chrome.jpg)

这个时候，应该也能看到你网站的请求信息，`Protocol Negotiated`一栏也已经变成了`h2`。

#### 性能差异

对于HTTPS、SPDY和HTTP/2性能的比较，推荐可以参考：

- [《HTTPS, SPDY和 HTTP/2性能的简单对比》](https://www.qianduan.net/a-simple-performance-comparison-of-https-spdy-and-http2/)
- [《HTTPS、SPDY和HTTP/2的性能比较》](https://www.infoq.com/cn/news/2015/02/https-spdy-http2-comparison)

## 后言

Web性能优化这块对于前端开发者而言，也是很值得深入研究的，雅虎14条什么的是个人都会背，不要仅仅局限在纸上谈兵，自己动手实践一遍。

下面，问题来了:

> 从输入URL 到页面加载完成发生了什么事？

这是一个很好的问题，每一步，每一个节点，都能从不同的角度发现很多好玩的东西。

如果你是一名前端开发者，你会怎么回答这个问题呢，每一步都能做到哪些优化呢？

嗯哼，看书去了。(ﾉ｀⊿´)ﾉ
