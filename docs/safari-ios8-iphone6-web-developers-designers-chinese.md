---
title: Web开发者和设计师必须要知道的 iOS 8 十个变化
date: "2014-09-24"
cover: https://c2.is26.com/wp-image/2014/10/ios8wel.jpg
tags:
  - iphone
---

- [英文原文:"iOS 8 and iPhone 6 for web developers and designers: next evolution for Safari and native webapps"](https://www.mobilexweb.com/blog/safari-ios8-iphone6-web-developers-designers)

译者 [@罗罗磊磊](https://luolei.org)，转载请注明。

喜大普奔，喜极而泣，喜当爹，随着iPhone 6和iPhone 6 plus的上市，ios 8终于在上周推送更新了。新的设备，新的分辨率。接下来这篇文章介绍下 iOS 8有哪些变化。

## 概述

- 简介 iOS 8 上的 Safari 的更新
- iPhone 6 和 iPhone 6 Plus
- 新 Api 支持
- Safari 新功能和支持
- iOS 8 原生优化
- Safari 插件
- 新的设计
- 视频增强
- iOS 8上的JS
- Bug 和问题

已经习惯了苹果官方的高冷，这次，苹果依旧没有更新任何与 Safari 或者 iOS 相关的文档，所以下面的所有数据和资料都是基于我自己的测试和 WWDC 上公布的信息。

## iOS 8 上的 Safari

- 支持**HTML5新APIs**: WebGL (3D canvas), IndexedDB, Navigation Timing API， Crypto API
- 混合应用: 更快的、优化的WebView
- **支持滚动 Scroll 事件**:终于支持了！
- **视频播放**: 全屏API，元数据API
- HTML模板元素
- Safari 插件:原生App可以以插件的形式读取网页DOM
- **图片**:支持`Image Source Sets`和动态PNG`APNG`
- **CSS**：支持`Shapes`，支持小数单位
- 浏览器自动填写表单（支持信用卡调用摄像头扫描）
- **网页和本地应用交互**：登录数据共享
- EcmaScript 6 ：部分支持
- SPDY:支持谷歌家的新网络协议了
- 文件上传失效了(这是Bug)
- 移除了`minimal-ui`属性
- 支持`Yosemite`上的远程调试

相比其他移动端上的浏览器，iOS 8并没有支持有些功能：

- dp单位的`Media queries`
- getUserMedia:访问本地硬件设备，捕获音频和视频的Api
- WebRTC:网页即时通信
- @viewport 声明
- Datalist
- WebP图片

## iPhone 6 和 iPhone6 Plus

iPhone 6 和 iPhone6 Plus 是苹果继 iPhone 5 后的又一款不同尺寸和不同分辨率的设备。iPhone 6 的参数为`4.7寸`大小和`750×1334`物理分辨率的屏幕（dpi 值与iphone 5s 相同），iPhone 6 Plus则是`5.5寸`和`1080×1920`分辨率(401 dpi)的屏幕。不走寻常路的苹果给这两分辨率取名叫`Retina HD屏`，嗯哼，比`Retina`多了一个`HD`。

对于web开发者来说，不同的不仅仅是尺子上的大小。还包括默认`viewport`（关乎 `width=device-width`的设置），像素比（关乎高清图片的应用），icon图标大小和登录页的图片大小。

|                                                      | iPhone 6 | iPhone 6 Plus |
| ---------------------------------------------------- | -------- | ------------- |
| 尺寸                                                 | 4.7”     | 5.5”          |
| Viewport’s device-width (in CSS pixels)              | 375      | 414           |
| Viewport’s device-width (Android设备同分辨率参考)    | 360      | 400           |
| Device Pixel Ratio 像素比                            | 2        | 3(近似值)     |
| Rendered Pixels 渲染像素 (默认 viewport size \* dpr) | 750×1334 | 1242×2208     |
| Physical pixels 物理像素                             | 750×1334 | 1080×1920     |

对于新 iPhone 的屏幕尺寸，推荐一篇文章["iPhone 6 Screens Demystified"](https://www.paintcodeapp.com/news/iphone-6-screens-demystified) 。

##### VIEWPORT SIZE

正在读这篇文章的你应该已经知道

直到上周，所有的 iPhone 和 iPod 使用的都是`320px`的屏幕宽度。iPhone 6 和 Plus 相比前代更加宽，给我们带来了更多的空间，苹果终于决定加宽浏览器宽度了。但是苹果奇葩的是使用了一套特殊的屏幕像素值。大部分`4.7~5寸`的安卓设备的`viewport`宽设为`360px`，iPhone 6上却是`375px`，大部分`5.5寸`安卓机器（比如说三星Note）的`viewport`宽为`400`，iPhone 6 plus 上却是十分怪异的`414px` （╮(╯_╰)╭ 苹果你这样折腾是闹哪样啊）。这意味着相比同样尺寸的安卓机器，iPhone 6用户大概要少看`4%`的内容。也许这并不是什么大问题，但是你也许还是得检查下你的网站是否适配。

![](https://c2.is26.com/wp-image/2014/10/iphone6.png)

适配新iPhone，你可以使用下面两段`<meta>`

```
<meta name="viewport" content="width=375">
<meta name="viewport" content="width=414">
```

##### 设备像素比

iPhone 6与 iphone 5一样，像素比都是`2`，但是另一方面 iPhone 6 `401`的`dpi`真实的像素比值应该大约是`2.60`。为了解决这个问题，苹果又整了个新概念`rendered pixels 渲染像素`，如果像素比是`3x`,那么理论上一个css宽设为`414px`的屏幕应该拥有`1242px`的物理像素（现实中是1080px，小了13%）。

因此，如果你使用一个`3x`的图给高清的安卓设备，同样这样图也会适配 iPhone 6 Plus 但是iPhone 的浏览器在渲染在屏幕之前首先会调整图片大小。

#### 图标大小

iOS特有的图标大小，在 iPhone 6 plus上是`180×180`，iPhone 6 上则还是老的`120×120`。

适配iPhone 6 plus，则需要在中加上这段

```
<link rel="apple-touch-icon-precomposed" sizes="180x180" href="retinahd_icon.png">
```

#### 启动图

如果你的webapp有一个启动图，那么你又得增加两行代码适配新 iPhone 了。

iPhone 6对应的图片大小是`750×1294`，iPhone 6 Plus 对应的是`1242×2148` 。

```
<link rel="apple-touch-startup-image" href="launch6.png" media="(device-width: 375px)">
<link rel="apple-touch-startup-image" href="launch6plus.png" media="(device-width: 414px)">
```

#### UA探测

目前位置，所有升级到iOS 8的 iPhone都使用同样的`UserAgent`，所以我们暂时还没有办法在服务端判断这是什么设备，当然，通过JS和`Media Queries`我们还是可以通过技巧来判断的。

## 新的API

两个最重要的Api支持终于登录了iOS,分别是`WebGL`和`IndexedDB`，与此同时，Safari也开始支持[Web Cryptography](https://www.w3.org/TR/WebCryptoAPI/)和[Navigation Timing](https://www.w3.org/TR/navigation-timing/)。

`WebGL`支持3D模拟，并且是浏览器默认开启。对于游戏开发者来说，这是一个好消息，更加丰富的交互和形式将在网页上出现。

你可以在微软的这个[FishGl](https://fishgl.com/)测试下 iOS 8 Safarai上进行3D渲染的效果。

![](https://c2.is26.com/wp-image/2014/10/webgl.png)

**IndexdDB**是W3C继起用`WebSQL`后推出的新的标准，随着 iOS支持 `IndexedDB`，我们能在不同的手机浏览器上使用同一套数据库API。

**Navigation Timing API**对于web性能优化来说是个好消息。通过这个API我们能过测量更加精准的加载渲染时间，优化网页的用户体验。

## Safari新功能

#### 缩放

iPhone处于横屏的时候,iPad（横竖均可），如果你用手指捏放屏幕（比如说你想放大网页），你会进入一个`标签预览模式`，用起来倒是挺方面，可是可能会与你在网页上使用的`gesturechange`事件所冲突，如果你要使用自定义缩放事件，首先爱你你得`event.preventDefault()`来阻止浏览器的默认事件。

![](https://c2.is26.com/wp-image/2014/10/zoomios.PNG)

#### 取消 MINIMAL-UI

六个月前，苹果推出了了[Minimal UI mode《iOS 7.1的Safari为meta标签新增minimal-ui属性，在网页加载时隐藏地址栏与导航栏》](https://www.36kr.com/p/210516.html)，iOS 8更新后则又取消了这个，依旧高冷女神范，没说为什么。

#### 表单自动填写和信用卡扫描功能

Safari如今支持自动补全表单，并且当Safari检测到你要填写的是信用卡的时候他会允许你开启摄像头直接扫描实体信用卡。

![](https://c2.is26.com/wp-image/2014/10/scancard.png)

于此同时，Safari也支持`autocomplete`属性，参考[latest spec](https://html.spec.whatwg.org/multipage/forms.html#autofill)。这意味着如果你在一个登录页面，Safari可以调用Keychain里的数据自动填写用户名帐号、密码。Luis Abreu写过一篇关于iOS 8安全和隐私相关的文章，推荐可以[看看](https://lmjabreu.com/post/ios-8-privacy-updates/#safari-keychain-improvements)

#### RSS

如果你的网站提供了RSS订阅，iOS 8用户可以直接在浏览你网页的时候在书签栏打开他。就是那个`@`图标里面有个`订阅`的按钮，虽说有点小低调，但好歹还是有嘛 ﾉ( ´ ▽ \` )ﾉ。

![](https://c2.is26.com/wp-image/2014/10/rssios.jpg)

#### 工具栏

现在地址栏和工具栏就变成半透明了。在 iOS 7上只有地址栏是半透明的。这意味着初次加载的时候网页可视区域变得更大（包含了底部的工具栏）。

![](https://c2.is26.com/wp-image/2014/10/bottom-toolbar.png)

#### iPad上的更新

iOS 7以后，使用iPhone上的Safari浏览网页，滚动的时候会自动隐藏工具栏（ipad不会），iOS 8 ipad也有了这个细节上的变化（横竖都有）。不同的是，在横向模式的时候，iPad上面还有一小条，iPhone则是全屏。

![](https://c2.is26.com/wp-image/2014/10/ipad1.png)

除此之外，Safari在横屏模式开启侧边栏会保持原有的`viewport`大小，只会改变`aspect-ratio`

![](https://c2.is26.com/wp-image/2014/10/ipadios8.PNG)

#### 书签icon和常用网站

Safari终于支持收藏夹里和书签里的网页附带网站的icon图标。当你在地址栏输入关键字搜索的时候，同样会展示网站的icon（ipad刚刚我测试了下没有）。

![](https://c2.is26.com/wp-image/2014/10/icon1.png)

#### 跨平台切换

如果你同时使用Mac和iPhone，当你在iPhone上浏览一个网页，你可以在你的Mac上（需要Yosemite）继续阅读（今年WWDC上专门演示了这个功能，还得等到Yosemite的正式更新）。

## 更像native的webapp

如果你想让用户在网页上，无经确定，就直接跳转到Apple Store下载你的应用，那是不可能的。想让网页与本地应有之间有交互，iOS 8带来更多的便捷性。

1. Safari插件
2. 共用认证（web和本地应用之间能共用安全凭证，无需再重新登录）。

#### 新的webview

这次iOS 8更新，最令人激动的消息就是混合应用与 Mac 上共同了一套 API，意味着iOS 上也能有更多的功能，Mac 和 iOS的通信交互，还有：

1. 支持JavaScript与本地应用之间通过`postMessage`的交互
2. New classes configure the Web View similar to the power we have on Android’s Web View.（这段谁能翻译下）
3. 更强大的 `Nitro`引擎，相比前代`4x`速度的js执行速度。

新的 webview(WKWebkit)是新框架(WebKit.framework)的一部分，与老的`UIWebView`并不是完全兼容。但是老的webviwe依旧保留，所以老的webapp还是会使用老的webview。

目前的GM版本（公开版也是一样的）依旧存在本地文件无法上传的bug，对于一些混合应用（例如Cordova PhoneGap）来说，这（多webviwe）算是个好消息。

这就意味着，目前 iOS 8，拥有4个web引擎，当然，也意味着兼容性和bug都是有差异的。 1. Safari  
2\. Web.app (使用full-screen 桌面应用)  
3\. UIWebView (老)  
4\. WKWebView（新）

你可以在 [HTML5Test.com](https://html5test.com/)这里测试下你webapp的性能。

![](https://c2.is26.com/wp-image/2014/10/html5test.png)

对于那种包壳应用和webviewe应用来说，这个变化是十分重要的。比如说iOS上的Chrome和Facebook本地应用中的网页应用（我们猎豹的电池医生、手机猎豹也大量应用webview）。根据一份报告，`11.5%`的iOS流量是来自基于`webview`的应用。

## Safari 插件

iOS 8上的Safar 是第一个支持插件和拓展的系统预装浏览器（Firefox OS也许也算是一个）。从iOS 8开始，本地应用可以拓展到与 Safari 交互，主要通过两种方式：分享(Share extension)和动作(Actions)。Action 可以与DOM交互，意味着可以本地应用可以直接修改DOM元素。

所有的插件都需要用户主动选择来触发（需要点击分享中不同的按钮来触发），暂时还没有可以自动运行的插件。

旧版 Safari 的分享 菜单同样被基于 JavaScript 的插件所替代。比如说`添加到桌面`如今就是一段 Safari 中的 js 代码。

除了苹果在WWDC上演示的功能，Safari的这个改进意味着浏览网页会有极大的体验改善。比如说你可以在Safari直接调用1Password或者LastPassword 保存的帐号密码登录，如果你的iPhone 有 Touch ID指纹识别，你甚至可以直接指纹验证登录。

![](https://c2.is26.com/wp-image/2014/10/action.png)

Pocket.com 已经声明即将推出针对 iOS 8的插件。

![](https://c2.is26.com/wp-image/2014/10/pocket2.png)

## 前端和设计师的福利

这次safari新增了很多html5，css3的支持

- CSS Shapes
- CSS object-fit
- CSS Background Blend modes
- word-spacing
- CSS Compositing and Blending
- Subpixel layout 支持小数点
- Animated PNG supported APNG格式图片
- Parallax effects and Pull-to-refresh supported （与Scroll事件相关）
- SVG Fragments Identifiers (for SVG Sprites)
- Image Source Set support
- HTML Template support

#### Animated PNG

[APNG格式](https://zh.wikipedia.org/zh/APNG)是PNG位图动画的拓展，但未获得PNG组织官方的认可，与GIF有点类似（只不过GIF是基于JPG的），这意味着我们可以制作32位全彩半透明的动态图。

#### 滚动时差与下拉刷新

如果你做过移动端的项目，你一定知道iOS7以及以前都不支持`scrooll`事件，iOS 8 终于支持滚动事件，这下大家终于可以在iOS上用到视觉滚差相关的js和css了，但是不保证完全适配。

这个支持让我们可以做出下拉刷新和无限下拉下载的效果。

#### 小数点单位

Safari现在CSS单位从整数转成了浮点数。这意味着CSS对象模型中诸如`offsetTop`和`ClientWidth`可能会取得小数值，之前老的iOS都会返回整数值。

与此同时，这也意味着你可以用半个像素单位了。

`Yosemite`

#### SVG 片段标识

SVG没怎么玩过，这个属性也不懂，大家先看英文吧。

Fragment identifiers from SVG is a method to link to one specific fragment or portion of an SVG instead of the root element. This feature allow us to sprite SVG images in one file taking advantage of one HTTP request and caching. Similar to CSS Sprites, but with SVG images instead and with ids instead of positions.

#### CSS 合成和变形

利用`mix-blend-mode`这个新属性支持我们把不同形状的不同元素合成到一张图片，这是Adobe在HTML5方面新出的一个功能。在他们的[网站](https://adobe.github.io/web-platform/demos/compositing/)上你能看到演示的DEMO和文档。

![](https://c2.is26.com/wp-image/2014/10/blend.png)

从Adobe官网的例子演示来看，似乎变形是生效了，合成并没有生效（我Mac Chrome也没生效）。

#### CSS 形状

CSS 形状也是Adobe新出的一个特性。对于这个特性，推荐下W3Cplus上的[《CSS Shapes 101》](https://www.w3cplus.com/css3/css-shapes-101.html)。个人还是很看好这个特性的推广和应用的，能给我们的网页设计带来更多的可能性。

![](https://c2.is26.com/wp-image/2014/10/shapes.png)

#### Image Source Set

有了解响应式图片的开发者对这个应该不陌生，随着高清屏的普及，针对不同的分辨率做适配是一个需要注意的问题，苹果iOS 8 支持`Image Source Set Spec`，意味着可以在`<img>`标签中使用新的属性。

`Media queries`

在上面这段代码的例子中，iPhone 6 Plus 的像素比是`3x`，它会加载`superhires.png`这张图片，而iPhone 5s,iPhone 6 则会加载`hires.png`这种图，其余的则加载`lores.png`。但是遗憾的是，iOS 暂时还不支持`<picture>`元素。

#### HTML模板

`<template>`对于webapp来说十分有用，`<template>`中可以包含一段`css`或者`js`（不会被浏览器解析），实际应用中，我们可以利用`<template>`中的代码创建一个新的`node`。

## 视频增强

这次更新对视频播放相关的增强了许多，iOS8开始支持`全屏播放`,`Meta Data Api`和`CSS layering`(话说大家知道HTML5 Video元素是可以通过CSS来控制吧？)

#### video元素的全屏播放

Safari不支持全屏播放API，即使是iOS8也不例外。但是能通过一个特殊的方法解决这个问题，在`<video>`元素中增加一段`js`。

`4.7寸`

## 视频 Metadata API

Safari开始支持`<video>`的`preload="metadata"`，可以让浏览器触发`loadedmetadata`事件方便开发者控制。

#### CSS 分层

我可以通过css控制其他元素放在`<video>`之前。

## iOS 8 JavaScript相关

- 部分支持`ECMAScript 6`,包括`Promises`, `Iterators`, `Maps`, `For-of`, `Weak Maps`等等。
- **后台运行**：JavaScript会在后台继续运行（哪怕已经切换了窗口甚至Safari切换到后台，但是计时器 times 下降到1s的频率）。
- 支持`scroll`事件：不多说了，上面介绍过。
- Unprefixed Page Visibility AP ： 我没搞懂这个是什么（哪位知道求指导）
- 移除`window.doNotTrack`
- 支持`window.currentScript`

9月18更新:

有开发者发现：iPhone 5上的`click`事件`300ms`延迟已经取消了（只是Safari），但是其他设备上的Safari和 WebViews 上还有，延迟依旧在 iPod touch, iPads 和iPhone 5s上。

## Bug和存在的问题

说了iOS8和iPhone 的更新，再来说说目前发现的 Bug。

- **不支持文件上传**！！！所有的文件上传都失效了，你能选择或者拍张照片，但是js不能获得任何数据。`HTML`或者`XMLHttpRequest`的`POST`请求也不行。但是这个问题但是在桌面启动的app没发生。

- **WKWebKit**：在新的引擎不能读取本地文件是个大问题，所以对于混合app来说，还得使用老的`UIWebView`。

- `window.prompt`可能会导致Safari崩溃
- **附件**:语音在`input`和`labels`输入时，不管用。(当输入的时候，label不再发音)
- 桌面app的`iframes`中,`touch`事件没有被监测到。
- 手机休眠后，桌面app中的`Timers`和`requestAnimationFrame`回调没有执行。

## 译者言

iOS 8给web前端带来的变化还是很令人欣喜的，更强大的性能，更强大的浏览器和内核，更开放的接口，可以预见在针对iOS的web应用会有一个更大的用武之地。

文章很长，大量技术词汇，翻译了半天，若译文有错误或者不妥之处，欢迎指正和提供建议。

## 更新

2014年9月26日:iOS 8.02 推送更新后，解决了Safari 无法上传文件的Bug。
