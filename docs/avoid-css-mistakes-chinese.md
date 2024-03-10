---
title: 前端开发应该避免的10大 CSS 糟糕用法
date: "2013-11-11"
cover: https://c2.is26.com/wp-image/2013/11/css-specifity-1.png
categories:
  - code
tags:
  - develop
---

今天在回广州的火车上看到一篇["10 CSS mistakes every web designer must avoid"](https://www.creativebloq.com/css3/avoid-css-mistakes-10135080)，想着还不错，就翻译给大家。

对于网页重构来说，[CSS禅意花园](https://www.csszengarden.com/tr/chinese/) 是网页布局从 table 表格转到了 html +css 的标志 。这些年来，随着我们的网站越来越复杂：html5，css3，新的技术、新的属性，越来越多的开发者开始思考和尝试提高他们的 CSS 技能。那么我们从哪里着手呢？对于网页重构工作来说，我们应该养成什么样的开发习惯？一个糟糕的 css 用法是怎样的？我们应该怎么处理这些糟糕的 css。今天这篇文章，我将谈一谈10个我们应该避免的 css 糟糕用法，当然，我们也会分享怎么才是正确的用法。

为了方便大家理解，我将这10个糟糕用法归为三大类：权重、工作流、自以为是。

#### 权重！权重！！权重！！！

正所谓[马太效应](https://zh.wikipedia.org/wiki/%E9%A9%AC%E5%A4%AA%E6%95%88%E5%BA%94)，如果你写了很烂的 css，这段烂代码的不好之处是他会导致更多和更烂的代码。如果你需要解决一个 css bug，发现唯一的解决方法是：使用更多层级的选择器、 id 选择器；甚至跟糟糕：使用内联样式( inline-style )，直到使用最后的大杀器`!important`。以上提到的所有用法归根到期他们犯了「过多权重」的错误。

CSS 中的权重取决于你如何使用具体的css 规则。

`#layout #header #title .logo a { display: block; }`

看看上面这串 CSS 选择器，你可能觉得这是一段符合语义化的「好」选择器：简单明了。如果你依照习惯从左往右读，你可能是这么理解：「先找到主要布局区域，再找头部区域，再找到 title 标题区域，再找到 logo 标志区域，再找到这里面的所有 a 锚点」，对于 css 来说，这是一个很具体的精确定位，但是，实际上我们很少有机会**需要**这么精确的定位。过大的css权重会造成你的样式表更加难以维护（你考虑过接你班的同事的感受木有！），也更加难以阅读和理解（这么多层声明、一长串你闹哪样啊）。

###### 01.滥用 id

CSS 权重的高低取决于你使用什么样的选择器：`id`,`class 类`,`tags 标签`。举个栗子：

```css
#my-link {
  color: red;
}
.my-link {
  color: yellow;
}
a {
  colour: blue;
}
```

来做这么一个小测试，有这么一个超链接如下，如果我们没有其定义其他样式，浏览器渲染出来的最终结果会是什么颜色？

```html
<a href="#" id="my-link" class="my-link">举个栗子</a>
```

![](https://c2.is26.com/wp-image/2013/11/css-specifity-1.png)

最终的颜色会是红色，因为 id 属性是三者之中权重最高的（id在网页中只能使用一次，他得权重值为100），所以红色葫芦娃成功击败了其他娃娃，举起了栗子。

根据 css 权重，权重次于 id 的是`class`类，最后才是`tag`标签，正如你如上图审查器中所看到的。

当然啦，像上面我们举的栗子这种「同时使用 id/calss/tag 」的情况在实际应用中还是很少见的，在日常开发中，我们更多的情况是会遇到如下情况：

```css
#header a {
  border: 2px dashed #000;
}
```

假设这是我们的一个项目，现在我们决定要把一个在 header 的 link设置成无边框，随手一写，我们添加了：

```css
.special-link {
  border: none;
}
```

然后再在 html 中添加了一个 `special-link` 的class 类，这下解决我们的问题了吗？ 答案是：没有！ 由于 id 的权重如此之高，我们需要更高权重的声明才能实现我们的需求。下面这样写才是正确的：

```
#header .special-link { border: none }
```

![](https://c2.is26.com/wp-image/2013/11/css-specifity-2.png)

假如说这种情景在我们的 code 过程中不断地出现：设置 header 区域另外一个特殊的超链接 link 为某特殊的样式，你该怎么处理呢？ id 的高权重特性意味着滥用 id 绝对是一个很糟的做法！

那我们如何解决这个问题呢？用 class 类来代替 id 吧。

###### 02.大串的 css 选择器（多层级）

```css
#header #title .left-side img.logo {
  opacity: 0.5;
}
```

上面这个栗子不仅仅乱用 id，他还很长，正如同乱用 id导致的高权重麻烦，如果你使用一大串选择器（超过三个层级）你同样会造成过高权重，导致你陷入到高权重和更高权重的汪洋大海之中。

那针对这个问题的解决办法有什么呢——精简！如同我们现在这个栗子，如果我们用一个 `.logo` class类就能解决我们的需求，那我们就没必要写这么以大串了。一般情况下，我们应该控制选择器在2个，最多3个。

###### 03.Inline styles

内联样式是css 权重罪恶的源泉，同时也从根本上摧毁了我们使用 css 的初心（结构样式分离）。当我们的工程师好不容易走出 tables 的魔窟开怀拥抱外部样式表，我们早就应该知道不要把样式同结构混杂在一起。

根据 css 权重级的特性，内联样式只能被`!important` 所覆盖。一般来说，这就意味着，如果某猿使用了`!important`，他们更多是被逼的没办法才这么用(对应英文 reactive)，而不是想这么用(preoactive)。的确`!important`在 css 样式表中用起来十分方便，但我们最好是聪明地、小心翼翼地碰她、用他，而不是把他当做救命稻草（救命稻草用多了，迟早也会从救命稻草变成压死骆驼的稻草）。

下面举例怎么解决内联样式的问题，就两步 1.复制删除 2.粘贴 。剔除内联样式，转移到样式表之中吧。

![](https://c2.is26.com/wp-image/2013/11/css-specifity-3.jpg)

###### 04.从上至下式的粗放命名

说完 css 权重，接下来我们来谈谈其他 CSS 的糟糕用法。假设我们开始了一个新项目，设计师丢给我们一份 psd，我们开始在 html 中写基本的框架。

根据结构从下至上式的命名方式模糊化了 html 结构，工程师常常根据上下结构来命名id 和 class，而不是具体的设计元素，例如`#header`,`content`，这常常会导致长选择器（举个例子如`. menu ul li a｛　｝`），这样的后果是我们的代码变得难以调试和维护。怎么解决这个问题呢？我们应该尝试从网页中分离出设计元素，这同样可以减少我们代码中的冗余。

###### 05.冗余/重复

冗余意味着你写 css 的过程中不断重复某些代码。在使用编程语言的时候， 我们很好理解重复（造轮子）意味着浪费时间，我们在 code 中应该遵循 DRY 原则(Don't repeat yourself)。什么情况下我们会重复造轮子呢？举个栗子：

```css
.some-title {
  font-weight: bold;
}
.some-other-title {
  font-weight: bold;
  color: red;
}
```

实际上，我们可以有个更好的解决办法

```
.some-title, .some-other-title { font-weight: bold; }
.some-other-title { color: red; }
```

比如说我们要添加一个不同颜色的标题，我们可以使用一个常用的命名，或者添加一个具体的 class 类。

```html
<h3>class="some-title pop">我的标题</h3>
```

这个有点**[面向对象的CSS](https://www.qianduan.net/object-oriented-css.html)**的思想在里面，使用 Sass 中的 `@extend` 特性可以很好地解决我们这个问题。

在 Sass 之中，你可以使用@extend 继承选择器，被继承的选择器的样式也被继承。这个特性使得我们可以很方便管理不同的样式，举个栗子：

```sass
.some-title { font-weight: bold; }
.some-other-title { @extend .some-title; color: red; }
```

当CSS预处理编译器将`.scss`转换成`.css`文件时，我们最终输出的样式是：

```css
.some-title,
.some-other-title {
  font-weight: bold;
}
.some-other-title {
  color: red;
}
```

最终输出的是一模一样的效果，解决重复和冗余的问题，要求我们在写 css 的时候心中对 html 层级结构要有个大致的规划，思考不同的设计元素之间的层级和关系，我们规划得越清晰，最终输出的 css 也越精简。

###### 06.精简你的单位

如果你的样式表中混杂着 `px`,`em`,`rem`等等单位，是时候改变了，业内著名的web开发者[Rachel Nabors](https://rachelnabors.com/) 呼吁大家统一使用`em`为字体大小单位，他曾说「我看其他人的样式表第一件事就是看字体样式，然后把所有的`font-size`的单位换成`em`」，这几年用户使用的终端越来越多样（不同的终端、不同的浏览器使用的默认字体大小存在差异），使用绝对字体大小`px`变得越来越不可控，使用`em`等相对大小的字体则避免了这个问题。

如果你想在转成`em`对这些单位有个深入点的了解，推荐你阅读[《CSS文字大小单位PX、EM、PT》](https://www.1z1b.com/one-blog-a-week/px-em-pt/)。

当然，如果你就是不喜欢`em`和他们嵌套特性，那么你可以更进一步了解 CSS3 中推出的新单位 [rem](https://www.w3cplus.com/css3/define-font-size-with-css3-rem)。

不同单位在 web 设计之中的战争还在继续（可参考文章[CSS Font-Size: em vs. px vs. pt vs. percent](https://kyleschaeffer.com/development/css-font-size-em-vs-px-vs-pt-vs/) ），学习一点相关知识对我们提高代码可维护性至关重要。

下面我们进入到这篇博文的第三也是最后一个部分「自以为是」，这些坏习惯包括：增加不必要的东西，错误，无意义的 css。

###### 07.向下兼容和无效的规则

在开发的过程中，如果你不需要使用 css3 之类的高大上代码就能实现效果，那再好不过了。可是，作为工程师的你在 Chrome 最新版本上面看到的效果，并不意味着你的用户能在他们的浏览器上看到同样的效果（考虑过 IE 的感受没有），一个十分糟糕的坏习惯就是完全忽略向下兼容性。

如果你在项目中使用`rgba()`，你是否测试过这个属性的兼容性？如果没有，那你最好祈祷没有 IE8的用户会访问你的网站。你是否写全了针对不同浏览器的不同的规则（-webkit,-ms -moz 等等）？解决这个问题，可以使用 [CSS LInt](https://csslint.net/)检测下你的 css 代码，CSS Lint的检测规则包括错误的和不合理的地方。

###### 08.(没有意义)不起作用的样式

Harry Roberts的[Code smells in CSS](https://csswizardry.com/2012/11/code-smells-in-css/)是关于 css 糟糕用法的经典文章。他举了几个可有可无的不起作用样式的栗子：

```css
h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ccc;
}
.no-border {
  padding-bottom: 0;
  border-bottom: none;
}
```

Roberts 推荐的重构精简方法是删掉属性为`0`和`none`的属性值。

```css
h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
.headline {
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ccc;
}
```

如果你像重构之前的那样写法，`h2`是一个我们在web 设计中会不断重复用到的元素，这个本质上「你写了更多的代码却没有实现了更少的样式效果」，如果我们接下来又要设置一个`h2`的属性为其他样式，那代码会得很乱。

![](https://media.creativebloq.futurecdn.net/sites/creativebloq.com/files/images/2013/10/net245featcss/05.jpg)

Harry Roberts是 [inuit.css](https://inuitcss.com/) 框架的作者。

###### 09.巧而不巧:用 Hack 不意味着你是个好 Hacker

负的 margin 边距，`!important`等等，上面的这些就是我们所说的 hack 用法（此 hack 非针对IE 兼容的 hack，也可以理解成 cheater 作弊用法），如果其他人问我们为什么要这么写？我们可能只需要回答「管他呢，反正能实现效果」。

当我们为自己使用这些充满「弊」端的方法而略不放心的时候，一个解决办法就是把我们的这些 hack 放到一个特定的样式表文件`hack.css`之中。

任何时候你意识到你写了一个 css 的 hack 用法的时候，你直接把这些代码放到这个`hack.css` 之中（或者样式表的特定区域：通过注释跟其他样式区分开），这个专属区域是个好解决方案因为他最终会在用户端隐藏。

当我们养成了这个习惯，我们可以十分清晰地知道我们写了哪些 hack ，同样可以方便我们了解我们使用这些 hack 的情景，让我们可以知道如何避免这些 hack 。我们有许多写 hack 用法的理由，但是如果我们不记录我们为什么 hack，我们将不会从我们这些 hack 中学到我们为什么要错误地这么用。

###### 10.糟糕的文档和注释

昨天在微博上看到一个段子「程序员最讨厌的四件事：写注释、写文档、别人不写注释、别人不写文档 …」。

写文档和注释绝对不是一个有意思的事情，但却是一个最重要的事情（尤其是涉及到项目后续可维护性时），文档可以有效地让其他人知道你的代码是干什么的，同时其他人理解你的 css。对于大部分语言（html,css,php,JavaScript） ，开发者可以直接在代码文件中写上注释（文档）。

[Nabors](https://rachelnabors.com/) 曾说「我曾YY：如果我今天写完一个项目的 css 但是明儿我却挂掉了，有一个人幸运地接手我这个项目，那他看得懂我的这些代码是什么意思吗？」。尽量地让我们的样式表中的结构清晰，如果不能让人立马知道你的选择器指的是哪里的样式，可以尝试添加注释（什么！你还说注释增加css 文件大小！难道你不知道压缩工具么！）。

第一步是在必须的地方做好注释，第二步是使用工具把css文件中的这些注释转换成一个合适的文档。推荐可以使用[css_doc](https://github.com/tkadauke/css_doc)和[KSS](https://github.com/kneath/kss)。

css_doc 跟 JavaDoc类似，他的转换原理基于 CSSDOC. KSS（Knyle Style Sheets），对于前端和设计师来说都十分有益。

#### 总结

在这篇文章中，我们介绍了一些常见的 css 糟糕用法，指出了为什么我们应该避免这些用法和应该使用什么正确的用法。还是这句话"Doin something is always better than nothing"，行动起来总比什么都不做要好点，未雨绸缪有备无患。

今天你看完这篇文章，知道了10个糟糕的 CSS 用法，这不意味着你明儿去上班就把你过去所有的代码都重构一遍。从点滴开始，一步一步来才是我们开发工作的正确做法。在接下来的工作中，注意这些细节，避免这些「小」错误，让我们的代码更漂亮点。终有一天，我们会发现"Code is poetry"。

#### 译者言

这是第二次翻译技术相关文章，不得不说，还是低估了翻译的难度。要把技术类的文章翻译得语言流畅、通俗易懂，还是挺有挑战性的。译文中加入了自己的理解，配图也是自己通过 codepen 重新截图演示，这篇文章的译稿我放在了 google docs 上，如果对于某些翻译你有更好的用法，可以直接建议修改。

[https://docs.google.com/document/d/11Ly6z0dlVVPzIL-W22L_U6waoU7Pid4-KdDmEx6D0c8/edit?usp=sharing](https://docs.google.com/document/d/11Ly6z0dlVVPzIL-W22L_U6waoU7Pid4-KdDmEx6D0c8/edit?usp=sharing)
