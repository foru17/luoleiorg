---
title: 我的Sublime Text 2配置
date: "2013-08-09"
cover: https://c2.is26.com/wp-image/2013/08/Screen-Shot-2013-08-09-at-9.23.58-PM.png
---

这段时间有点忙（所谓忙都是借口），学校的事，工作室的外包工作balabala一堆，也忙里偷闲看了几本书，code最近在整node.js，近期项目还算多，正在搞一个fitbit自动发微博的服务，服务器端涉及ouath,数据库mongoDB之类，摸索折腾ing，对于俺这种小菜来说也算得上是步履艰难，各种search，这半个月倒也没写什么文章。这两天周末，过去这几天身体有点稀里糊涂，虽说每天坚持长跑，可拉肚子、咳嗽、鼻塞轮番上阵，到现在身体还处于「冰与火之歌」之中。最近作息倒是正常了，终于成了一个有早晨的人，早上起床后，查看下邮件，code下，看下书，效率倒也算高。

碎碎念说了说前段时间的状态，今天这篇文章，来讲讲开发工具，刚刚code的时候，用的还是pc，使用notepad+作为自己的编辑器，后来转入OSX平台后，在郭宇的推荐下，也使用过[espresso](https://macrabbit.com/espresso/) (用的是盗版表鄙视）,再后来，发现了 Sublime text 2 这个神器，从此成了ST的脑残粉。

对于Sublime Text的入门指南，就不再这里造轮子重写太多，推荐可以看看[@lucifr](https://x.com/lucifr) 的[《Sublime Text 2 入门及技巧》](https://lucifr.com/2011/08/31/sublime-text-2-tricks-and-tips/)一文。

下面就分享一下自己的Sublime Text的配置。

#### 主题 theme

ST2自带不少主题，目前我用的是soda这个主题。开启控制台，输入"Install Package"后搜"theme-soda"即可安装。

随后在preferences >> setting s-user里找到""theme": "Default.sublime-theme",在下面添加一行"theme": "Soda Dark.sublime-theme"，然后就可以启用了。

#### 字体 fonts

目前我使用的是"font_face": "Source Code Pro"。

对于其他字体，大家可以看看Slant网站的"[What Are The Best Programming Fonts?](https://www.slant.co/topics/67/~what-are-the-best-programming-fonts)"，根据自己的喜好来吧。

#### 插件 Package

以下大部分插件，都可以通过"Install Package"搜索安装

1.[AdvancedNewFile](https://github.com/skuroda/Sublime-AdvancedNewFile)

快捷键 Command + Shift + N，直接输入路径来创建文件。

![advancedNewFile](https://c2.is26.com/wp-image/2013/08/advancedNewFile.jpg)

2.[Alignment](https://wbond.net/sublime_packages/alignment)

自动对齐插件，看得整齐舒服点。

3.Bracket Highlighter

括号高亮显示

4.[CSScomb](https://github.com/csscomb/CSScomb-for-Sublime)

让CSS按照特定顺序排序。

5.[Emmet](https://docs.emmet.io/)

自动补全神器，妈妈再也不用担心我忘记属性了，前身是zencoding，必装。

6.jsFormat

js代码自动对齐

7.Markdown Preview

如果你是markdown语法爱好者&&ST死忠，可以考虑下这个。

8.Prefixr

css3前缀自动补全工具,Command+Alt+X激发。

9.Pretty Json

json文件自动样式化（你说乱七八糟一条龙的看得眼花多难受啊）

10.SFTP

SFTP协议用的，其实，我这个用得挺少的，ftp基本都用Filezila了，开发的时候都通过git push了。

11.SublimeLinter

高亮提示用户代码中的不规范和错误的写法，支持 JavaScript、CSS、HTML、Java、PHP、Python、Ruby 等十多种语言。

12.Tag

Html格式化

13.CSS预处理类

a. SASS : 直接"Install Package"搜，就可以在ST2里处理.sass文件了。

B. LESS:同上，处理.less文件

顺便说一下，编译工具目前我用的是[CodeKit](https://incident57.com/codekit/)，国内有个[Koala](https://koala-app.com/index-zh.html)貌似口碑不错，大家也可以试试。

14.ConvertToUTF8

把GBK 转UTF-8，遇到乱码神马的时候，还是有点淡淡忧郁的，顺便推荐一篇文章[《字符编码的前世今生》](https://www.smallni.com/character-encoding/),了解一下字符的基本知识，还是有点意思的。

15.GBK Encoding Support

GBK和UTF8自动转换的。

15.[Nettuts Fetch](https://github.com/weslly/Nettuts-Fetch)

自动获得最新的一些公开源包地址，jquery,normailiz.css之类的，话说其实用了bower之后，表示这些貌似也没啥太大必要了。

编辑器这东西，就是一个工具，好不好用，还是得看用户习惯和开发需要，像CSS预处理那些，也是哥用到了LESS和SASS的时候，发现咦怎么ST2编译.less和.scss后缀文件没了自动补全高亮这些了，然后才搜索安装的。

Sublime Text 2是一个收费软件,还很贵，但是，免费版的功能其实完全一样，就是时不时蹦出来提示你一下购买而已（那频率完全可以接受，不用担心，良心产品）。
