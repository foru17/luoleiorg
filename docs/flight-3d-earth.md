---
title: "科普网站:航班在 3D 地球的飞行真实轨迹"
date: "2025-04-19"
cover: https://c2.is26.com/blog/2025/04/flight/e-1.jpg
tags:
  - code
---

上周花了两天时间，用 Next.js 练手做项目，顺便做了一个科普网站。

- 🌍 [Flight Track in 3D Earth](https://flight.is26.com)

经常坐飞机的朋友，尤其是坐过长距离国际航班的朋友，一定留意过飞机在地图上的轨迹。但是由于[墨卡托投影](https://zh.wikipedia.org/zh-hans/%E9%BA%A5%E5%8D%A1%E6%89%98%E6%8A%95%E5%BD%B1%E6%B3%95)的原因，航班在平面地图上的轨迹往往与我们心理上的感知不一致。

**这个网站的核心功能是展示航班在 3D 地球上的真实 GPS 轨迹，并与平面地图上的轨迹进行直观对比**。这对于理解地图投影的影响特别有帮助，相信初中和高中的科学及地理老师会发现它的教学价值。

同时也收集了几条「最长」的航线，当作展示案例。

## 灵感来源

![](https://c2.is26.com/blog/2025/04/flight/e-2.jpg)

在阮一峰周刊 [第342期](https://www.ruanyifeng.com/blog/2025/03/weekly-issue-342.html) 看到那张 EK215 航班跨越北极的航线图，感觉做一个 3D 效果的可能更加直观，于是做了这个科普性质的网站。

使用了 threejs 和收费的 Flightradar24 API 制作了这个查询真实航班的小工具。后来发现 API 费用太贵，只好先屏蔽真实数据，改用模拟数据，但效果仍然很直观。

在做这个小项目的这几天，我稍微了解了航旅的数据领域，感叹航空行业的标准化真令人佩服：全球统一的航班代码、机场代码和各种开放数据。同时，我也对航空数据服务的价格感到震惊。

一开始我天真地以为 Flightradar24 每月 $9 美元能查 30,000 次挺划算（毕竟能缓存历史航班），结果才发现 Credit 并不是次数，实际请求 500 次不到就用完了，FlightAware 是按请求数计费。

有关航旅这个部分，有一个推友留言，供参考:

<TweetCard
    tweetId="1910665635325260082"
    twitterId="nexa_li"
    author="Nexa"
    time="下午8:06 · 2025年4月11日"
    content="之前打算做相关产品，用OpenAI Deep research做了非常详细的产品调研，想要功能齐全费用不低的"
    avatar="https://pbs.twimg.com/profile_images/1910673688044986373/QW6bL1qv_400x400.jpg"
    comment=0
    like=3
    image="https://c2.is26.com/blog/2025/04/flight/e-3.jpg"
  />

## 相关资料

- [Next.js](https://nextjs.org/)
- [Three.js: Javascript 3D Library](https://threejs.org/)
- [Flightradar24 API: 航旅数据](https://fr24api.flightradar24.com/)
- [FlightAware APIs: 航旅数据](https://www.flightaware.com/commercial/data/)
- [国家地区经纬度坐标：World countries](https://github.com/stefangabos/world_countries)
- [全球机场代码:Airports](https://github.com/mwgg/Airports)
