---
title: 谷歌I/O 2014:移动端网页优化建议
date: "2014-07-04"
cover: https://c2.is26.com/wp-image/2014/07/googleio-web-lesson1.jpg
---

2014年，移动端已经是前端不可忽视的领域，越来越多的用户使用手机、平板来浏览网页，今年谷歌 I/O 上，谷歌工程师 Paul Kinlan做了题为 "Mobile web lessons learned from analyzing websites at scale(基于数据看移动网页前端实践优化)" 的分享。

谷歌利用强大的资源优势（GA,爬虫），分析大量的网页，试图寻找哪些方法可以优化移动端上的网页的性能和用户体验。

## 谷歌I/O

今年的谷歌I/O上，谷歌的重点是设计，那天晚上在车库咖啡看了直播，但也神游了挺久，倒也没记住多少那天的内容，这几天上Youtube，发现Google Developers放出了一系列“IO Bytes 2014 - Chrome and Web”的视频，很有意思，介绍了大量的前端相关的技术，强烈推荐大家有条件的去看看。

在这里，自己翻译了一下《移动端网页优化》这个视频，比较实用，分享给大家，希望对大家有帮助和启发。

使用 Chrome 等高级浏览器，直接点击下方的视频，按CC可直接调用中英文字幕（我自己翻译的）。

## 总结一下内容

现在移动端网页存在问题

- 内容无法适配屏幕
- 难以阅读的文字
- 禁用缩放
- 关于这点，我持保留态度，我们的产品项目中，默认都是禁用缩放的，在做好适配的基础上，一般用户也不会需要用到放大缩小。
- 糟糕的交互
- 复杂的输入
- 还使用 Flash 等插件

## 谷歌的建议

- 使用 viewport 标签
- 避免让用户左右滑动
- 允许用户使用缩放
- 保持文字的可读性和易读性
- 慎用 web font
- 增加点击、触控区域的交互面积
- 优化输入框
- 使用PageSpeed来优化
