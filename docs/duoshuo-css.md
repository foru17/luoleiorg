---
title: 多说评论也玩圆角头像动画「自定义CSS:无压力小白级教程」
date: "2012-08-28"
cover: https://c2.is26.com/wp-image/2012/08/duoshuo-title.jpg
---

![cover](https://c2.is26.com/wp-image/2012/08/duoshuo-title.jpg)

今年来，私密社交应用Path凭借其新颖的交互、出色的UI设计、良好的用户体验而大放光彩，其设计被众多其他应用「借鉴」和「抄袭」。

![](https://c2.is26.com/wp-image/2012/08/path.jpg)

众多移动app蜂拥模仿其设计，腾讯的新版「微信」可以明显看到Path设计的影子。随着这股Path风，也带来了一场「头像圆角」的设计潮流，不少网站，都开始使用圆角头像。最近推出的微信公共平台，展示的公共账号默认就是圆角+上部加亮效果。

![](https://c2.is26.com/wp-image/2012/08/weixin.jpg)

就连老罗@罗永浩可爱多 这几天也心血来潮换了一个圆角头像。（你猜他头像这人是谁？）

![](https://c2.is26.com/wp-image/2012/08/laoluo.jpg)

今天，我也来玩玩圆角头像，我的博客使用了社会化评论系统「多说」，做为多说的最早一批用户，见证了多说的成长，不断迭代更新，体验越来越好、功能越来越完善，强烈推荐给各个网站。

![](https://c2.is26.com/wp-image/2012/08/duoshuo-index.jpg)

多亏了多说评论评论的出色的开放性和可定制性，让我们可以通过自定义CSS，给我们的评论栏带来更多的想象力：圆角头像、触发动画效果、阴影神马的当然不在话下。

#### 一.你需要

1.一颗愿意折腾的心

2.拥有一个Wordpress博客（想必看到这篇博文的人，90%都符合这个条件了吧）

3.懂基础CSS代码+会调试（想必看到这篇博文的人，50%也都符合这个条件了吧）

#### 二.相应步骤

在哪可以自定义CSS？

![](https://c2.is26.com/wp-image/2012/08/duoshuo-setting.jpg)

登陆你的wordpress管理后台>多说评论>个性化设置>自定义CSS

接下来，就是关键部分了

1.找到头像图像选择符

以高级浏览器Chrome为例（Firefox可以用firebug），使用「审查元素」来定位元素位置

打开使用多说评论的网站（打开自己的博客就好了，找一篇有评论的）。

右键一个头像图像>审查元素。

![](https://c2.is26.com/wp-image/2012/08/image.png)

![](https://c2.is26.com/wp-image/2012/08/img-div.png)

随后，Chrome下方就能显示相应的元素信息（上图）

此时，就找到了评论栏中头像的对应类选择符（为等会自定义css准备）。

这时，别忘了再看看这个id包含在什么DIV结构内，往上看，发现了文章页面的多说评论栏总结构被div定义为

，这下我们就能了解到，ds-avatar是包含在ID选择符:ds-reset之内的。

![](https://c2.is26.com/wp-image/2012/08/div-id.png)

以上这个只是举例，衍生的其他元素均可以通过「审查元素」找到。

2.自定义CSS

如果你不是很熟练CSS，建议你首先去W3school简单地学习一下CSS的基本知识

[https://www.w3school.com.cn/css/index.asp](https://www.w3school.com.cn/css/index.asp)

自定义CSS的基本结构是

选择符{属性:属性值}

例:p{color:#eeffee} >> 字体{颜色:颜色值}

现在我们可以确定如果我们要定义头像，应该用到

# ds-reset .ds-avatar img{这里面就根据你的需求填吧}

下面就介绍怎么使用CSS代码，让图像实现不同的效果

A.圆角（或者圆形）+阴影

在这里我直接使用的是CSS3代码

```css
#ds-reset .ds-avatar img {
  width: 54px;
  height: 54px; /*设置图像的长和宽*/
  border-radius: 27px; /*设置图像圆角效果,在这里我直接设置了超过width/2的像素，即为圆形了*/
  -webkit-border-radius: 27px; /*圆角效果：兼容webkit浏览器*/
  -moz-border-radius: 27px;
  box-shadow: inset 0 -1px 0 #3333sf; /*设置图像阴影效果*/
  -webkit-box-shadow: inset 0 -1px 0 #3333sf;
}
```

B.鼠标悬浮时:图像进行360度旋转

```css
  #ds-reset .ds-avatar img{
    width:54px;height:54px; /*设置图像的长和宽*/
    border-radius: 27px;/*设置图像圆角效果,在这里我直接设置了超过width/2的像素，即为圆形了*/
    -webkit-border-radius: 27px;/*圆角效果：兼容webkit浏览器*/
    -moz-border-radius:27px;
    box-shadow: inset 0 -1px 0 #3333sf;/*设置图像阴影效果*/
    -webkit-box-shadow: inset 0 -1px 0 #3333sf;
    -webkit-transition: 0.4s;
    -webkit-transition: -webkit-transform 0.4s ease-out;
    transition: transform 0.4s ease-out;/*变化时间设置为0.4秒(变化动作即为下面的图像旋转360读）*/
        -moz-transition: -moz-transform 0.4s ease-out;
        }
#ds-reset .ds-avatar img:hover{/*设置鼠标悬浮在头像时的CSS样式*/
    box-shadow: 0 0 10px #fff; rgba(255,255,255,.6), inset 0 0 20px rgba(255,255,255,1);
    -webkit-box-shadow: 0 0 10px #fff; rgba(255,255,255,.6), inset 0 0 20px rgba(255,255,255,1);
    transform: rotateZ(360deg);/*图像旋转360度*/
    -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
       }
```

其他效果

在这里，给大家推荐几篇相关的教程，大家可以去看一下比较这些绚丽的CSS效果，自己模仿实践，来美化自己的多说评论栏。

《多说CSS修改帮助》多说官方博客的一篇简单介绍，简单地介绍了一些标签名字（一般都是ds- 开头）。

《设计达人博客》 一个多说评论用户，自己修改了CSS，效果很不错。

《将多说变成Disqus的样子：仿Disqus的多说CSS》 里面有大量的多说标签，大家可以参考

《基础CSS》 利用可扩展的class增强其展示效果，从而提供形式新颖，风格一致的外观和体验。

《CSS3制作图片样式》 通过CSS3，玩转图片效果（给图片制作不同风格的样式）。

最后 这篇博文，只是一个引子，CSS是个神奇的东西，除了头像图像可以通过CSS设置外，理论上多说评论栏里其他的元素（背景、按钮、文字均可）同样可以根据这篇博文所说的「审查元素」方法，找到对应的选择符号>自定义CSS>从而实现不同的效果。

至于要折腾成什么样，就看个人喜好了，像我，喜欢多说原生的设计，就没怎么修改，只改了一下头像效果（圆形+鼠标悬浮时旋转）。

大家做出什么好玩的效果，不妨也分享出来吧（附上CSS代码吧 ~(≧▽≦)/~ ）
