---
title: "装修脑壳痛: 家庭万兆光纤网络、智能家居"
date: "2020-09-18"
cover: https://c2.is26.com/blog/2020/08/house/house-map-2.JPG
categories:
  - lifestyle
tags:
  - 装修
---

最近忙装修的事，各种乱七八糟真是脑壳痛。目前进度是已经给物业报建，目测装修队下周进场。布局已定，具体设计图还没定稿。

老婆把控全屋设计风格，我负责材料、水电、家电这些，网络这些事情当然都靠我了。

当前具体方案还没定，水电定位，还得跟设计师沟通，得好好准备下。

**这篇帖子非定案，希望各位有经验的朋友能给点提醒和建议**。

## **导航**

- [V2EX: 装修脑壳痛：家庭万兆光纤网络、智能家居 pre 设计](https://v2ex.com/t/708146)
- [Twitter:@luoleiorg](https://x.com/luoleiorg/status/1306751532675657728)

这篇博客我也发在了V2EX和推特，有不少网友给出了很多建设性的意见和评论，也推荐大家去上面可以看看。

## **参考资料**

在设计自家的网络相关之前，也看了不少资料，主要来源是张大妈、知乎、YouTube 和 B 站。关键字「装修 万兆 光纤 组网」。

主要看得比较多的是**光纤组网**这块，其他的软路由、爱国 balabala 啥的都已经折腾好了，就不用怎么看了。

- [对于数码控，在装修方面有哪些好的设计？](https://www.zhihu.com/question/21170551/answer/17427514)
- [家庭万兆方案性价比之选，10G 网速不是梦！战在当下，布局未来！](https://zhuanlan.zhihu.com/p/104864561)
- [\[视频\] 司波图:万兆光纤布网实战攻略，让光纤铺满你家！](https://www.youtube.com/watch?v=K0kRKmpYd74)
- [\[视频\] 全屋万兆光纤预埋线管怎么选？弱电线管尺寸选购攻略](https://www.youtube.com/watch?v=3MC-BKtssn4)

## **前置条件**

- 毛坯房：自由度高，希望尽量能在装修阶段，尽量把网络和布线这块尽量考虑全，省得以后麻烦。
- 预算有限，没有找独立设计师，装修公司的设计师对网络、硬件这方面的了解怕没我多。
- **家里我唯一能动的房间就是工作室**（卧室改的）。
- 客餐厅都吊顶了，好像能隐藏一些设备在吊顶里，这个我要再去问问设计师。

## **需求**

- 5G 信号全屋无缝漫游：~~这个应该是废话了~~
- **机柜**或者**独立设备空间**：设备较多，路由器、NAS 、硬路由、交换机、UPS，比较倾向于上机柜（毕竟搞 IT)
- **万兆有线内网**：六类线就支持，这个比较容易
- **光纤万兆**：鉴于电口万兆设备昂贵，所有网线穿管时均同时拉条光纤。
- **智能家居**：鉴于预算和当前智能家居生态，仅考虑门锁、灯光控制、电动窗帘这几块接入。

## **布局图**

![](https://c2.is26.com/blog/2020/08/house/house-map-2.JPG)

这是当前的房间布局图，原来是三房两厅两卫，**原弱电箱**在客餐厅入口。厨房墙打通，做成开放式吧台，一间卧室的墙打掉，用玻璃隔断，做成半开放工作间。

## **拓扑图 && 设备清单**

![](https://c2.is26.com/blog/2020/08/house/ap-map-4.JPG)

## **整体布线 && 面板**

- 全部网线采用六类非屏蔽线
- PVC 线管为 20mm，每根管分别塞 2 条六类网线 + 2 条光缆（这个很细，应该不太影响）。
- 客厅电视位预留 2 个网口+1 光口
- 主次卧出两个网口（光口暂时用不上）
- 工作室房间出 2 网口+1 光口
- 开关 86 盒留零线，方便接智能开关面板。

由于家庭面积不大，**在 WIFI 方面决定采用 MESH 有线回程的方案**，刚好已经有一个小米的 AX3600，再加一个也不贵，省点钱。

## **机柜设备：**

- **网件 6300V2**：用了很多年了，目前就是拿来拨号，到时候酌情升级或者弃用。（如果交给软路由拨号就没他的事了）
- **小米路由 AX3600**：当 AP
- **小米路由 AX3600** 或 **AX1800** (**待购**)：有线 MESH 当 AP
- **万兆交换机**：威联通（ QNAP ） QSW-308-1C 8 口千兆+3 口万兆：千兆网口+万兆 SFP+光纤端口+万兆电口（支持 1G 、2.5G 、5G 、10G 速率）(**待购**)
- **软路由**（当前是群晖 DS216 虚拟机旁路由形式实现 )
- APC **UPS** (**待购**)
- 三拓 **机柜** 12U 高 500 宽 550 深 450 9U (**待购**)

### **方案 A**

- **弱电箱改位**，玄关柜当设备柜。
- 玄关柜里放一个主 AP
- 工作室网口接一个副 AP，可以做 MESH 有线回程

![](https://c2.is26.com/blog/2020/08/house/ap-map-3.JPG)
![](https://c2.is26.com/blog/2020/08/house/ap-map-1.JPG)

由于原来的厨房改开放式厨房，墙要打掉。这是我的第一个方案，这堵墙打掉后，弱电箱肯定是就近改位，入门玄关会起一排柜子，刚好可以在靠近原弱电箱位置，留一个柜子空间，专门放路由器、交换机这些设备。

由于回路设计中，冰箱和弱电箱，单独设计了一个回路（不被家庭其他回路影响），这种方案，冰箱与弱电箱回路近，走电也相对容易。

由于玄关柜子的深度有限（只有 350 ），没办法放标准化的机柜，且浪费掉鞋柜空间，另外担心散热问题。我们家鞋子还挺多的，肯定还是希望鞋柜空间大点好。

### **方案 B**

![](https://c2.is26.com/blog/2020/08/house/ap-map-2.JPG)

- 移除原来的弱电箱（可以不用买那个大的弱电箱了），原光纤重接直连工作室机柜
- 工作室放一个主 AP
- 副 AP 可以放在原先的弱电箱里面（感觉有点怪）

方案 B 是，基本弃用原来的弱电箱，直接把原来的弱电箱功能，完全转移到工作室的机柜。这样有一个好处就是，就是所有的设备，都能放到一个工作室的机柜中，方便维护，工作 PC 与 NAS 之间，就不用走墙里的光纤了，万兆直连即可。

坏处也有，就是原来的入户光纤，要重新连一下，另外由于整个设备到了机房，也没有了单独的电回路，万一家里其他设备断电，可能会影响家里的网络这些。

## **智能家居**

有关这一块，算是比较大坑，目前大概率会入米家生态。

- 门锁：米家生态链产品等活动了
- 智能猫眼：价格不贵
- 电动窗帘：房子所有窗帘盒的地方都预留电源，电轨暂定杜亚
- 智能开关：暂定把某些灯光控制开关换成智能面板，再接入人体传感器，来实现晚上起床开灯之类的操作。
- 空调：目前是客厅装风管机，有关风管机，没有找到太好的接入智能家居的方案（要换面板，很贵），风管机又不好直接接 16A 的插座，房间内的空调还没定，看型号有没有智能控制相关吧。

## **问题**

现在这套方案，基本还是基于自己看过网上的资料后，初步设计的方案。感觉还是有点坑。比如说信号强度就没怎么考虑。

目前我还是比较担心的有几点：

- 光纤拉完线后，不知道如何测试，我现在就一台 MacBook，不知道有没有什么当场测试的方便工具。
- 目前设计的两个 AP 位置信号，不知道受墙体影响有都多大（ AX3600 亲测过一堵墙效果还好）。

第一次装修，也算是各种学习各种坑吧，整理完这个帖子，倒也又清晰了点思路。
