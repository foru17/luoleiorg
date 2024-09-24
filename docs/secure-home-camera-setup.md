---
title: "我的智能家居监控方案:打造自主、安全、可控的摄像头"
date: "2024-02-12"
cover: https://c2.is26.com/blog/2024/02/camera/c-1.jpg
categories:
  - lifestyle
tags:
  - 装修
---

最近买了一个摄像头，放在家里看宠物，稍微折腾了下，目前算是比较满意了。

**如果你对家庭监控的安全性和隐私性要求比较高，可以参考下我的方案。如果不想折腾，建议直接用原厂的 App 和云服务。**

## 自建方案简介

买了个支持`ONVIF`协议的 `IP 摄像头`，通过`ONVIF`协议接入和群晖的监控`Surveillance Station`，摄像头进行24H监控，视频存储在群晖外挂的 USB 硬盘上，配合`Home Assistant`和`Node-RED`，实现了一些动静通知、回家离家自动开关等自动化的功能。摄像头断开外网访问，只能在家里内网或者 VPN 访问，保证了视频的安全性。

## 为什么要自建监控？

几个月我写了一篇文章[《脱钩: 我的个人网络安全策略》](https://luolei.org/personal-decoupling-cybersecurity)，分享我与中国互联网服务和产品脱钩的一些经验。

在那篇文章中，我介绍了我已经把大多数据资产都转移到了境外服务或者下云，主要目的就是为了保护自己的隐私和数据安全。

对「智能家居」来说，脱钩或者下云是不实际的，我是小米生态的重度用户，门锁和门禁摄像头，都是小米生的产品，这些产品基本都强依赖于小米的云服务。入住新家两年以来，这种基于云的服务，的确也带来了很多便利。

**摄像头不同于其他智能设备，这是一个极其敏感的，打破了「网络」与「现实」边界的设备，他可以直接看到、听到镜头里的一切。**

好几年前，我通过一个业内的渠道，得知某摄像头的云存储服务，曾经将用户的监控视频未加密处理，就直接存在某公有云的 bucket 里。从那之后，我就再也没在家里开启过摄像头。

前几年，众多在各种乱七八糟网站上泄漏出来的视频，想必大家也都有所耳闻。基于上面种种考量，我决定自建监控方案。首先说下我的这套监控方案的优缺点。

## 自建对比原厂优缺点

| 项目         | 自建方案                                    | 原厂                                  |
| ------------ | ------------------------------------------- | ------------------------------------- |
| 操作性       | ❌ 需要折腾，挺麻烦                         | ✅ 上手即用                           |
| 安全性       | ✅ 本地存储，内网访问，理论可与外网完全隔离 | ❌ 云服务、云存储，存在隐私泄露的可能 |
| 经济性       | ✅ 无额外费用                               | ❌ 云存储一般都要额外收费             |
| 存储空间     | ✅ 无空间限制,理论可无限拓展存储            | ❌ 云存储空间有限,时长有限            |
| 共享性       | ❌ 不方便共享给家人                         | ✅ 便捷分享控制                       |
| 外网访问     | ❌ VPN 访问(可开启公网权限:但不建议)        | ✅ 直接公网即可访问                   |
| HomeKit 支持 | ✅ 支持                                     | ❌ 大多不支持                         |

## 设备清单

| 设备            | 品牌       | 型号                                                                                                                                                     | 价格         |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 摄像头          | TP-Link    | [800万全彩云台无线网络摄像机 TL-IPC48AW 全彩](https://www.tp-link.com.cn/product_1893.html)                                                              | ￥279        |
| NAS             | 群晖       | [DS216+](https://global.synologydownload.com/download/Document/Hardware/DataSheet/DiskStation/16-year/DS216+/chs/Synology_DS216_Plus_Data_Sheet_chs.pdf) | ￥0 (旧设备) |
| 外接硬盘盒      | 淘宝工厂店 | 2.5寸 USB3.1 Type-C 硬盘盒                                                                                                                               | ￥21         |
| 外接监控存储SSD | 饥饿鲨OCZ  | Arc100 240G固态硬盘                                                                                                                                      | ￥0 (旧设备) |

这次除了摄像头是新购的，其他都是原有的老设备。这里的花销大头是群晖的 NAS，理论上如果你有其他 NAS，或者开源的软路由什么的，也能实现类似的功能。无非就是需要花费更多时间折腾罢了。

## 系统架构

| 名称                                                              | 说明                                               | 配置难度 |
| ----------------------------------------------------------------- | -------------------------------------------------- | -------- |
| [SurveillanceStation](https://www.synology.cn/zh-cn/surveillance) | 群晖自带监控中心套件                               | 低       |
| [Home Assistant](https://www.home-assistant.io/)                  | 开源智能家庭家庭解决方案，与米家和 HomeKit 等联动  | 高       |
| [Node-RED](https://github.com/node-red/node-red)                  | 开源的流程编排工具，配合 HA 实现各种事件处理自动化 | 高       |

上面就是我的这套监控系统的核心架构，除了`SurveillanceStation`属于傻瓜级上手可用，后面的`Home Assistant`和 `Node-Red`都需要花费一定的时间和学习。由于我之前就有一些 HA 和 Node-RED 的使用经验，这次只是集成下 SurveillanceStation，所以整体花费的时间还是比较少的。

## 配套 App

| 名称           | 说明                      | 安卓 | iOS | Web | 实时监控 | 回放 | 推送信息 |
| -------------- | ------------------------- | ---- | --- | --- | -------- | ---- | -------- |
| Home Assistant | HA 的客户端               | ✅   | ✅  | ✅  | ✅       | ❌   | ✅       |
| DS CAM         | 群晖监控套件的配套 App    | ✅   | ✅  | ❌  | ✅       | ✅   | ✅       |
| Bark           | 自建的 iOS 的消息推送服务 | ❌   | ✅  | ❌  | ❌       | ❌   | ✅       |
| Telegram       | 极其方便和自由的社交 App  | ✅   | ✅  | ✅  | ❌       | ❌   | ✅       |

## 摄像头选购

搭建自己的监控体系，**基本的要求就是摄像头需要支持`ONVIF`协议或者`rtsp`协议**，这是安防设备的通用协议，方便用户自己集成到各种系统中。

购买摄像头之前，需要务必确认摄像头支持`ONVIF`协议，小米的许多摄像头就不支持。

- [怎么判断摄像机支不支持Onvif协议？](https://security.tp-link.com.cn/service/detail_article_4417.html)
- [V2EX:网络摄像头有什么通用协议吗？](https://www.v2ex.com/t/983607)
- [知乎:为什么家用摄像头基本上都不支持onvif/rtsp协议呢?](https://www.zhihu.com/question/404251421)

这次我购买的摄像头是`TP-Link`的[TL-IPC48AW](https://www.tp-link.com.cn/product_1893.html)，属于比较经典的系列。

- 支持`ONVIF`协议
- 支持 4K 15帧录制。
- WIFI 2.4G
- 红外夜视(方便夜晚和弱光环境监控)
- 支持 Micro SD 卡存储
- 1个RJ45口，支持网线直连

硬伤是 WIFI 不支持 5G。除了基础的硬件功能，还有各种云服务支持，AI 检测什么的，但是由于我也没打算用自带的 App（美区 App Store 居然还没 TP-Link App) ，所以也无所谓了。

## 关闭摄像头外网访问

防止摄像头能访问外网，首先就是关闭摄像头的外网访问权限，仅限内网用户访问。

按照以下步骤设置即可：

- 给摄像头设置**固定 IP**
- 在路由器层禁止该 IP 访问外网
- 如果使用 OpenWrt 等网关，在**防火墙层设置屏蔽规则**

```shell
#TP-Link 摄像头 防火墙规则
iptables -I FORWARD  -m mac --mac-source E4:DD:66:82:DE:F4 -j DROP
iptables -I FORWARD -s 10.0.0.12 -d 10.0.0.0/16 -j ACCEPT
iptables -I FORWARD -s 10.0.0.0/16 -d 10.0.0.12 -j ACCEPT
iptables -I FORWARD -s 10.0.0.12 -j REJECT

```

我家使用的是小米路由器，网关使用的是 OpenWrt，除了在小米的控制台关闭外网权限，同时在防火墙设置里，通过添加过滤摄像头IP和MAC地址的规则，禁止摄像头访问外网。

![](https://c2.is26.com/blog/2024/02/camera/c-2.jpg)

设置完毕后，可以看到这个时候再访问TP-Link自带的App，提示是设备离线状态。但是如果你是在局域网通过内网 IP 访问，依旧可以正常访问。

## 如何配置外网访问

将家庭内网暴露到外网，或者内网穿透，是一个与「监控」系统本身不太相关的问题。

从安全的角度考量，我不希望摄像头直接暴露在外网，所以我只是在有需要的时候，通过`zerotier`来访问家里的监控系统。实际上还有一些其他方案，比如`WireGuard`等，这里就不做讨论了。

- [ZeroTier](https://www.zerotier.com/)
- [WireGuard](https://www.wireguard.com/)
- [无公网IP搞定群晖+ZEROTIER ONE实现内网穿透](https://post.smzdm.com/p/741270/)
- [使用frp和Shadowsocks实现安全访问内网服务](https://www.bilibili.com/read/cv15337265/)

## 接入群晖 SurveillanceStation

群晖的`SurveillanceStation`是一个非常成熟的监控套件，这个也是我们的监控系统的核心。之所以选择群晖，是因为我家里有一台群晖。其他厂商也有类似的监控套件，也有第三方的开源解决方案，建议大家就自行研究了。

这部分的内容，以`ONVIF` `群晖` `NAS`等关键词组合搜索，网上有很多教程，我在这里就不赘述了。

- [NAS变身NVR录像机，接入监控摄像头实现实时录制、远程回放、存储！](https://post.smzdm.com/p/awzzgemk/)
- [家庭双摄像头添加到群晖Surveillance套件](https://post.smzdm.com/p/arqvmw3q/)

## 将监控视频存储到外接 USB 硬盘

我的群晖`DS216+`是双盘位，使用两块机械硬盘做了`RAID1`。

**由于监控的过程中一直会写入硬盘，会对硬盘寿命造成严重影响。强烈建议非专业需求，不要将监控视频与其他数据混存。**

![](https://c2.is26.com/blog/2024/02/camera/c-18.jpg)

为了解决这个问题，我使用了一块没用的`240G`的`SSD`，通过`USB3.0`接口外接到群晖上，作为监控的存储盘。上图就是我目前实际挂载的样子，这样有个好处:

- **不影响主硬盘的寿命**
- USB3.0 搭配 SSD 硬盘，读写速度更快，回放时更流畅

虽然这样做，不如直接将视频存储在 NAS 的主硬盘上保险，但是我的目的主要就是看看最近的视频，监控录制的视频也不需要长期存储，所以这样做对于我来说倒是一个更经济合理的选择。

由于**群晖默认不允许外接硬盘作为存储盘**，这里需要一定的小技巧，外接硬盘挂载成正常的文件路径，需要通过`SSH`登录到群晖，配合`ln -s`软链的方式挂载外接硬盘。

- 参考教程: [NAS群晖DSM进阶教程：保护硬盘 使用外接设备下载资源](https://post.smzdm.com/p/559269/)

![](https://c2.is26.com/blog/2024/02/camera/c-7.jpg)

首先登录群晖的`SurveillanceStation`，在`网络摄像机`>`编辑摄像机`>`录制` 里添加新的存储器，这里默认是只能在群晖主硬盘空间上存储，这里我命名`camera_storage`。

![](https://c2.is26.com/blog/2024/02/camera/c-5.jpg)

接下来需要通过`SSH`登录到群晖，进入跟路径，找到当前挂载的盘符，这个时候可以看到外接的硬盘已经被挂载到了`/volumeUSB1/`目录下。

```shell
# 通过 SSH 登录群晖,通过软链将外挂硬盘挂载到共享文件夹,突破群晖的限制
ssh  luolei@10.0.0.5
ln -s /volumeUSB1/usbshare/ /volume2/camera_storage
#DSM 7.0 后，上述挂载的方法需要做一些调整,具体方法见下
```

接下来再去`编辑摄像机`>`录制`里，把`录制存储器`选择为刚刚创建的`camera_storage`，这样后续监控视频都会默认直接保存在外接硬盘上了。

### 重要更新

DSM 7.0 后，上述挂载的方法需要做一些调整，不能再通过软链接`ln -s`的方式映射盘符。简要说明新的步骤

- 依旧同上添加新的存储器
- 在**控制面板** > **任务计划** > **新增触发的任务**
- 创建任务:用户选择**root** (必须使用root)，事件选择:**开机**
- **任务设置** > **用户定义的脚本** : mount -o bind /volumeUSB1/usbshare /volume2/camera_storage
- 重启之后，再去 SurveillanceStation 里设置即可

## 接入 HomeKit

如果想在 iPhone 的 Home App 里看到监控视频，需要通过`Home Assistant`将摄像头接入到 HomeKit。这一部分也有比较多的教程和文章，我找了几篇比较详细的，供大家参考。

- [通过home assistant将onvif协议摄像头加入homekit](https://zhuanlan.zhihu.com/p/669220623)
- [请问有人在ha用onvif 连接成功TPLINK 的摄像头么](https://bbs.hassbian.com/thread-12038-1-1.html)

在这里分享一个小优化点，HA 自带的`ONVIF`协议添加摄像头看到的实时画面延迟较大（我自己观察约5秒)，如果使用`WebRTC Camera`取流可以大大降低延迟。具体的步骤可参考:

- [HomeAssistant 海康、大华摄像机rtsp取流不再卡顿](https://www.bilibili.com/read/cv22505112/)

## 监控效果

截止到一步，家庭监控的`接入`、`录制`、`存储`、`实时监控`、`回放`等功能都已经实现了。目前我主要就是通过群晖的`DS Cam`来进行实时监控和回放。

![](https://c2.is26.com/blog/2024/02/camera/c-8.jpg)

`DS Cam`有网页版和 App 版，使用起来还是很方便的，在监控画面有动静的时候，在时间轴上也有标记，方便快速定位。

![](https://c2.is26.com/blog/2024/02/camera/c-9.jpg)

出门在外时，一般我就使用 App 查看监控，TP-Link 这个摄像头本身支持语音通话，但是通过`ONVIF`接入群晖这么一圈后，就没有了，暂时还没找到解决方案，没法远程逗狗了，算是一个小小的不方便。

![](https://c2.is26.com/blog/2024/02/camera/c-17.jpg)

同样的，通过 iOS 自动的`Home`也能看到监控画面，但是 HomeKit 的实时监控画面延迟也是比较大的，大概是每10秒刷新一次。通过`Home Assistant`，则是可以实现更低延迟的监控画面。

## 进阶:动静通知和自动化管理

接下来就是一些进阶的功能了，主要是为了解决监控动静提醒，以及离家在家模式的自动化管理。

首先思考下面几个问题？

- 我家的摄像头是否需要24小时监控？
- 不同位置的摄像头是否需要不同的监控策略？
- 如果有人在特定时间出现在监控中，是否需要提醒？

现在不少人家里都有摄像头，有些摄像头是用来对着门口，有些摄像头对着客餐厅，有些摄像头对着儿童房的婴儿床。不同的位置，对于监控的需求是不一样的。

我家目前就装了一台摄像头，对着客厅和大门玄关入口。实际上，我并不太需要这个摄像头一直录制。毕竟有时候，我在家还是比较洒脱和坦荡，我不希望自己的一举一动都被摄像头记录下来。

这个时候，就可以通过`SurveillanceStation`，`Home Assistant`和`Node-RED`来实现一些自动化的功能了。

一句话来介绍这个的原理: **通过自定义规则，触发`webhook`，来切换摄像头的开关和触发通知。**

![](https://c2.is26.com/blog/2024/02/camera/c-10.jpg)

群晖 SurveillanceStation 支持自定义`操作规则`，在这里我设置了三个规则:

- 在家模式: 人员在家时，关闭摄像头
- 离家模式: 人员离家时，开启摄像头
- 动静通知: 监控画面出现动静时，发送通知

![](https://c2.is26.com/blog/2024/02/camera/c-11.jpg)
![](https://c2.is26.com/blog/2024/02/camera/c-12.jpg)

这个的原理也十分简单，以`在家模式`举例，通过设置`事件源`为`WebHook/外部设备`，群晖暴露了一个`WebHook`接口，通过普通的网络请求触发这个接口，就可以关闭摄像头。

![](https://c2.is26.com/blog/2024/02/camera/c-13.jpg)
![](https://c2.is26.com/blog/2024/02/camera/c-14.jpg)

而`动静通知`模式，则是反过来的操作，当监控画面出现动静时，群晖会主动向我的第三方`Node-Red`定义的接口触发请求，`Node-Red`会执行抓取当前画面、推送画面到`Telegram`、`Bark`等通知渠道的动作。

## HA自动化:离家自动开启摄像头

如果想做到更加智能和自动化，比如离开家时自动开启摄像头，这个时候就需要通过`Home Assistant`来实现了。

`Home Assistant`里的`设置`>`自动化与场景`支持自己创建自动化。可以通过设置不同的`if` `then` 逻辑来控制不同的设备和流程。

![](https://c2.is26.com/blog/2024/02/camera/c-15.jpg)

以我的需求为例，当我的手机离开家时（地理围栏)，就会自动发送一条通知到我的手机，并请求我的群晖的`WebHook API`开启摄像头。

```yaml
rest_command:
  bark_push:
    url: https://push.bark.demo/notification
    method: POST
    payload: '{"body": "{{ body }}","title": "{{ title }}","icon":"https://static.is26.com/share/icon-vm.png"}'
    content_type: "application/json; charset=utf-8"
    verify_ssl: true

  camera_on:
    url: http://10.0.0.5:5000/webapi/SurveillanceStation/Webhook/Incoming/v1?token=iQRJyuOYPIZODrWMRfT
    method: GET

  camera_off:
    url: http://10.0.0.5:5000/webapi/SurveillanceStation/Webhook/Incoming/v1?token=iVufyERsmJZEM1UJ7M
    method: GET
```

这只是我的一个简单的示例，同理，当你回到家时，希望什么时候关闭摄像头，也可以根据你的实际需求，实现更复杂的自动化功能。上面我使用到了 HA 自带的`RESTful Command`功能。有关`Home Assistant`的自动化`RESTful Command`配置，可以参考下面的文章。

- [RESTful Command](https://www.home-assistant.io/integrations/rest_command/)
- [一起DIY智能家居 篇十二：为homeassistant和独立传感器添加短信电话通知](https://post.smzdm.com/p/a0q93po0/)

有关「离家」和「在家」模式，可以参考下下面的讨论：

- [米家自动化-用米家传感器判定家中有人和家中无人的方法-修正版](https://post.smzdm.com/p/aoo8lg9r/)
- [[进阶教程] 准确、及时、自动判断离家回家--多种方案试用后的最终选择](https://bbs.hassbian.com/thread-10096-1-1.html)

## Node-Red自动化:推送Telegram

弄完上面的流程后，监控的大多需求都已经满足了，最后我们再来补全`出现动静>截取摄像头画面>推送图像`这个环节。

群晖本身自带的`动静通知`功能，也能通过`DS Cam`接受通知，这里我没有使用自动的方案，而是通过`Node-Red`来实现。

![](https://c2.is26.com/blog/2024/02/camera/c-16.jpg)

首先放流程图，整个的流程逻辑是这样的:

- Node-Red 暴露一个`http`接口`/api/camera/capture`,用于被动接受群晖的`WebHook`请求
- Node-Red 通过网络请求，调用群晖`Surveillance API`接口，获得当前所有摄像头信息
- 继续通过网络请求，调用群晖`Surveillance API`接口，截图指定摄像头的实时画面
- 最终将获得的截图发送到 Telegram

同理，最终的通知截图也可以使用`钉钉`、`企业微信`等其他渠道，我选择 Telegram 是因为之前已经集成了，加上 Telegram 对内容几乎完全没有审核，相对而言我更放心点。

复制下面的 JSON ，导入到 Node-Red，修正对应的账号、密码、IP、端口和 Telegram bot ChatId 即可

<details>
  <summary>展开查看 Node-Red 流程配置文件</summary>

```json
[
  {
    "id": "a07703f3752fc82a",
    "type": "tab",
    "label": "抓取群晖摄像头推送到Telegram",
    "disabled": false,
    "info": ""
  },
  {
    "id": "3902801a557a738e",
    "type": "www-request",
    "z": "a07703f3752fc82a",
    "name": "获取sid",
    "method": "GET",
    "ret": "obj",
    "url": "",
    "follow-redirects": true,
    "persistent-http": true,
    "tls": "",
    "x": 880,
    "y": 300,
    "wires": [["cabd07b9c918bd13"]],
    "inputLabels": ["输入"],
    "outputLabels": ["输出"]
  },
  {
    "id": "6e7a90e85b1d736b",
    "type": "change",
    "z": "a07703f3752fc82a",
    "name": "设置群辉用户名、密码、摄像头ID",
    "rules": [
      {
        "t": "set",
        "p": "dsm_account",
        "pt": "msg",
        "to": "username",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "dsm_passwd",
        "pt": "msg",
        "to": "password",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "dsm_camera_id",
        "pt": "msg",
        "to": "1",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "dsm_domain",
        "pt": "msg",
        "to": "10.0.0.5",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "dsm_port",
        "pt": "msg",
        "to": "5000",
        "tot": "str"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 420,
    "y": 240,
    "wires": [["c18d4fe0633037a4"]]
  },
  {
    "id": "833f9be33b550d84",
    "type": "www-request",
    "z": "a07703f3752fc82a",
    "name": "GetSnapshot",
    "method": "GET",
    "ret": "bin",
    "url": "",
    "follow-redirects": true,
    "persistent-http": true,
    "tls": "",
    "x": 890,
    "y": 500,
    "wires": [["45ea4313512d68a6", "1957d8308081700b"]]
  },
  {
    "id": "c18d4fe0633037a4",
    "type": "function",
    "z": "a07703f3752fc82a",
    "name": "url_sid",
    "func": "msg.url = `http://${msg.dsm_domain}:${msg.dsm_port}/webapi/auth.cgi?api=SYNO.API.Auth&method=login&version=3&account=${msg.dsm_account}&passwd=${msg.dsm_passwd}&session=SurveillanceStation&&format=cookie`;\nconsole.log(msg)\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 690,
    "y": 240,
    "wires": [["3902801a557a738e"]]
  },
  {
    "id": "f3df28b20f02dd3e",
    "type": "function",
    "z": "a07703f3752fc82a",
    "name": "url_snapshot",
    "func": "var sid;\nsid = msg.payload.data.sid;\nmsg.url = `http://${msg.dsm_domain}:${msg.dsm_port}/webapi/entry.cgi?version=9&id=${msg.dsm_camera_id}&api=\"SYNO.SurveillanceStation.Camera\"&method=\"GetSnapshot\"&profileType=0&_sid=${sid}`;\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 690,
    "y": 500,
    "wires": [["833f9be33b550d84"]]
  },
  {
    "id": "cabd07b9c918bd13",
    "type": "switch",
    "z": "a07703f3752fc82a",
    "name": "",
    "property": "payload.error.code",
    "propertyType": "msg",
    "rules": [
      {
        "t": "nnull"
      },
      {
        "t": "else"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 570,
    "y": 400,
    "wires": [["3902801a557a738e"], ["f3df28b20f02dd3e"]],
    "inputLabels": ["输入"]
  },
  {
    "id": "dcb9b48e6b3c1fee",
    "type": "inject",
    "z": "a07703f3752fc82a",
    "name": "手动触发",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 140,
    "y": 220,
    "wires": [["6e7a90e85b1d736b"]]
  },
  {
    "id": "45ea4313512d68a6",
    "type": "image",
    "z": "a07703f3752fc82a",
    "name": "",
    "width": "360",
    "data": "payload",
    "dataType": "msg",
    "thumbnail": false,
    "active": true,
    "pass": false,
    "outputs": 0,
    "x": 1120,
    "y": 500,
    "wires": []
  },
  {
    "id": "c8427c30a83ac775",
    "type": "telegram sender",
    "z": "a07703f3752fc82a",
    "name": "",
    "bot": "ff58d9095b6d2cda",
    "haserroroutput": true,
    "outputs": 2,
    "x": 1420,
    "y": 780,
    "wires": [[], []]
  },
  {
    "id": "1957d8308081700b",
    "type": "function",
    "z": "a07703f3752fc82a",
    "name": "图像转TG格式",
    "func": "msg.payload = {\n    chatId: 10000, \n    type: \"photo\",\n    content: msg.payload,\n    caption: \"家里有动静,监控提醒\"\n};\nreturn msg;\n",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 880,
    "y": 740,
    "wires": [["c8427c30a83ac775"]]
  },
  {
    "id": "02fe4781ca3fbb7b",
    "type": "http in",
    "z": "a07703f3752fc82a",
    "name": "/api/camera/capture",
    "url": "/api/camera/capture",
    "method": "get",
    "upload": false,
    "swaggerDoc": "",
    "x": 90,
    "y": 280,
    "wires": [["6e7a90e85b1d736b", "fb5663502a675986"]]
  },
  {
    "id": "fb5663502a675986",
    "type": "http response",
    "z": "a07703f3752fc82a",
    "name": "",
    "statusCode": "200",
    "headers": {
      "code": "0"
    },
    "x": 600,
    "y": 680,
    "wires": []
  },
  {
    "id": "ff58d9095b6d2cda",
    "type": "telegram bot",
    "botname": "拉布管家",
    "usernames": "",
    "chatids": "10000",
    "baseapiurl": "",
    "updatemode": "polling",
    "pollinterval": "300",
    "usesocks": false,
    "sockshost": "",
    "socksprotocol": "socks5",
    "socksport": "6667",
    "socksusername": "anonymous",
    "sockspassword": "",
    "bothost": "",
    "botpath": "",
    "localbotport": "8443",
    "publicbotport": "8443",
    "privatekey": "",
    "certificate": "",
    "useselfsignedcertificate": false,
    "sslterminated": false,
    "verboselogging": false
  }
]
```

</details>

有关这部分的参考文章:

- [NodeRed + Surveillance Station Web API + goCQhttp 监控动检自动推送](https://bbs.hassbian.com/thread-21241-1-1.html)
- [node-red-contrib-telegrambot](https://flows.nodered.org/node/node-red-contrib-telegrambot)

![](https://c2.is26.com/blog/2024/02/camera/c-19.jpg)

配置好了之后，建议在群晖摄像头的`事件检测`那里再精确配置下`动作检测区域`和灵敏度，避免误报。

## 总结

从购买摄像头到最终的监控系统搭建，整个过程大概花了我一个下午的时间。基本上所有的步骤，都能在网上找到详细的教程和资料。

除了上面所说的功能，理论上，只要想法够多，还能实现更多的功能，比如:

- 想要云端存储，配置个同步任务，把监控视频同步到云盘即可（哪怕家里被人放火烧了，也能看到过去的视频）
- 想要人脸或者宠物识别: 接入图像识别 API，实现人脸识别（实现更精确的动静通知）

小小的捣鼓一番，获得一个功能基本完善，但是更安全和经济的自主监控方案，还是一次挺有趣的折腾过程。
