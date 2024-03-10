---
title: NodeJS + Google Analytics追踪渠道页面浏览量
date: "2015-09-12"
cover: https://c2.is26.com/blog/2015/09/ga/track3.jpg
tags:
  - develop
---

前两天正要下班，突然北京的同事来了一个数据统计的需求。具体就是我们的市场同事要要做地推，地面商家有若干家，分别要统计不同的商家谷歌扫码二维码访问某网页的人数量。

本来这应该是个挺简单的需求，无非就是做个页面。

如果访问的是一个页面，那就通过URL增加参数版本来区分:

举个栗子:

```js
https://luolei.org/store.html?uid=beijing
https://luolei.org/store.html?uid=shanghai
```

如果是多页面，那就多搞几个页面呗。

再举个栗子:

```js
https://luolei.org/store1.html
html://luolei.org/store2.html
```

然后在页面中加上百度或者谷歌的统计代码就好了。

> 然(tai)并(ben)卵(le)

由于这次的推广页面是合作方网页，且合作方基本不可能给我们网页的统计数据，这下只能换一种思路解决了。

## 中间页跳转

之前曾经写过一篇文章[《隔山打牛:给第三方网站做Facebook的Open Graph分享优化》](https://luolei.org/share-to-facebook-smart/)，对于这种需求，比较简单的方法，可以通过做一个中间页，在中间页中，可以通过:

- `meta`标签跳转
- 脚本 `location.href`跳转

两种方法来解决，在跳转页面中也加统计代码即可。

这种方法的好处:

- 简单(bèn dàn )，写个页面部署上去就可以了。
- 可以抓取到访客的详细信息(设备、语言balblablala)

坏处也不言而喻:

- 中间需要跳转，会闪屏，体验不好
- 有些设备和Webview环境，可能对跳转的处理不符合需求（我们之前就曾出现过APP内Webview跳转，无法正常使用回退功能）
- 由于2以及不可控因素，有可能会无法Track到信息（比如说百度谷歌的统计代码还没加载，页面就跳转了balblabla)。

## 怎么解决？

如果仅仅是需要知道渠道流量量，那么有没有什么方法可以快速解决呢？有没有什么更好的体验的方法呢？

_在服务端做跳转怎么样?_

对于服务端跳转，就有多种处理方法，最简单的莫过于在`nginx`和`apache`中直接设置URL跳转到指定页面，如果要统计访问量，直接开启`log`日志，到头来直接看日志就好了。如果要快速查找访问量，直接用`wc`命令查看`log`文件的行数就好。

不要问我为什么这么弄，因为有一次因为需求仓促，加上场景比较特殊（APP内Webiview)有不可控的交互问题，当时就这么弄过。

> 然,这个方法还是太笨了。

## 怎么改进？

用网页跳转体验不好，用服务端跳转不够方便，那么有没有什么办法解决呢？

这个时候，我想到了`NodeJS`和谷歌统计，有么有什么办法把这两个东西结合起来呢？

去搜了一下，果然找到了[universal-analytics](https://github.com/peaksandpies/universal-analytics)这个模块，这下就可以十分方便的同`NodeJS`一起搞基了。

首先新建一个项目:

```bash
npm init
```

秉着敏捷快速原则，直接使用成熟的`Express`框架。

```bash
npm install express --save
```

```bash
npm install universal-analytics --save //安装谷歌统计模块
```

```javascript
/**
 * Project:Node Google Analytics
 * Author:i@luolei.org
 */
"use strict";
var express = require("express");
var app = express();
var ua = require("universal-analytics");
var visitor = ua("UA-21856187-7"); //谷歌统计
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(3000);
```

这样一个简单的`HTTP`服务就搭好了，执行`node index.js`运行一下，在浏览器输入`localhost:3000`应该就可以看到页面了。

接下来，我们加入路由和谷歌统计的功能。

```js
app.get("/test", function (req, res) {
  visitor.pageview("/somepage", "测试页面", "https://luolei.org").send();
  visitor.event("事件类别", "事件行为", "事件标签", 42).send();
  res.redirect("https://this.is26.com");
});
```

试着访问一些`localhost:3000/test`页面，网页直接跳转到`https://this.is26.com`网站，同时在谷歌统计的实时后台，我们收到了一个`/somepage`的`pageview`和实时事件。

![](https://c2.is26.com/blog/2015/09/ga/track2.jpg)

这时，市场的同事说，要统计**很多**渠道的数据。这个时候，我们干脆就做成接口的形式，让运营和市场的同事直接自己修改URL生成他们所需要的URL吧。

```js
app.get("/redirection", function (req, res) {
  var des = req.query.dest || "目标页面标记Tag", //目标页面标记TAG
    tid = req.query.tid || "来源渠道Tag",
    url = decodeURIComponent(req.query.url) || "https://luolei.org"; //跳转的URL
  visitor.event("跳转统计", tid, tid + "_" + des, 42).send();
  res.redirect(url);
});
```

我们通过区分URL中的`query`值参数的形式，来区分渠道来源、目标地址，同时增加一个`&url=`的参数，通过`encodeURIComponent`需要跳转的地址，来自定义跳转的URL。

举个栗子，这个时候，同事老王需要统计我们在上海新天地某酒吧，扫二维码访问我们的粗粮商城`https://store.is26.com/`的人数，那么他只需要给出如下URL即可:

```js
https://this.is26.com/redirection?dest=粗粮商城&tid=新天地&url=http%3A%2F%2Fstore.is26.com
```

根据这样定制，就可以十分方便地在GA后台，查看到渠道的效果啦。

![](https://dn-is26.qbox.me/track4.jpg)

## 后记

记录下最近的一个小需求，配合自己配置的Node快速构建脚手架[Justquicknode](https://github.com/foru17/justquicknode)，半个小时不到就搞定了市场部门的需求，也减少了后续要自己加页面、汇报数据balblabla的繁琐工作。

发散思维，可以让中转这种小事情，也能发挥不少作用。
