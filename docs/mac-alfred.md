---
title: Mac效率工具 Alfred 本土搜索功能优化
date: "2012-10-30"
cover: https://c2.is26.com/wp-image/2012/10/alfred-search.jpg
tags:
  - mac
  - tutorial
  - e7949fe4baa7e58a9b
---

原来的老联想win笔记本坏了，上周去香港买了2012款的macbook air 13寸低配，air不愧是前端神器，够轻，屏幕好，加上OSX极其人性化的体验：大面积触摸板的良好手感+多桌面切换，用起来是各种爽。

几天下来，给air配置好了开发环境，倒也用得颇为顺手 。

今天在这里分享一个mac下的系统增强插件alfred，也算是一个可以提高效率的生产力工具。

> ![](https://c2.is26.com/wp-image/2012/10/Butlers-Hat1-e1351609940232.png) Alfred是一款效率软件，旨在节约你花在搜索本地OS以及互联网各大网站的时间。支持google，淘宝，新浪微博等等等等。 官方地址：[https://www.alfredapp.com/](https://www.alfredapp.com/)

alfred是一款免费软件，有强大的插件（技术够牛逼，你都可以自己写插件），可是如果要开启增强功能，则需另外购买。

对于普通用户来说，免费的已经够强大了。这篇博文就说说利用alfred的自定义搜索功能，来增强本土搜索。

安装好alfred后，点击顶部状态栏那个alfred小帽子，打开preferences，可以设置快捷键。

![](https://c2.is26.com/wp-image/2012/10/alfred-setting.jpg)

可以根据自己的习惯，设置激活alfred搜索栏的快捷键，如我就设置了「⌥键+空格。」。

此时，alfred就成了你的mac的GPS，无论何时何地，只需快捷方式激活搜索栏，你就可以：

1.快速打开app

![](https://c2.is26.com/wp-image/2012/10/QQ20121030-3.png)

2.快速搜索

![](https://c2.is26.com/wp-image/2012/10/alfred-search-google.jpg)

初始默认搜索是google，维基百科和亚马逊三个引擎。实际上可以通过自定义搜索引擎，实现更多搜索功能。

从百度到bing，从新浪微博到豆瓣，从论坛搜索到bt搜索，都能实现。

#### alfred自定义搜索功能

**1.设置**

进入Alfred Perferences>feature ，找到左侧的custom searches。

![](https://c2.is26.com/wp-image/2012/10/Snip20121030_2.png)

**2.自定义搜索参数：**

![](https://c2.is26.com/wp-image/2012/10/Snip20121030_3.png)

进入了自定义搜索，就可以自己设置搜索和快捷键参数了。以淘宝搜索为例：

A.Search Url填写相应的搜索引擎地址：[https://s.taobao.com/search?q={query}](https://s.taobao.com/search?q={query})

其中的{query}为一个变量，指代你的搜索关键字。

B.Title填写自定义搜索名称。

C.keyword为激活快捷键，可以按照拼音来设置，也可以按照你的喜好设置。

D.Validation默认alfredapp，无需修改。

E.右侧可以自定义图标，直接拖动图片丢进去就可以了，会自动转换成48\*48的分辨率。

**3.演示**

⌥+space激活搜索栏>输入tb>显示淘宝搜>

![](https://c2.is26.com/wp-image/2012/10/alfred-taobao.jpg)

输入tb（无关大小写）后，激活了淘宝搜索，接下来空格，再输入你要搜索的商品名称，回车后，即可打开浏览器进入淘宝的搜索界面了。

![](https://c2.is26.com/wp-image/2012/10/alfred-taobao-result.jpg)

设置十分简单，主要就是注意一下那个Search Url。

一般来说，要找到这个search url，就进入相应的搜索引擎，然后随便搜一个关键字，观察浏览器里地址栏里的url特征。

比如说花瓣网搜索关键字「美女」。

![](https://c2.is26.com/wp-image/2012/10/Snip20121030_5.png)

地址栏为[https://huaban.com/search/?q=美女](https://huaban.com/search/?q=美女) 或者[https://huaban.com/search/?q=%E7%BE%8E%E5%A5%B3](https://huaban.com/search/?q=%E7%BE%8E%E5%A5%B3)  ，后者后面那这段乱码实际是「美女」汉字的转码。

就可以很容易观察到[https://huaban.com/search/?q=](https://huaban.com/search/?q=) 为花瓣网搜索的基本地址，而最后跟的就是搜索关键字。

将搜索关键字部分替换成{query}就可以了。最终花瓣搜索的search url就是：

[https://huaban.com/search/?q={query}](https://huaban.com/search/?q={query})

同理，附上几个流行网站的搜索代码：

新浪微博：[https://s.weibo.com/weibo/{query}](https://s.weibo.com/weibo/{query})

知乎：[https://www.zhihu.com/search?q={query}&type1=all](https://www.zhihu.com/search?q={query}&type1=all)

搜库（优酷网视频搜索引擎那个）：[https://www.soku.com/v?keyword={query}](https://www.soku.com/v?keyword={query})

V2EX（站内搜索）：[https://www.google.com/search?q=site:v2ex.com/t%20{query}](https://www.google.com/search?q=site:v2ex.com/t%20{query})

有道翻译：[https://dict.youdao.com/search?q={query}](https://dict.youdao.com/search?q={query})
