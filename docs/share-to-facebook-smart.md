---
title: 隔山打牛:给第三方网站做Facebook的Open Graph分享优化
date: "2015-04-07"
cover: https://c2.is26.com/blog/2015/04/facebook0.jpg
tags:
  - facebook
---

![cover](https://c2.is26.com/blog/2015/04/facebook0.jpg)

公司产品拥有大量的海外用户，有大量的针对国外用户的网页，最近有一个APP内部分享指定第三方网页到Facebook的需求。

#### 遇到的问题

Facebook对于网页，提供了`Open Graph Object`的解决方案。同Google类似，Facebook也有自己的爬虫，当你分享一个网页的时候，Facebook的爬虫也会抓取你指定网页的内容，并在你的网页上展示以下图样式卡片的方式展示出来。包含标题、简介、缩略图、来源网站，点击后可以跳转到指定的网站。

![](https://c2.is26.com/blog/2015/04/facebook1.jpg)

Facebook的爬虫，会优先抓取网页中的`<title>`和`<meta>`标签的中`description`来作为标题和描述的来源，并且默认按照上下顺序抓取`<body>`中的`<img>`来作为缩略图。

```html
<title>罗磊的独立博客</title>
<meta
  name="description"
  content="深圳人，帝都猎豹移动前端工程師，广州暨南大學，写原创博客八年，长距离跑者。"
/>
```

可是，第三方的网页，尤其是大量的国内网站，标题、描述往往都可能不是自己想要的。尤其是对于一些网页中穿插了大量乱七八糟广告的网页，最终分享到Facebook的卡片展示效果可能不如人意。

下面随便举一个国内网站的例子，该网页有大量的图片，用户原本想分享的是美女图片，结果可能出来的是乱七八糟的广告图片，标题和描述也重复了。

> 用户的时间和屏幕很宝贵，不要污染了用户的视线。

![](https://c2.is26.com/blog/2015/04/facebook2.jpg)

对于这个问题，我们想了一个曲线救国的方法，既然第三方网站不可控，那么我们可不可以做一个中转网页，来控制这些内容。

Facebook的`Open Graph Object`，通过支持在`<html>`中加入指定`<meta>`标签的方式，来指定分享的标题、描述、图片等等。

Facebook官方对此也鼓励网页中包含这些信息，供更友好地在Facebook上展示指定的网站，详细的可参考["Sharing Best Practices for Websites & Mobile Apps"](https://developers.facebook.com/docs/sharing/best-practices)。

```html
<!-- 网站名 -->
<meta property="og:site_name" content="罗磊的独立博客" />
<!-- 卡片类型:这个影响你在Facebook信息流中展现的方式，默认是website-->
<meta property="og:type" content="article" />
<!-- 标题 -->
<meta
  property="og:title"
  content="时间都去哪了?用RescueTime和WakaTime来记录你的时间"
/>
<!-- 描述 -->
<meta
  property="og:description"
  content="时间是不会说谎的 这句话，我跟几个朋友都说到过。"
/>
<!-- 指定的URL -->
<meta property="og:url" content="https://luolei.org/track-your-time/" />
<!-- 指定的缩略图 -->
<meta
  property="og:image"
  content="https://c2.is26.com/blog/2015/04/track-time.jpg"
/>
```

上面这六个，就是Facebook `Open Graph Object`最基础的几个属性，设置好了这个。我们再分享到Facebook，展现出来的内容，就是自己指定的内容了。调试的时候，可以使用Facebook官方的[Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)工具。可以很方便地抓取你网页的信息和预览显示在信息流上的样式。

除了这些基础的样式，如果你的网页需要通过第三方应用打开（参考Android的自定义scheme）,同样可以在`<meta>`中设置对应的Android应用信息。

以我们公司的产品举个例子，如果希望用户在Facebook浏览到我们的网页的时候，通过我们的应用Clean Master打开这个网页（有些私有的方法神马的嘛，拉用户blablalba之类的）

```html
<!-- Android APP 名称 -->
<meta property="al:android:app_name" content="Clean Master " />
<!-- Android apk包名 -->
<meta property="al:android:package" content="com.cleanmaster.mguard" />
<!-- APP私有的scheme方法:用指定app进行指定操作 -->
<meta
  property="al:android:url"
  content="cleanmasterlink://story/1000/balblabla"
/>
```

除了Android，iOS也可以根据自己的需求配置。

下面举个例子，我们用`php`来写一个简单的demo，让我们可以通过`URL`加参数的方式，进行跳转。

下面举个例子，只需要访问下面的链接，就能进行跳转。注意，url中的参数，都需要`encode`转码。

`https://www.cmcm.com/activity/cm-fb-deeplink/cmnow.php?language=en&shareurl=http%3A%2F%2Fwww.buzzfeed.com%2Fstaceygrant%2Fwe-already-know-the-answer%3Fs%3Dmobile_app&title=Can+We+Guess+Your+Favorite+Movie+Of+All+Time%3F&sitename=Life&des&imgsrc=http%3A%2F%2Fd23u97t244g2mp.cloudfront.net%2F20150408%2Flist%2F29550ab39527.jpg&cmurl=cleanmasterlink%3A%2F%2Fwebview%2Fhttp%3A%2F%2Fwww.buzzfeed.com%2Fstaceygrant%2Fwe-already-know-the-answer%3Fs%3Dmobile_app`

`<body>`

网页跳转有多个方法，可以通过在`<meta>`标签中`refresh`的方式

`<img>`

可是有些爬虫会默认抓取最终的网页，为了避免可能存在的风险，我们在页面底部使用`js`的方法进行跳转。

```html
<title>罗磊的独立博客</title>
<meta
  name="description"
  content="深圳人，帝都猎豹移动前端工程師，广州暨南大學，写原创博客八年，长距离跑者。"
/>
```

最终，完整的页面代码如下

`Open Graph Object`

注意的是，`og:url` 务必填写当前中转页面的url`$escaped_link`

![](https://c2.is26.com/blog/2015/04/facebook3.jpg)

如果你的初始url是`a.com`，而通过`php`或者`js`进行跳转到`b.com`，最终facebook收录的还是`b.com`的资料。而如果设置了`og:url`，则只会抓取`og:url`中的url对应网页中的`<meta>`信息，而忽略了跳转。

试一试我们刚刚的链接，查看下源代码。

![](https://c2.is26.com/blog/2015/04/facebook4.jpg)

已经是符合Facebook的页面，都是我们指定的信息。

再在Facebook的[Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)中测试下，也已经是我们需要的样式。

![](https://c2.is26.com/blog/2015/04/facebook5m.jpg)

**注意**:Facebook抓取网页需要一定的时间，所以有时候如果显示不是你预期的效果，也是正常的，一般等一会，再分享，就都是正常的了。

#### 后记

对于[Twiiter Card](https://dev.x.com/cards/overview)，同样可以通过这样的方式进行处理，至于更加高级的功能，则可以根据需求自己写啦，这篇文章就是个示例。
