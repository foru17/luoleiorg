---
title: Cloudflare 创业扶持计划申请经验
date: "2025-1-12"
cover: https://c2.is26.com/blog/2025/01/cloudflare/c-1.jpg
tags:
  - Cloudflare
  - 创业
---

最近申请了 Cloudflare 的创业扶持计划并获得了通过，拿到了 $5000 的额度。

这个计划是 CF 家去年 9 月上线的，由于中文社区暂时没看到相关的分享案例，特此整理申请经验，希望能帮助到有类似需求的开发者。

**提醒：这是 Cloudflare 为创业者提供的正式支持计划，希望大家珍惜资源，善意申请和使用。滥用可能会影响后续申请者的审核难度。**

## 项目概况

- 申请地址：[cloudflare.com/forstartups/](https://cloudflare.com/forstartups/)
- 官方博客: [Startup Program revamped: build and grow on Cloudflare with up to $250,000 in credits](https://blog.cloudflare.com/zh-cn/startup-program-250k-credits/)
- 支持额度：最高可提供 $250K
- **额度使用期限：自审批通过起 1 年内有效**

## 申请条件

满足以下任一条件即可申请（最终需通过人工审核）：

### 基本条件：

- 正在开发基于软件的产品或服务
- 公司成立不超过 5 年
- 获得了 5 万到 500 万美元的融资
- 拥有 LinkedIn 账号
- 拥有有效的网站和邮箱地址

### 加分项：

- 属于认可的创业加速器
- 账号邮箱与域名匹配

上面是官方的要求，实际并不是特别严，填写的内容也不要额外提供营业执照或者公司注册文件之类的，实际上我唯一提供的就是产品的官网。

## 申请经验分享

### 产品准备

- 建议有实际的产品和可访问的官网（我有一个面向海外的商业 SaaS 应用，官网都齐全）
- 最好已经在使用 Cloudflare 的产品（我的业务有付费使用 R2 、Images 、Worker ）
- 可以附上自己的开源项目、Github 、Twitter 等社交媒体资料，这些可能会有加分

### 材料准备

- Comments 部分一定要认真填写，这是审核的重要参考，可以说说自己的产品是做什么的，自己的团队未来可能会开发什么产品。
- 建议使用公司域名邮箱 -尽可能完整描述你的产品和团队情况

## 审核时间

我填完申请表格后，大约两个星期之后，收到了确认邮件。

下面是邮件的原文部分:

```plaintext
Congratulations! We’ve successfully applied the Cloudflare credits to your account for up to $5,000 US

What does this mean?

You now have up to 1 year to use up to $5,000 USD in credits. The credits will expire after one year or when they are fully used, whichever happens first.

Please note that you won’t see the credits directly in your Cloudflare dashboard, because this is a new program and that functionality doesn't exist yet. You will be able to see your remaining credit balance on your invoices for usage-based products.

For usage-based billing products (such as Workers usage, Argo traffic, R2 Object Storage, Stream, etc.), your invoices will draw down from the $5k credit. You’ll see a $0 owing at the bottom of your invoice, and the remaining credit balance will be shown at the top left.

For recurring billing products (such as Pro or Business plans, or the $5 monthly fees for Argo and Workers), the invoices will simply be marked as $0 without drawing down from the credits. So don't worry that these invoices look a little different.

Please read all terms and conditions that apply to the Startup Program here and here; including but not limited to: all Registrar purchases are excluded from the credits and must be paid for in full using the payment method associated with your account, and there is a limit of up to $5,000 USD for any R2 or Cache services.

Upgrading to Enterprise Plan

If you’re ready to upgrade your domain to an Enterprise plan, follow these steps:

Log into your Cloudflare Dashboard.

Under "Websites," click on the website you'd like to upgrade.

On the "Overview" tab, scroll down to "Active Subscription," and click "Change" next to your current plan type.

On the next page, select "Enterprise" and click "Confirm" to upgrade your zone.

This process ensures you can fully leverage the benefits of your Enterprise-level credits.
```

## 额度使用说明

下面这部分是审核确认邮件中的额外说明:

### 按量付费产品

以下产品费用会从额度中扣除：

- Workers 使用费用
- Argo 流量费用
- R2 对象存储
- Stream 服务等

### 固定订阅产品

以下费用会直接显示为 $0：

- Pro/Business 订阅费用
  -Argo 月费（$5 ）
  Workers 月费等

### 使用限制

域名注册相关费用不包含在内
R2 或 Cache 服务使用额度上限为 $5000

### 注意事项

- 目前仪表盘无法直接显示剩余额度
- 可通过月度账单左上角查看额度使用情况
- **额度有效期为一年，用完或到期即止**

## 总结建议

Cloudflare 被成为赛博菩萨，我自己也使用了 Cloudflare 的许多产品和服务，如果你正在开发面向海外市场的产品，尤其是如果你已经在使用 Cloudflare 的产品了，建议可以申请这个扶持计划。
