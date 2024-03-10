---
title: 如何给 Lycamobile 充值任意金额的话费  |  突破淘宝最低5美元限制 | ZUOLUOTV | VLOG37
date: "2019-04-03"
cover: https://c2.is26.com/blog/2019/04/lyca/c-4.jpg
categories:
  - zuoluotv
tags:
  - zuoluotv
  - digital
---

## 视频

- [Bilibili:如何给 Lycamobile 充值任意金额的话费 | 突破全网最低5美元限制](https://www.bilibili.com/video/av48214410) : 推荐大陆用户观看。
- [YOUTUBE:如何给 Lycamobile 充值任意金额的话费 | 突破全网最低$5限制](https://www.youtube.com/watch?v=RfRgZSF1MtE) : 推荐海外用户观看

## 更新

**2019年6月15日:本视频所介绍的方法已经失效，Lyca 在中国地区已经无法免费漫游，建议弃用 Lyca。**

## 步骤

- 使用 Chrome
- 进入[Lycamobile官方充值页面](https://www.lycamobile.us/en/checkout/)
- 先输入你的手机号
- 右键 > 检查 > 进入开发者工具 > 进入Console

输入下面这行代码

```javascript
getTopupCart(1, "");
```

括号内第一个参数即为自定义充值的金额，可以修改成任意你想充值的金额。

接下来就是按照标准流程，**填写 Billing 地址，支付**就好了。

充值成功后，邮件和短信，都会受到确认通知。

#### 关于这个是否是漏洞

这个文章今天发在了V2ex上，有网友提示这是「钻空子」行为，想一想，这个严格意义上的确是绕过了官方的机制，虽然这个「漏洞」实在是太低级和弱智了。

还是谢谢网友们的提醒，如果有不恰当的地方，还请多指正。

写了一封 Report Mail 给 Lycamobile 官方，说明了这个漏洞的情况，看下他们什么时候回复吧。

![](https://c2.is26.com/blog/2019/04/lyca/c-4.jpg)

```shell
Hi,I am a Web Developer. Recently i found a bug of lycamoible online recharge system.
The minimum of Top-up amount is $10 on the page https://www.lycamobile.us/en/checkout/
But it seems the backend system do not limit user to change the Top-up amount in front end.
User can execute a one line javascript code in browser's console to custom a top-up amount and progress successfully.
This image shows  how it works:
photo_2019-04-04_10-24-07.jpg
The getTopupCart() is a global function in the Javascript Code.
This bug  will only change the top-up amount in the frist step, the following billing and payment progress works by page's instructions.
Please forward this mail to your IT group,This might help.
```

#### 后续

4月6日，官方反馈已经转给了相关部门。

![](https://c2.is26.com/blog/2019/04/lyca/c-5.jpg)
