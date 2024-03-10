---
title: 要加密,也要熊掌:让Ghost支持https并被百度正常收录
date: "2015-05-17"
cover: https://c2.is26.com/blog/2015/05/baidu3.jpg
categories:
  - code
---

#### 更新:百度开放收录https站点

[百度网页搜索动态:《百度开放收录https站点公告》](https://zhanzhang.baidu.com/wiki/392)。

> 亲爱的网站管理员:从今天开始，百度放开对https站点的收录，https站点不需要再做任何额外的工作就可以被百度顺利抓收。在此之前，百度站长学院曾发表文章，指导https站点制作http可访问版便于百度抓收。技术升级后，百度视同一个域名的http版和https版为一个站点，优先收录https版。建议站长关闭http版，或者将http页面直接跳转到对应的https页面。

这篇文章算是我失效最快的一篇文章了 ╮(╯_╰)╭ 。

#### 下面供参考

两个月前，重新设计了博客，推出了新的主题 [Nevecoo](https://luolei.org/theme-nevecoo/) ，并且全站升级到 https 加密，随后就没怎么管了。一个多月前，突然发现百度搜索关键字「罗磊、罗磊博客、罗磊的独立博客」等等均无任何收录。

搜索了一下原因，发现官方有一个说明[《https站点如何建设才能对百度友好》](https://zhanzhang.baidu.com/college/articleinfo?id=6)，其中开门见山指出:

> 百度搜索引擎目前不主动抓取https网页。

要想让百度收录，只能另辟蹊径，给百度这只懒熊和笨熊开http小灶。

#### 首先吐槽

谷人希谷娘不仅全线产品早早就开始支持https，对于采用https加密的网站，更是情有独钟。

2014年8月官方公告:["HTTPS as a ranking signal"](https://www.googlewebmastercentral.blogspot.ch/2014/08/https-as-ranking-signal.html)。

> 谷歌调整搜索引擎算法，采用https加密的网站将在搜索结果中排名靠前。

对于https加密的好处和必要性就不再这里多做说明，百度今年全站搜索也已经进入了https时代，对此，推荐可以看一下知乎上的讨论[《如何看待百度全站搜索进入 HTTPS 时代？》](https://www.zhihu.com/question/28379088)，其中一个答案也是挺黑色幽默的：

> 百度切换HTTPS这事背后有一部分原因是大量的来自于底层运营商级别的流量劫持，其中百度的TN包括搜狗的pid都是重灾区。TN及pid流量这事就是没有买卖就没有杀害。

百度这个大流氓，遇到了天朝运营商中移动、中电信、中联通、中XX这些更大的流氓，被强插广告、强导流量，也是流氓见流氓，两眼泪汪汪呀。

当然，由于中国特色，国情，现在国内不少云商，甚至还禁止用户使用https，你懂的。

#### 如何兼容

这两年，谷歌被墙加上百度拒绝收录后，我博客的流量已经从过去的日均600+ IP直接下降到日均100IP，原先的大多访客阅读的都是技术相关的文章，可能也有一定的技术基础。但是翻墙的门槛在这里，国人的搜索习惯大多还是百度，这种反差，对于自己，怎么说呢，还是挺感慨的。

上了大学之后，写博客，一方面是记录自己的成长（生活、学习、职业），另一方面，一直以来自己也是秉承「创作、传播、分享」的理念，尽量想把一些有趣、有价值的信息，分享给其他人（这是我一直以来信仰的互联网的精神）。

博客没放过广告，每个月几百块钱的服务器租金，也没怎么在乎，流量访客高低，对于自己倒无所谓，就是觉得：如果别人有需要搜索什么东西，却找不到我这里可能对他有用的信息，还是挺遗憾的。

对此，搜索了一下解决方案，在这里整理下，分享给大家。思路很简单，就是通过Nginx或者apache配置，让百度的爬虫走http协议就好了。

对于Ghost的Nginx配置，可以参考["How to setup SSL for self-hosted Ghost"](https://support.ghost.org/setup-ssl-self-hosted-ghost/)。

下面是我的Ghost的Nginx配置。

```nginx
server {
        listen 80; //默认http 80端口，非加密
        server_name luolei.org www.luolei.org;
        //百度SEO --Start--
        if ($http_user_agent !~* baidu.com){
                // 非百度爬虫UA，全部301跳转走 https 协议
                return 301 https://$host$request_uri;
        }
       //百度SEO --END--
        location / {
                proxy_set_header   X-Real-IP $remote_addr;
                proxy_set_header   Host      $http_host;
                proxy_pass         https://127.0.0.1:2368;
                client_max_body_size 35m;
        }
}
//下方为443端口配置
server {
        listen 443 ssl; //https走默认443端口
        server_name luolei.org www.luolei.org;
        ssl_certificate        /home_path/ssl.new.crt;
        ssl_certificate_key    /home_path/server.key;
        location / {
                proxy_set_header   X-Real-IP $remote_addr;
                proxy_set_header   Host      $http_host;
                proxy_pass         https://127.0.0.1:2368;
                client_max_body_size 35m;
        }
}
```

要检查自己的https站点是否能被百度正常收录，可以使用百度的[《百度站长工具:抓取诊断》](https://zhanzhang.baidu.com/crawltools/index?site=https://luolei.org/)。

![](https://c2.is26.com/blog/2015/05/baidu3.jpg)

利用这个工具，可以测试指定页面的抓取结果，也可以测试PC端和移动端爬虫不同的抓取结果。

![](https://c2.is26.com/blog/2015/05/baidu2.jpg)

桌面端百度爬虫的UA是

```javascript
Mozilla/5.0 (compatible; Baiduspider/2.0; +https://www.baidu.com/search/spider.html)
```

如果正常抓取，会返回HTTP头和页面内容。

![](https://c2.is26.com/blog/2015/05/baidu1.jpg)

需要注意的是，移动端爬虫的UA有所差异：

```javascript
Mozilla/5.0 (Linux;u;Android 2.3.7;zh-cn;) AppleWebKit/533.1 (KHTML,like Gecko) Version/4.0 Mobile Safari/533.1 (compatible; +https://www.baidu.com/search/spider.html)
```

但是不管是PC还是移动端，UA中都包含`baidu.com`字段，那么我们就利用这个做区分符好了。

最后，在直接浏览器访问，输入`https://luolei.org/`地址，看下是否可以正常跳转到`https://luolei.org`。

如果正常，那么就大功告成了。稍等几天，百度应该就会恢复对你的Ghost博客的收录。
