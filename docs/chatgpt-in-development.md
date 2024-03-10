---
title: "如何用 ChatGPT 助力开发: 已经有 15 万人看过的经验分享"
date: "2023-06-09"
cover: https://c2.is26.com/blog/2023/06/chatgpt/c-0.jpg
categories:
  - code
tags:
  - ai
  - chatgpt
  - 编程
---

自从年初开始关注这波 AI 浪潮，我将 AI 纳入了自己的工作流程，已经有一段时间了。现在我基本上一有机会就向他人推荐，建议尽快将 AI 引入开发流程。

这篇博客是我在[推特](https://x.com/luoleiorg/status/1662145013151858689)上发布的总结，得到了不少转发和收藏。

今天这篇文章，分享一些目前自己利用 AI 服务相关的一些经验、工具和服务。

截图这个基本就是我目前工作时的桌面状态。一般就是左边小窗开一个 ChatGPT ，右边VSCode + GitHub Copilot 插件。接下来展开讲讲。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-1.jpg)

## **一.门槛**

过去由于众所周知的原因，我们在访问一些境外服务时，需要采用一些科学手段。但现在由于各种现实原因，技术上开始进行反向封锁。

现在中国（包括港澳地区）用户访问 ChatGPT，都回面临种种问题。概况下来就是注册、支付、网络三块。

### **1.1 注册**

- **手机号**:ChaGPT 目前限制中国地区手机号注册，对某些境外的虚拟运营商号段也要限制处理。建议有条件可以购买境外实体手机号。
- **支付**: 付费使用 ChatGPT Plus 和 API需要绑定信用卡，OpenAI 支付服务商接入的是 stripe，不仅需要境外行用卡（VMA），还会在支付环节校验用户 IP，极其严格的风控。
- **网络**: 目前 OpenAI 仅对有限国家地区提供服务，在网络这层不仅限制 IP 地区，还会根据是否是机房 IP 进行风控，所以也出现即使已经挂了代理，依旧被 Blocked 的情况。

手机卡、银行卡、网络，每一道都是一道需要解决的门槛，已经有很多公开分享了。建议大家善用关键字，搜索解决方案。

个人经验是建议，从账号安全和隐私角度考量，注册和支付都尽量自己解决，不要去使用代注册和代付，网络使用 CloudFront 和 Warp 等方案自己解决公共 IP 代理问题，这样能解决很多风控问题。

**1.2 网络代理策略**

目前我的方案是：不管我使用哪个代理，都会把所有 OpenAI 的相关域名请求，都转发到我的唯一美国服务器，在落地的美国服务器再通过 warp 套了层 IP，保证了落地 IP 的稳定。网络是个影响使用体验的东西，不稳定的网络对工作影响也不小。我的 Azure API 没批下来，要不应该会省心不少。

```json
{
  "domain": [
    "openai.com",
    "ai.com",
    "chat.openai.com.cdn.cloudflare.net",
    "openaiapi-site.azureedge.net"
  ]
}
```

以上截图是我的代理链路某层路由的策略，对于这些 OpenAI 相关的域名，我都强制转发到美国服务器，确保了落地 IP 的稳定性。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-3.jpg)

检测 ChatGPT 代理是否成功的技巧:

- 检测地址: [https://chat.openai.com/cdn-cgi/trace](https://chat.openai.com/cdn-cgi/trace)

其他使用 Cloudflare CDN 的网站也能这么测试，原理是使用 Cloudflare CDN 的网站都有 `/cdn-cgi/trace` 这个调试页面，会显示你访问 Cloudflare 节点的网络信息。

这个接口会返回你的用户访问 IP 地址（代理IP）、访问到的 ChatGPT 的 Cloudflare 的节点 CDN ，以及 warp 网络状态等。这种方法非常方便用于调试。可以用于判断你是否使用预期的代理 IP 访问 ChatGPT。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-4.jpg)

API 层，建议不要直接使用 [https://api.openai.com](https://t.co/dDi4QesNCb) 官方接口，也可以使用 Cloudflare Worker 之类的转发方案套一层，前置域名固定，后面调整和负载什么的也都方便。我个人也用过腾讯云函数，但是我腾讯云转 OpenAI API 用没多久，就被腾讯说违规使用境外代理警告了，也不确定合规不。

有关这部分的一些技术方案，可以参考以下几篇文章：

- [Cloudflare WARP 教程：给 VPS 额外添加“原生” IPv4/IPv6 双栈网络出口](https://p3terx.com/archives/use-cloudflare-warp-to-add-extra-ipv4-or-ipv6-network-support-to-vps-servers-for-free.html)
- [Cloudflare WARP 一键安装脚本 使用教程](https://p3terx.com/archives/cloudflare-warp-configuration-script.html)
- [使用 Cloudflare Workers 让 OpenAI API 绕过 GFW 且避免被封禁](https://github.com/noobnooc/noobnooc/discussions/9)

## **二.服务**

网络和接口稳定性的问题解决了，接下来的就是一些服务推荐了。我并没有直接使用 ChatGPT 官方的地址，而是选择开源项目 Pandora ,自建了一个网页，缓存了 Access Token，14天免登录，配置接口换成自己的转发 API，家里老婆也能不挂代理直接用。访问也更快，不依赖我使用设备的网络情况。

- [Pandora: 潘多拉 (Pandora)，一个让你呼吸顺畅的 ChatGPT。](https://github.com/pengzhile/pandora)

![](https://c2.is26.com/blog/2023/06/chatgpt/c-5.jpg)

Pandora 这个十分适合团队初始阶段用，只需要一个人解决账号和网络问题，其他人可以跳过注册、支付、网络三个拦路虎。

在数据脱敏和公司安规允许的前提下，强烈建议有条件的团队，可以先内部整一套，先让团队的人能方便的用起来，解决有无的问题先。虽然我们公司内部也有开发了基于 AI API 的对话网站，但不如这个好用。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-6.jpg)

除了一些 AI 应用使用自己的接口服务，许多产品都提供自定义 API key 或第三方代理接口。需要注意的是，在非开源项目中，提交 API Key 需谨慎。对于使用客户端产品的用户来说，建议抓包，检查客户端是否向第三方接口请求带有与 API Key 相关的参数。由于经过了第三方服务器，理论上存在泄漏、盗用风险。

至于其他第三方的 AI 应用和工具，目前我个人在使用的是开源项目 chatbox，相对而言用起来更加放心。

- [Chatbox is a desktop app for GPT-4 / GPT-3.5 (OpenAI API) that supports Windows, Mac & Linux.](https://github.com/Bin-Huang/chatbox)

## **三.辅助开发**

来到开发阶段，我是一个前端工程师，但是做的事情比较杂，从前端业务到服务端到运维都有涉及。过去这段时间，我的开发习惯已经极大被 AI 改变，相比 Github Copilot 而已，ChatGPT 的影响更大。目前我用 AI 对自己实际的开发主要还是在

- 1.Debug
- 2.优化代码

相信与很多开发者一样，目前大部分工作其实都是轮子。

这块恰好是 AI 的优势的地方。过去我要写一个模块代码，可能是这样的步骤

- 1.去 Google 搜关键字
- 2\. copy paste
- 3.基于业务需求和自己经验，修改具体的代码
- 4\. run & debug & fix
- 5\. done & commit

现在在 AI 的加持下，我则改成了

- 1.思考好具体的需求
- 2.想好这个具体代码需求的 promot
- 3.让 Copilot 和 ChatGPT 先我一段示例代码
- 4.基于自己的经验，再补充兜底、异常等边界条件
- 5.copy paste 到开发环境 run
- 6.如果出错, log 丢回 AI，debug & fix

自从年初开始关注这一波 AI 浪潮，我把 AI 加入自己的工作流已经有段时间，现在基本是逢人就安利，建议尽快把 AI 介入开发流程。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-12.jpg)

![](https://c2.is26.com/blog/2023/06/chatgpt/c-7.jpg)

还有一个高频的场景，就是已有的代码优化，把历史代码片段复制，让 ChatGPT 分析、优化代码，并给出优化的原因点在哪。这块只建议小范围代码使用，遇到过几次 AI 自作主张移除不起眼的代码情况。这种算是 AI 给你 CodeReview 了。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-8.jpg)

## 四.感受

使用 ChatGPT 后，我的另一个变化就是，让自己又重新回到了一个更自在的不会有社会压力「学生」身份。

日常观察到不少程序员和开发者，工作之后，不擅长问其他人问题，往往喜欢自己闷头解决，有现实背景（大家工作都这么忙，老去问其他人也是不太好)。像我还是属于脸皮比较厚的，但是问的也不多。

现在我就特别享受在 ChatGPT 里不断追问和探索深度问题，反正 AI 不会累，我再弱智的问题他也不会嘲笑。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-10.jpg)

至于其他的写写脚本，写写插件，写写命令行，也都属于 AI 擅长的领域，最近我就用 AI 辅助，用不到 30 分钟，完成了从生产环境运维日志捞取所有请求，过滤业务路由入口，删除代码库的废弃 html 文件的工作。运维同学他省事，我也省事，都开心。

![](https://c2.is26.com/blog/2023/06/chatgpt/c-9.jpg)

断断续续写了这么点，这几个月用 AI 的微小经验和感受。

目前我的 Workflow 还远没到「泰裤辣」的层度，未来自己打算先梳理自己高频用的 prompt库，弄一些更自动化的方案。

一个感受吧，AI 还不会淘汰人，但会用 AI 的人会淘汰人。

程序员，或者说有能力使用这个目前最新生产力工具的人，最新依旧会是这一波浪潮的受益者。
