---
title: Justflat:多说评论扁平化主题
date: "2013-09-04"
cover: https://c2.is26.com/wp-image/2013/09/Screen-Shot-2013-09-05-at-4.16.26-AM.png
---

```txt
主题:Just flat

版本:1.00

项目地址:[https://github.com/foru17/duoshuo-just-flat.css](https://github.com/foru17/duoshuo-just-flat.css)

简介:根据 metroUI 设计规范（至于你信不信，咳咳随意），将多说评论主题扁平化。
```

## Update

2013.9.4 :蓝色初版上线，IE的兼容咳咳请忽视...

## To-Do

1. 设置less颜色变量，方便用户自己修改配套颜色以兼容各自的主题。
2. 替换符合flat规范的icon
3. 修正IE6下兼容性

也算是贡献个小东东给多说评论的用户们，弄了一个下午，已经pull request给多说的github repo了，应该过几天在wordprss后台就能看到主题包了。或者大家可以直接复制编译出来的css文件源码，到后台的自定义css里就好。

[https://github.com/foru17/duoshuo-just-flat.css/blob/justflat/embed.css](https://github.com/foru17/duoshuo-just-flat.css/blob/justflat/embed.css)

这个主题使用LESS编译，多说给出的less结构尚清晰，有些层级关系在调试的时候得搞清楚，审查元素的时候注意一下。我是左边开着chrome，右边开着sublime，中间开着codekit实时刷新，搞这种主题必须得在大屏幕上，笔记本分辨率低切换来切换去伤不起啊。

多说自带的主题使用了不少阴影，边框，渐变等等，昨晚在 dribble 上找灵感，倒发现挺多不错的评论效果演示，本来想做一个拟物化效果的主题，后来发现，如果背景颜色是白色的话，带阴影效果的各种惨不忍睹，想着还是做一个兼容性比较好的把，果断开搞metro flat扁平化。

没什么技术含量啦，就是删了删阴影，改改margin padding background-color之类的，颜色搭配真的是难搞，metro看起来简单，颜色搭错就是屎一样的效果。

大家有什么建议直接留言就好。
