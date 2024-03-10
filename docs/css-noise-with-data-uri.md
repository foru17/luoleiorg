---
title: 使用CSS和DataURI来添加杂色滤镜效果
date: "2013-08-18"
cover: https://c2.is26.com/wp-image/2013/08/css-noise.png
tags:
  - develop
---

![css-noise](https://c2.is26.com/wp-image/2013/08/css-noise.png)

前几天在codewall上看到一篇["CSS Background Noise"](https://coderwall.com/p/m-uwvg)的文章，用css+DataURI来实现给html元素添加杂色效果，可以在不增加http请求的情况下，实现不错的杂色效果。自己跟着实践了一下，在这里也就按照原文的步骤，自己翻译加整理实践，分享给大家。

首先放Demo ，图文无关，仅仅是演示而已，css源码请参考 [CSS Code SNIPPET](https://www.mightymeta.co.uk/resources/css-noise.css) .

<iframe width="100%" height="300" src="https://jsfiddle.net/foru17/yDjpA/10/embedded/result,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### 如何使用它？

最简单的方法就是把上面的CSS代码复制到你的css中，然后给你要加杂色的html元素加上 class="noise" 就好。

#### 原理

长话短说，看了源码大家应该就能get到，我们首先使用photoshop生成一个50px \* 50px的有杂色的半透明png图，然后通过转换工具将这个png图片转化为 dateURI，然后在css中，设置一个.noise类，在其中的background-image属性中使用dataURI 。

对于如何实现不同的元素滤镜效果，我们使用到了 :before 伪选择器和 opacity 透明度属性，同时，通过设置 .noise 的 z-index 堆叠顺序顺序，.noise杂色在覆盖所有的背景颜色和图片的同时，不会覆盖住元素的内容。

最关键的是，上面涉及到的所有属性都是CSS2.1而不是CSS3，所以浏览器兼容性方面不存在太大的问题，哪怕某些浏览器不支持，最多就是不显示noise杂色而已。

#### 为什么使用它？

在网页设计中使用一定数量的杂色以显现设计质感越来越常见 （英文作者写这篇文章的时候是2011年，现在是 flat 扁平化大行其道）。一般来说，我们可以通过使用img图片来实现效果，可是这也意味着我们必须使用 photoshop ，并且修改起来挺不方便，对于前端优化来说，也额外增加了HTTP请求。

说完了上面的，那使用css+dataURI来实现添加杂色质感的优点就显而易见了：纯css+html，小文件（往往5k不到），还能较好地控制和修改。

#### 自己动手，丰衣足食

你可以直接使用我的dataURI来作为杂色模板，当然，你也能自己做一个，在 photoshop 里根据自己的需求和喜好调整透明度，杂色值等等。

##### 一.创建杂色模板图片

1.photoshop

![data-noise-1](https://c2.is26.com/wp-image/2014/04/data-noise-1.png)

创建一个50px\*50px的画布（根据作者实践，发现其他大于50px的图片都会导致最终URI过大导致优势不那么明显）。

2.创建一个新的图层，使用50%灰色填充（编辑>填充）。

![data-noise-2](https://c2.is26.com/wp-image/2013/08/data-noise-2.png)

3.应用杂色滤镜（滤镜>杂色>添加杂色），数量区间5~6%为佳。

![data-noise-3](https://c2.is26.com/wp-image/2013/08/data-noise-3.png)

4.增加杂色对比度，可以通过添加一个图层模板，调整亮度对比度.

![data-noise-4](https://c2.is26.com/wp-image/2013/08/data-noise-4.jpg)

5.降低杂色层的透明度（可以通过把已经有的两个图层加入一个新组，然后降低组的透明度值）

![data-noise-5](https://c2.is26.com/wp-image/2013/08/data-noise-5.jpg)

7.保存输出为PNG-24格式，对于图片格式的相关知识，建议大家可以阅读一下一淘的[《PNG的秘密—— 一淘前端分享会》](https://www.iyunlu.com/view/Front-end/60.html)。

![data-noise-6](https://c2.is26.com/wp-image/2013/08/data-noise-6.png)

##### 二.优化png图片

最终我们生成的png文件大概有8kb的大小，对于前端工程师来说，节省每一kb文件大小都是有意义的，我使用的是 mac 上的 ImageOptim 这个软件，通过优化压缩，最后我们获得了一个4kb大小的文件。

![data-noise-7out](https://c2.is26.com/wp-image/2013/08/data-noise-7out.png)

##### 三.将图片转换成Data URI

在这里，我们使用了一个在线的转换服务["dopiaza.org"](https://dopiaza.org/tools/datauri/index.php),上传文件，转换。

![data-noise-8](https://c2.is26.com/wp-image/2013/08/data-noise-8.png)

##### 四.比较一下data URI和原图像的大小

![data-noise-9](https://c2.is26.com/wp-image/2013/08/data-noise-9.jpg)

这时候，别高兴得太早，再确认一下，看看生成出来的data URI的字符大小有多少，在这里推荐使用["bytesizematters"](https://bytesizematters.com/)在线查看文本大小，如果字符大小比原来的png图片大小还大，那优化就得不偿失。经过比较，我们发现dataURI进一步压缩到了2.05kb。

####  浏览器支持

Internet Explorer 8+, FireFox 3.5+, Chrome 1+, Safari 4+, Opera 9+

#### 其他

实际上也可以通过同样的原理，实现其他常用的纹理效果：如纸张、石头、布料等等效果，大家也可以实践一下，看看效果如何。
