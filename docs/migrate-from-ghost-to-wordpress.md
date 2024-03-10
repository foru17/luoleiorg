---
title: 我的博客从 Ghost 迁移回 Wordpress | 优化记录
date: "2019-07-06"
cover: https://c2.is26.com/blog/2019/07/blog/wp-1.jpg
categories:
  - code
tags:
  - 编程
---

如你所见，我的博客「[罗磊的独立博客](https://luolei.org)」在2019年7月，间隔3年，又一次进行了大改版。

**如果你在大陆地区，网络不太差的话，打开这个博客，应该有挺大的概率，算得上是「秒开」体验。**

过去很长时间，我的博客都是用[Ghost](https://ghost.org/)作为我的博客平台，几年前，也做了几款 Ghost 的主题，其中的 [Yasuko](https://github.com/foru17/Yasuko) 由于不错的阅读体验，还被网友改成了Wordpress 主题。

- 2015年12月:[Yasuko:一个有故事的主题:珠峰上的Yasuko](https://luolei.org/a-ghost-theme-yasuko-with-story/)
- 2015年2月:[Nevecoo:「辞旧迎新」新主题,更安全的罗磊独立博客](https://luolei.org/theme-nevecoo/)
- 2014年4月:[Ghostwill :鬼才晓得](https://luolei.org/theme-ghostwill/)

#### 为什么我要放弃Ghost

Ghost 轻巧、简单、速度的特性，的确也吸引了不少程序员做为轻量的的博客后台，我算是从 Ghost 刚发布就开始使用，过去这五年，只升级过几次，也没做啥定制开发啥的，毕竟速度够快、功能够用，也没有啥折腾的必要。

但是这两年，我的博客内容从过去简单的文字为主的博客，变成了图文、视频为主的自媒体，Ghost这种轻量博客后台越来越不满足自己的需要。这个星期，抽了几天时间，从 Ghost 迁移回了 Wordpress，也进行了大量优化。目前呈现给大家的，就是我的新博客。

今天这篇文章，也整理一下这次迁移、优化过程中的一些经验和分享。中间参考了许多已有的教程、解决方案，根据自己的需求，略有调整。

## 为什么不自己写主题

我不熟PHP，且现在已经没时间折腾代码这些啦，这次直接购买的某国内工作室主题，比较符合国内使用习惯，看完代码后，表示幸亏没挖坑给自己写主题，WP的主题生态还是挺好的。

## 服务器硬件

- Web Server:[阿里云 深圳 2U/4G/5M](https://zuoluo.tv/aliyun)
- DNS解析:[腾讯云 Dnspod 付费个人专业版](https://dnspod.cloud.tencent.com/)
- 数据库:[腾讯云数据库 MySQL](https://cloud.tencent.com/product/cdb)
- 海外反向代理:阿里云国际版 香港 1U/1G/40G/带宽:100M/1TB
- 静态资源服务器1: 阿里云国际版 香港 1U/1G/40G/带宽:100M/流量:1TB（同上)
- 静态资源服务器2: 阿里云国际版 上海 1U/1G/40G/带宽:30M/流量:1TB
- 静态资源服务器3: Linode JP2区 1U/1G/40G /带宽:理论1Gbps / 流量:理论上没限制

域名都有备案，服务器放深圳，速度和延迟都尚好，国外访问解析到香港阿里云IP，通过反向代理转发到深圳服务器。这么做是因为香港服务器本身网络不稳定（有被墙的风险），但是香港机房到深圳机房之间的线路相对来说比较稳（理论上如果是同家云的话，还能走内网）。

原本有考虑过主站直接套腾讯云的动态CDN加速，测试后发现**CNAME和MX记录不能同时共存，导致我的域名邮箱无法正常接发邮件**，无奈放弃。

之所以弄三个静态资源服务器，是因为我的博客图文很多，每个月流量都过T，对比过国内的CDN的报价，不管是哪一家，流量费用都太高，成本吃不消。三台服务器分别位于香港、上海、日本，通过 DNS 境内外负载，国内不同线路负载，分担了服务器压力。

三台静态服务器之间，通过 `rsyncd` 增量同步，三个服务器都采用相同的 Linux 版本，管理后台，APP路径什么都统一，所以管理起来也很方便。

之所以不放微博之类的图床，一个是因为静态资源种类很多，各种文件都有，另外不想被人审核。

由于还有其他数据库，后台接入的阿里云数据库，新建一个表就好了，其他的就不用操心了。

## 数据库备份与迁移

- [ghost-to-wp](https://www.hughrundle.net/2017/11/12/ghost-to-wp/)
- [Ghost JSON转Wordpress XML工具: ghost-to-wp](https://github.com/hughrun/ghost-to-wp)

转换到WP XML之前，先在Sublime里批量替换了Ghost JSON 里的许多lazyload的`<image>`中的URL，懒得后期去 MySQL 里改了。

## Web优化

- [用 Nginx+Redis Cache 给 WordPress 提速](https://www.mf8.biz/nginx-redis-cache-make-wordpress-fast/)
- [通过 OpenResty + Redis 高效缓存 WordPress](https://www.mf8.biz/openresty-redis-cache-wp/)
- [PHP7安装Memcache+Memcached教程](https://www.skyoy.com/php7-memcached-wordpress.html)
- [WordpressCDN后用Ajax动态提交、显示文章阅读量，cookies避免重复刷新](http://www.capjsj.cn/ajax_cookies_views.html)
- [WP Nginx Cached插件: Nginx Hepler](https://wordpress.org/plugins/nginx-helper/)

一开始装上WP的时候，再不做任何优化的情况下，速度感动得吐血，TTFB时间能到3S，属于没法用的程度。后来上了Memcached后，TTFB下降到1-2S以内，虽然访问起来速度可以接受，但是依旧慢，并且PHP + Memcached 的方案，在高并发的场景下，依旧会有大量query，CPU会爆。

![](https://c2.is26.com/blog/2019/07/blog/wp-1.jpg)

最终上了[OpenResty + Redis](https://www.mf8.biz/openresty-redis-cache-wp/) 的解决方案，目前TTFB是10ms+，达到秒开级别，并发测速时，CPU负载低（毕竟无Query了），由于上了缓存，博客的阅读量统计需要改成 ajax 形式，难度不大，有现成分享方案。

![](https://c2.is26.com/blog/2019/07/blog/wp-2.jpg)

有nginx缓存的情况下，全国测速大概这样的情况，比较欣慰，第一次见到自己博客一片绿。

## 静态资源优化

- [Nginx启用Brotli 压缩，降低页面大小提高网站加载速度](https://www.xiaoz.me/archives/12488)
- [宝塔面板Nginx 开启Brotli压缩，提高网站页面加载速度](https://cvps.top/9416.html)
- [通过 Nginx-Lua 自动转换图片为 WebP 格式](https://mikublog.com/tech/2090)
- [使用Nginx提供WebP图像](https://zhangchen915.com/index.php/archives/362/)

HTTP2，Brotli 这些顺便开启了，优化效果比较轻微，聊胜于无。

WebP这个折腾了比较多时间，由于想无缝切换，不想在前端做WebP判断，直接通过Head中的Accept头，Nginx自动判断返回.webp文件，nginx配合lua和 cwebp后端自动生成web图片。

大概就是原图 `demo.jpg > demo.jpg.webp`，用户访问时，URL依旧是 /demo.jpg，但是实际返回的是 demo.jpg.webp图片，亲测在压缩75%质量的情况下，体积减少至少50%，极大地节约了流量，降低了服务器压力。

## 待解决的问题

- nginx 模块 lua-nginx-module 编译 失败，涉及gcc相关error，有坑
- Wordpress配合nginx-helper插件处理nginx缓存，没有方便的接口清缓存更新页面，想crontab定时清理某些页面缓存有点麻烦。
- 谷歌 AMP
- Telegram Instant View: TG被Block，大陆服务器的所有网站都无法直接抓取，Instant View的爬虫语法比较磨人。

## 总结

这次从 Ghost 迁移到 Wordpress，整体难度不大，在还没做前端JS等优化的情况下，目前网站的效果已经算比较不错了。

迁移的过程中也看了看主题PHP代码，感觉Wordpress还是可以的，生态成熟、插件多，自定义接口也多，开发定制功能啥的也不难，以后接入公众号、小程序、社群这些也都方便。
