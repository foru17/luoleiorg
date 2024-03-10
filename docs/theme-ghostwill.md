---
title: Ghostwill 鬼才晓得
date: "2014-04-27"
categories:
  - tech
cover: https://c2.is26.com/wp-image/2014/04/ghostwill.jpg
---

构思了一个多月，这个周末在公司加(tōu)班(lǎn)敲了20h+的代码，终于还是把博客从 wordpress 迁移到了去年新出来的 [Ghost](https://ghost.org/) 博客平台，Ghost其简单、快速、开源的特性，迅速地吸引了国内外不少开发者使用。

简单地介绍一下 Ghost 的特征:

- **Markdown**:使用 [Markdown](https://jianshu.io/p/q81RER)，过去一年多，自己已经转成使用 Markdown 写作，还是很方便的。Wordpress 虽然能通过插件的方式支持 MD ，可还是略不方便，每次都是在 Mac 上用 [Mou](https://mouapp.com/) 或者在[简书](https://jianshu.io)写完后再把 HTML 源码拷过来，方法略 low。

- **Nodejs**: 速度超快，作为一个前端兼 JS 渣，还是了解 Nodejs 的性能强大之处，尤其是博客这种简单的需求，如果 Wordpress 是小恶魔的大斧头，又大，又粗，又黑（我说的是事实好么！！你看下面图好么）。

那么Ghost就像是一把 [瓦雷利亚钢利刃](https://zh.asoiaf.wikia.com/wiki/%E7%93%A6%E9%9B%B7%E5%88%A9%E4%BA%9A%E9%92%A2?variant=zh) 。

![](https://qiniu.is26.com/jamie-lannister-gets-the-sword-but-not-the-respect-of-father.jpg)

又轻，又硬，又持久，耍酷还能搞姐姐。

3.开源&&社区:自己研究了下 [Ghost](https://github.com/tryghost/Ghost)的源代码，很适合我们前端进行开发，贡献代码到核心代码也不是不可能的，写个主题、插件神马的需求还是不小的，这次博客改版，有些交互和功能，还是自己用 js 实现的，没办法啊，Ghost 还是太年轻了，API接口神马的还在完善和开发中，用江爷爷的话说就是"Too Young, too Navie"，必须接受这个事实。

我的博客[「罗磊的独立博客」](https://luolei.org)从前身 willei.com 开始， 已经差不多五岁啦，过去的这些年，一直使用的是 [Wordpress](https://wordpress.org) ,WP是一个十分强大的CMS平台，历史悠久，社区壮大，拥有大量的主题、插件，很适合普通用户上手和使用。

最新的 Wordpress 3.9设计和交互上已经扁平化，后台做了不小的更新，可谓说更加易用。

![](https://c2.is26.com/wp-image/2014/04/wordpress.png)

自己用着 WP 还算顺手，写过两个主题，其中一个[【WP原创主题】愿望盒子V1](https://luolei.org/will-box-one-theme/) 采用瀑布流，还被好几个网站用了，有段时间看百度统计有奇怪得的域名来源，点进去一看用的是我的主题，结果大家都不换代码，让我情何以堪，好吧，还是我懒的原因直接把自己网站的主题不改，放在 [Github](https://github.com/foru17/will-box) 上了。

但是，作为一个自称"GEEK"的前(qiao)端(dai)工(ma)程(de)师(zha)，还用 Wordpress ，总有种逼格不够高的感觉。前段时间WP到3.9后，自己的博客JS代码出现兼容问题（啊多么痛的领悟，不要问我八哥从哪里来），太蛋疼了，遂袖子一卷，撸(qiao)起(dai)来(ma)，干脆就破罐子破摔，想着之前的那个 WP 主题也太粗糙了，女儿太丑了，还是赶出去算了，撸个新姑娘出来。

## Ghostwill

这个主题叫 [Ghostwill](https://github.com/foru17/ghostwill) ，中文名还没想好，暂时就叫「鬼才晓得」吧，已经放在 Github 开源了，请尽情撸，俗话说大家撸才是真的撸嘛，现在版本还是1.0.0。

## 几个特性

### 1.响应式

现在一个网站不是响应式都不好意思拿出手了。Ghostwill 针对移动设备做了优化，暂时是比较简单的处理，下一步将对菜单导航和交互做进一步优化和处理，详情请看 Github Commit log和该文章的更新日志 Update log 。

![](https://c2.is26.com/wp-image/2014/04/ghost-mobile.png)

### 自定义Cover image

你要说我抄袭 [Medium](https://medium.com/)，嗯哼，你要说也没办法，自己过去看了不少国外网站，发现这种大 Banner 、大图片、大字体算是一大趋势。尤其是博客和资讯，大量留白，专注于中部核心内容。Ghostwill 支持用户自定义封面照片。

在 Markdown 编辑时，给img图片标签加上`cover-image`的alt值即可。如果没有自定义图片，会默认抓取文章中的第一张图片，如果文章没有图片，则使用默认图片。

下面这个视频是我的一个演示（下面的宽屏图片设置一样操作）：

PS:封面照片有视觉滚差效果。

### 自选宽屏图片、视频

![](https://qiniu.is26.com/demo-show-wide.png)

通过给图片 `img` 标签设置 alt 值 `wrap`，给视频和其他 `iframe` 或者 `frame` 添加`class="wrap"`，可以让该\[图片、视频、frame\]自适应屏幕宽屏显示。对于有些需要重点突出的大图，可以根据需求自定义设置。

### 文章内 url 体验优化

![iconfont](https://qiniu.is26.com/iconfont-opt.jpg)

把文章中一些常用的 url地址自动加上 iconfont，并且对应不同的提示颜色，支持国内外常用社交网站，让读者能快速知道 url 跳转目的地。

这是我自己写的一个插件，过段时间单独提取出来给其他平台的用户也用用。

### 代码优化

```css
.hello {
  postion: absolute;
  color: red;
}
```

### 社交icon

![](https://luolei.u.qiniudn.com/social-icons.jpg)

采用 [Prismjs](https://prismjs.com/)，对不同的代码高亮和添加颜色主题。

### 其他

这是一个 HTML5 的主题，从一开始我就就没想支持IE8以下的用户，IE的用户就洗洗睡吧。（主要是根据自己博客的统计数据来的，现在我博客每天大概700-800的UV，超过一半的访客用的是 Chrome 和移动端 webkit 浏览器我会随便说么，好歹也是高端访客嘛）。

#### Sass

开发的时候使用 CSS预处理[Sass](https://sass-lang.com/)。

#### Grunt

必须 Grunt 自动化啊，另外放上自己的另外一篇文章[《让前端工作更快、更智能:利用StaticPage自动化工作流》](https://luolei.org/front-end-dev-with-grunt-staticpage-workflow/)。

#### 前端优化

css 压缩,js 压缩，采用[又拍云](https://www.upyun.com/?md=luolei)CDN全站加速。

### TO-DO-Task 待解决

2014.4月30日更新:

- 图片延迟加载(这个要改 Ghost core 代码，略危险）
- Menu 响应式处理
- 中文搜索功能
- iconfont 需添加更多的常用网站
- 交互优化:加载动画、页面切换转场动画
- 代码高亮优化:4月30日现在有点问题
- 低版本浏览器和微信内置浏览器的兼容性问题（坑啊！！！）
- 社交分享url分享方法
- 后台编辑直接把图片上传到又拍云or七牛等第三方（需要等 Ghost 官方API开发迭代）。
- 前端优化:进一步语义化 HTML 和 CSS，优化js逻辑，减少重绘，目前优化还粗放，线上版本还比较粗放。

嗯哼，这就是一个「鬼才晓得」的主题。

最后再放一下「鬼才晓得」在 Github 的地址:

[https://github.com/foru17/ghostwill](https://github.com/foru17/ghostwill)

这位靓仔，走过撸过，进来 star 一下呗。

对 Ghost 或者 Ghostwill 主题有什么疑问，请直接在该文章下部留言或者在Github 提 issue。
