---
categories:
- code
cover: https://c2.llyz.xyz/blog/2019/07/blog/wp-1.jpg
date: '2019-07-06'
tags:
- 编程
title: 我的博客从 Ghost 迁移回 Wordpress | 优化记录
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
