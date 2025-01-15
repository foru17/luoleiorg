---
title: "2024年:我用的手机和宽带套餐"
date: "2024-12-1"
cover: https://c2.is26.com/blog/2024/12/network/n-0.jpg
---

最近这段时间，重新整理了下家里的运营商套餐。也整理下一些对几个运营商和网络的感受和体验，分享给大家。

除了国内运营商的套餐，也分享了一些境外的套餐，供参考。

## 🇨🇳 国内套餐总览

| 运营商   | 套餐                | 主卡 | 副卡 | 通话     | 流量  | 宽带    | IPTV | 月均 | 性价比 |
| -------- | ------------------- | ---- | ---- | -------- | ----- | ------- | ---- | ---- | ------ |
| 深圳联通 | 5G畅爽冰激凌199元   | 1    | 4    | 1000分钟 | 60GB  | ✅1000M | ✅   | ¥89  | 高     |
| 东莞电信 | 5G畅享融合189元套餐 | 1    | 2    | 1000分钟 | 40GB  | ✅1000M | ✅   | ¥189 | 低     |
| 深圳广电 | 惠民年卡            | 1    | 1    | 100分钟  | 118GB | ❌      | ❌   | ¥19  | 高     |

## 网络和宽带评分

| 运营商   | 信号覆盖 | 境内网络质量 | 跨境网络质量 | 公网 IPv4 | 公网 IPv6 | 客服      | 评分      |
| -------- | -------- | ------------ | ------------ | --------- | --------- | --------- | --------- |
| 深圳联通 | 😐一般   | 😐一般       | 👍好         | ❌        | ✅        | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐☆ |
| 东莞电信 | 👍好     | 👍好         | 👎差         | ✅        | ✅        | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆  |
| 深圳广电 | 👍好     | 😐一般       | 👍好         | -         | -         | ⭐⭐☆☆☆   | ⭐⭐⭐☆☆  |

**注意**:这里仅仅是我自己的体验和主观评分，不同地区、不同用户的体验可能会有所不同。

## 深圳联通

之前我深圳家里一直用的电信 ¥299/月的 5G 融合套餐，绑定了三年的合约，给电信交了上万块的费用，价格昂贵。

2022 年的时候，携号转网到了联通，当时运营商对于携转用户有很大的优惠。原价 ¥199 的套餐三折后只需要 ¥69 /月（所谓:三折冰），包含了 1 张主卡、2 张副卡，1000 分钟通话、60GB 流量、1000M 宽带。

### 手机卡

目前我的主力卡用用的就是联通，4 张副卡都满了，实际花销是 ¥69 + ¥10×2(副卡) = ¥89/月。

如果只使用 1-3 张卡，每个月 60GB 的流量，卡均 20GB 的流量，一家三个人或者三台设备用还是很划算的，但是现在我的 4 张副卡都满了，卡均流量下降到了只有 12GB，多出的两张副卡，额外 ¥20 月租，就有点不太划算了。

### 宽带

联通这个套餐附带 1000M 的宽带，过去一直有「南电信北联通」的说法，但是现在体验上，基本已经没有太大差别。

如果你有跨境网络的需求，联通的宽带比电信要好很多很多。电信到了晚上高峰期，掉包和延迟都有点惨，相比一下联通就好太多了。

但是联通 2024 年开始有了一个致命的问题，可能是前两年拉新的用户太多，加上大量用户使用联通挂 PCDN，现在联通宽带除了不再给 IPv4 的公网，甚至连 IPv6 的公网都不再给了，NAT 也将为了 NAT4。我深圳家中联通尚且还剩下公网的 IPv6.

除此之外，联通对于跨省和跨运营商进行限速，到了晚上高峰期，上行速度被限制到 5Mbps，对于我这种需要跨运营商访问家里 NAS 的用户来说，实在是太痛苦了。有关这个问题，我之前也发了一条[推](https://x.com/luoleiorg/status/1849472909787672962):

<TweetCard
tweetId="1849472909787672962"
twitterId="luoleiorg"
author="luolei"
time="下午11:27 · 2024年10月24日"
:content="'今年，各大运营商在家庭用户宽带、公网IP、NAT以及跨省和跨运营商通信等方面，频繁采取限制或劣化网络质量的小动作。\n昨天，我用电信连回深圳联通家宽，联通的上行带宽被限制到 5Mbps( IPv6/tcp 直连)，但当我切换使用联通网络重联时，联通家宽上行则恢复正常(跑满上行 50Mbps)。\n问题说大不大，说小不小，万一你有个文件互传之类的需求，就很蛋疼了。\nV站近几个月也陆续出现了相关帖子，涉及全国范围，具体的原因也有讨论涉及:\n🔗 每晚八点开始，跨运营商限速 https://v2ex.com/t/1082680\n🔗 [讨论] 最近种种迹象表明三大都开始偷偷限制骨干节点跨网互联\nhttps://v2ex.com/t/1082839\n🔗 广东联通和广东电信宽带互通已被限速\nhttps://v2ex.com/t/1073989'"
avatar="https://pbs.twimg.com/profile_images/1550157622300786688/672YmCpB_400x400.jpg"
comment=44
like=524
image="https://c2.is26.com/blog/2024/12/network/n-1.jpg"
/>

其中提到的几个讨论帖子，建议大家可以看看:

- [每晚八点开始，跨运营商限速](https://v2ex.com/t/1082680)
- [讨论:最近种种迹象表明三大都开始偷偷限制骨干节点跨网互联](https://v2ex.com/t/1082839)
- [广东联通和广东电信宽带互通已被限速](https://v2ex.com/t/1073989)

在这里还得吐槽下联通的客服，经常能收到联通打过来的推销电话，基本上是 1 到 2 个月一通吧。相反电信这几年基本没打过电话。

## 东莞电信

**对于电信这个套餐，现在我感觉就是一个鸡肋：食之无味，弃之可惜**。而且电信宽带两个极端的优点和缺点，又让我十分纠结要不要退掉。

现在我东莞家电信宽带：¥189/月，1 张主卡，2 张副卡，1000 分钟通话，40GB 流量，送了一个 IPTV。一开始是 500M 宽带，后面免费升级到 1000M。

### 手机卡

现在东莞这几个号给家里人用做流量卡，每个月 40GB 放到现在来说，是在是太少了。我不用东莞的号码，所以手机号对于我来说倒无太大影响。

### 宽带

电信宽带的好处就不多说了，「稳定」算是优点。访问国内的网站，玩游戏基本都是低延迟（虽说我不怎么玩国内的游戏）。

上面说到了「又爽又痛」极端的两个点，首先说爽的的地方：

- **公网 IPv4 + IPv6**: 从2023年起，深圳和东莞的电信都不再给普通家宽用户提供公网 IPv4 的地址，现在运营商的口径卡得很死，深圳要动态公网 IP 需要额外 ¥100/月。东莞不清楚，但是现在新开的宽带肯定是没有公网 IPv4 了。
- **上行稳定，不限速**: 电信的宽带上行速度稳定，不限速，不管是跨省还是跨运营商，都是正常的速度。

其实说来也是有点搞笑，上面说的公网IP，放到之前都是基础的服务，现在却成了需要额外申请甚至花钱的地方。我家里有 NAS，平时也经常需要连回家里， DDNS 解析公网 IP，一键回家，并且能够有 50Mbps 的上行带宽，从家里的 NAS 读取文件，看监控，都是很方便的。

- [中国电信东莞公司宣布停止提供普通宽带公网IPV4地址服务](https://www.cnbeta.com.tw/articles/tech/1343251.htm)
- [东莞电信 - 关于停止提供普通宽带公网 IPV4 地址服务的公告](https://www.v2ex.com/t/914321)

下面就是痛的地方:

**电信的跨境网络质量实在是太差了**，我目前主要使用美国和香港的服务器，由于安全的关系，我所有的服务器都是自建，线路一般，让我不得不采用各种优化策略。不像联通和移动，经常直连就能跑满跨境带宽。

除此之外，每个月 ¥189 的价格，对比其他家融合套餐只需百元，还是有点贵，每个月贵上百来块，几年下来，也是几千了（我又想起了之前深圳电信¥299三年，花了一万的冤种历史）。

前几个月我也有考虑退掉电信宽带，改成深圳联通的[异地宽带](https://post.smzdm.com/p/ag4lx603/)，500M 单宽带每个月只需 ¥60，甚至已经预约安装。

但是与安装的小哥再三确认后发现，现在新装的宽带，不仅没有了公网 IPv4（这个尚且能理解），甚至**连公网的 IPv6 都没有了**，这样我就没办法直连回家里的 NAS 了，虽说我也有其他穿透的方案，但是少了直连，总还是有点不爽。

## 深圳广电

十月的时候，新开了一张中国广电的卡，广电号称是第四大运营商，使用移动的基站。我开了一张惠民年卡，¥228/年，每个月 100GB 的流量，叠加活动每个月增加 3+5+10=18GB流量。现在每个月 118GB 的流量，我拿来当副卡放随身 Wi-Fi，另外开了一张副卡，每个月¥6，给我上大学的弟弟当流量卡。

- [最小巧的 5G 随身 Wi-Fi: 中兴 F50](https://luolei.org/zte-f50)

广电在深圳、东莞两地的使用体验还是挺不错的，一线城市移动覆盖好，广电用起来还可以，但是偶尔在地下室，停车场可能失联。总之拿来作为一个流量卡还不错，不建议主力使用。

## 🌏 境外套餐总览

| 国别地区    | 运营商       | 套餐         | 流量  | 通话                  | 短信 | 当地月租 | 实际成本 |
| ----------- | ------------ | ------------ | ----- | --------------------- | ---- | -------- | -------- |
| 🇲🇴 澳门     | 中国电信澳门 | 三地学生套餐 | 60GB  | 600分钟               | 0条  | MOP$94   | ¥85      |
| 🇺🇸 美国     | Ultra Mobile | Paygo        | 100MB | 100分钟(Wifi-Calling) | 100  | $3       | ¥22      |
| 🇭🇰 香港     | Club Sim     | eSIM         | -     | -                     | -    | $0       | ¥1       |
| 🇸🇳 尼日利亚 | MTN          | eSIM         | -     | -                     | -    | $0       | ¥1       |

## 🇲🇴 中国电信澳门

2020 年的时候，远程办了一张中国电信澳门的合约卡，188澳门币/月，包含了 60GB 流量，600分钟通话，0条短信。实际成本是人民币 ¥85/月。

这个是中国电信澳门对于留学生的套餐，除了提供一个澳门的号码，还有一个珠海的号码一卡双号。如果在内地使用则半价，澳门的IP，可以合法合规使用 Google、YouTube 等服务。每个月 60GB 的流量极其充足，我拿来当主力卡使用。

这个卡国内办卡的路子已经没了，今年也修改了合约，后续不再是全年都半价，改成了「寒、暑假期间（每年12月至次年2月、6月至8月期间），如当月离澳累计共十天或以上，即可享离澳期间每日日均价单半价优惠」。算了下成本从原本的 ¥85/月，变成了 ¥125/月。

除了支持在内地漫游，还支持在香港使用，如果经常去香港玩的话，省了开内地号码的漫游。总之这个澳门卡，对得上曾经「神卡」的地位。

当然，说了好处，也说说缺点，中国电信澳门这卡在内地，大多情况只能 4G 漫游，只有在少数 NSA 基站才有 5G 网络(例如深圳福田口岸、深圳湾口岸）。大多情况下 4G 漫游能跑到 50Mbps 的速率，日常使用没问题。

## 🇺🇸 美国 Ultra Mobile

从 Google Voice 携号转网到了 Ultra Mobile 美国实体手机卡，然后又转成了 eSIM，。注册大多境外服务都能通过校验。每个月 $3 的纯花销，这算是拥有一个「正宗美国手机号」所需付出的代价吧。

我是通过我美国的朋友帮我线下操作的，所以还算顺利。

## 🇭🇰 香港 Club Sim

目前香港最便宜的手机号解决方案，理论上是 $0/月，支持 eSIM。有关这个卡网上也有很多的分享了，适合需要长期持有一个香港手机号的用户。

## 🇸🇳 尼日利亚 MTN

这个比较小众了，我前段时间做了尼日利亚的 BNV 和 NIN 的办理，拥有了一个合法合规的尼日利亚身份。也顺便办了一个 MTN 的 eSIM。开卡花了一点钱，持有成本很低。纯保号用。

## 总结

对于境内的套餐，我的建议是：如果你感觉现在的套餐有点贵，可以咨询下当地携号转网的优惠，现在联通、移动对于携转用户，基本还是能给到不错的折扣。

如果你不想转网，也可以主动联系下自己运营商的客服，表明「现在其他套餐更优惠，其他运营商更优惠，可能携号转网」之类的话，对于运营商来说，客服或者营销部门都有一定的灵活操作空间。

反正**问一下又不花钱，万一省下来了呢**。