---
title: "Raycast Hoarder: 开源 AI 书签管理插件"
date: "2024-11-24"
cover: https://c2.is26.com/blog/2024/11/hoarder/h-2.jpg
categories:
  - code
tags:
  - raycast
---

上周我开发了一个基于 Sink 的短链管理插件[《我开发了一个短链管理插件: Raycast Sink》](https://luolei.org/raycast-sink)，上架官方插件商店后，看到已经有几十个用户在使用。

昨天又开发了一个基于 Hoarder 的书签管理插件，有了上次的开发经验，这次从初始化项目到最后提交上架，只花了一天时间。同样开源到了我的 Github 上。

- [Github:Raycast Hoarder](https://github.com/foru17/raycast-hoarder)
- [Raycast Store: Hoarder Bookmark](https://zuoluo.tv/hoarder)

## Hoarder 简介

Hoarder 是一个**基于 AI 的书签管理工具，可以自动摘录、识别网页，通过 AI 分析内容、生成标签和摘要**。

- 官网: [Hoarder](https://hoarder.app/)
- 仓库: [Github: Hoarder](https://github.com/hoarder-app/hoarder)
- 体验网站: [Hoarder Demo](https://try.hoarder.app/)

有关这个项目的介绍，大家可以直接看官网和官方文档，对于有一定动手能力的开发者来说，还是很容易上手的。

![](https://c2.is26.com/blog/2024/11/hoarder/h-0.jpg)

## 优点

- **Self-Hosting**，支持自部署，数据自主可控
- **支持 Web、iOS、安卓多端**，也有浏览器插件
- 通过 AI 自动给内容打标签，理解网页和图片内容
- 自动保存网页和截图
- **Docker 一键部署**，建议用境外服务器，抓取和分析更快。
- 开放 API 支持拓展

## Raycast Hoarder

我部署完这个插件之后，感觉整个产品的完成度很高，加上有 API 支持，所以就顺手开发了一个 Raycast 插件，方便管理和使用 Hoarder。

![](https://c2.is26.com/blog/2024/11/hoarder/h-1.jpg)
列表直接查看书签，支持网址、图片、文本三种格式的预览。

![](https://c2.is26.com/blog/2024/11/hoarder/h-6.jpg)
增强了搜索功能，支持本地权重搜索和在线搜索。

![](https://c2.is26.com/blog/2024/11/hoarder/h-2.jpg)
书签详情页支持查看、编辑、删除、打开链接等操作。

![](https://c2.is26.com/blog/2024/11/hoarder/h-3.jpg)
![](https://c2.is26.com/blog/2024/11/hoarder/h-4.jpg)
支持列表和标签列表。

![](https://c2.is26.com/blog/2024/11/hoarder/h-5.jpg)
由于 Hoarder API有点问题，暂时支持快捷增加文本和链接的书签。

## 为什么要自部署

在上面的优点中，我特意提到了 Self-Hosting，自部署是我最关注的一个点。

去年我曾经写过一篇文章[《脱钩: 我的个人网络安全策略》](https://luolei.org/personal-decoupling-cybersecurity)，由于工作原因，我已经将很多数据都下云或者放到境外服务器。

其实市面上有许多书签管理和笔记管理工具及服务。但是，出于众所周知的原因，在国内的所有内容平台服务都需要进行内容审查。国外也有很多优秀服务，但价格高昂或速度慢。

Hoarder这种完全开源、可以自行部署、数据可控性强的工具对于像我这样有技术背景的人来说是一个好选择。
