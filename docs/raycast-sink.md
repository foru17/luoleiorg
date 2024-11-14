---
title: "我开发了一个短链管理插件: Raycast Sink"
date: "2024-11-14"
cover: https://c2.is26.com/blog/2024/11/sink/raycast-sink-intro.jpg
categories:
  - code
tags:
  - raycast
---

前段时间，花了一点时间，开发了一个 Raycast 插件，当时还发了一条[推](https://x.com/luoleiorg/status/1846465874389356916)，今天这个插件成功通过 Raycast 官方审核，已经上架 Raycast 的插件商店。写篇文章分享一下。

<TweetCard
tweetId="1846465874389356916"
twitterId="luoleiorg"
author="luolei"
time="下午4:09 · 2024年9月8日"
:content="'转码萌新，用 Cursor 花了2小时 , 给效率神器 Raycast 开发了个短链插件。🐶\n基于目前市面上最佳，由@ccbikai\n打造的使用 Cloudflare 技术栈的开源短链系统 Sink 。直接通过 Raycast 便捷管理和使用 Sink 短链。\n🔗 仓库地址: https://github.com/foru17/raycast-sink\n🛍️ 商店地址: https://zuoluo.tv/sink\n0️⃣ 开源 ✅\n1️⃣ 一键配置 🔧\n2️⃣ 离线优化 🚀\n3️⃣ 快捷操作(查询/创建/编辑/跳转/剪贴板) 🎯\n\n目前我用这个当网站书签，把一些常用的网站落地页记录，懒得打开浏览器时可以直接快捷跳转 🤓'"
avatar="https://pbs.twimg.com/profile_images/1550157622300786688/672YmCpB_400x400.jpg"
comment=1
like=79
image="https://c2.is26.com/blog/2024/11/sink/raycast-sink-intro.jpg"
/>

## 背景

过去好多年，我都使用老牌的 [YOURLS](https://github.com/YOURLS/YOURLS) 作为自己的短链服务。一开始部署在自己的云服务器上，后来又迁移回家里的 Homelab，虽然用起来也没什么问题，但是总得放到一个实体的服务器上，维护起来还是有点麻烦。

上个月，花了一天时间，将自己的短链服务从 YOURLS 迁移到了朋友面条 [@ccbikai](https://x.com/ccbikai) 开发的开源短链服务 [Sink](https://sink.cool/)

<TweetCard
    tweetId="1794162548776079701"
    twitterId="ccbikai"
    author="面条"
    time="上午8:24 · 2024年5月25日"
    :content="'【开源】 Sink - 基于 Cloudflare 带访问统计的短链系统\n\n特性：\n1. 访问统计\n2. 自定义 Slug\n3. 🪄 AI 生成 Slug\n4. 链接有效期\n5. Cloudflare 部署, 支持 3,000,000 次访问/月'"
    avatar="https://pbs.twimg.com/profile_images/1648180024464539648/L6Na78It_400x400.jpg"
    :comment="21"
    :like="287"
/>

基于 Cloudflare 的短链服务，比较符合我们前端技术栈的使用习惯。具体的部署和使用，可以直接看官方文档，对于有技术背景的人来说，还是比较上手的。

## Raycast 插件

[Raycast](https://www.raycast.com/) 是 macOS 上著名的快捷启动工具，我在今年已经从[Alfred 5](https://www.alfredapp.com/) 切换到了 Raycast。

Raycast 有一个很好的插件生态，趁着这个机会，我也顺便开发了一个 Raycast 的 Sink 短链管理插件。

现在这个插件已经上架 Raycast 的插件商店，可以直接搜索 `Sink` 安装使用。

- [Raycast Store: Sink Short Links Manager](https://www.raycast.com/luolei/raycast-sink)

这个插件也开源在我的 GitHub 上，有兴趣的朋友可以参考。

- [Raycast Sink](https://github.com/foru17/raycast-sink)

## 主要功能

插件的功能比较简单，不要是基于 Sink 的 API 进行的封装，主要功能包括：

- 快捷**查看**，**创建**，**搜索**和**编辑**短链接
- **缓存优化**：本地缓存短链接列表，减少网络请求
- **剪贴板**集成：立即将短链接复制到剪贴板
- **i18n**：支持中文和英文

## 演示

![](https://c2.is26.com/blog/2024/11/sink/s-1.jpg)
一键查看所有短链接列表，支持`favicon`预览。

![](https://c2.is26.com/blog/2024/11/sink/s-4.jpg)
控制台快捷管理短链接，支持`复制`，`打开`，`编辑`和`删除`。

![](https://c2.is26.com/blog/2024/11/sink/s-6.jpg)
支持查看短链的详情（后续版本增加访问统计）。

![](https://c2.is26.com/blog/2024/11/sink/s-2.jpg)
本地和在线搜索短链接，按照字段权重排序。

![](https://c2.is26.com/blog/2024/11/sink/s-3.jpg)
快捷创建短链接。

## 关于用 AI 开发这个事

**用 Cursor 花了 2 小时开发一个应用** 这句话当然是在玩梗。真实情况是，这个插件的最小 MVP 的确就花了差不多一个小时搞定，但后面补文档、上架流程、看官方指引倒花了不少时间。后续打磨和优化代码又花了一整天的样子。

当时跟面条还聊了下，现在用 AI 做前端这种小应用真的是太方便了。尤其是对于我们这种有经验的开发者，只需要需求描述明确，结合自己的代码经验，很容易把一个像模像样的小应用搞定。

前几个月，我自己还独立开发了一个大型商业应用，前后端全栈，AI 也帮了很大的忙，由于是商用就不方便公开了，大型应用中的 AI 开发相关的经验，有机会再跟大家分享。

个人的经验和建议就是：**不管你是不是计算机相关专业出身，即使现在 AI 已经很强大，还是建议系统学习下编程，至少掌握一门编程语言（比如 Python 或者 JavaScript）。配合 AI ，可以解决日常工作中的许多问题。**
