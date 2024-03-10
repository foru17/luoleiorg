---
title: Alfred域名IP速查工具
date: "2015-09-07"
cover: https://c2.is26.com/source/images/lookip.jpg
---

工作中经常需要连接不同的服务器，人比较笨，老是记不住服务器的IP地址，记录在印象笔记中每次去查也麻烦，开终端`ping`复制粘贴也麻烦。

随手写了一个Alfred的工具，可以直接通过Alfred查找指定域名的IP地址。相对而言，就不需要记IP的数字了，直接查一下域名，就能得到IP地址。

原理很简单，代码没超过20行，但是已经可以解决一个小痛点了。

源码都放在Github了:[foru17/alfred-lookupdomainip](https://github.com/foru17/alfred-lookupdomainip)

#### 使用方法

![](https://c2.is26.com/source/images/lookip.jpg)

- 需要Alfred Powerpack支持,请支持正版。

下载[lookupdomainip.alfredworkflow](https://github.com/foru17/alfred-lookupdomainip/raw/master/lookupdomainip.alfredworkflow),安装。

调起alfred，输入`cip {你要查找的URL即可}`

- 可直接输入完整URL，会自动解析出域名。

![](https://c2.is26.com/source/images/cip2.jpg)

回车即可复制IP地址到剪贴版。

接下来，爱干嘛就干嘛吧。

#### 更新

> 2015.9.28 增加了同时查询延时Ping值的功能
