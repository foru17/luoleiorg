---
title: Git log diff config高级进阶
date: "2013-09-06"
cover: https://c2.is26.com/wp-image/2013/09/git_wallpaper_clean_by_black_pixel-d5wmjnw.jpg
tags:
  - tutorial
---

前一段时间分享了一篇[《更好的 git log》](https://luolei.org/2013/08/better-git-log/)简要介绍怎么美化 git log 命令，其中提到了 `alias`命令，今天再继续谈谈 git相关， 看看如何通过配置自己的 git config 让自己的 git 用起来更顺手。

## git log 进阶

**在一行显示 git log**

```bash
#在一行显示 git log
git log --pretty =oneline`
#显示每个文件的变化行数，其中后面跟的`
# --start`参数是用来统计哪些文件被改动，有多少行被改动。
git log --oneline --stat
#图形化地显示 branch 的变化（方便查看 merge 变化）。
git log --oneline --graph，则可以
```

**查看不同时间段的 git log**

```bash
git log --until=1.minute.ago // 一分钟之前的所有 log
git log --since=1.day.ago //一天之内的log
git log --since=1.hour.ago //一个小时之内的 log
git log --since=`.month.ago --until=2.weeks.ago //一个月之前到半个月之前的log
git log --since ==2013-08.01 --until=2013-09-07 //某个时间段的 log
```

如果你想更加个性化地设置 git log 输出的不同参数的颜色，可以使用如下命令

`git log --pretty=format:"%h %ad- %s [%an]"`

其中的参数对应的是

```txt
%ad  author date  // 日期
%an author name // 作者名
%cn committer name //提交者姓名
%h SHA hash // hash值
%s subject //commit的描述
%d  ref names //对应的 branch 分支名
```

更多的选项可以使用`git help log` 来看看，如我在[《更好的 git log》](https://luolei.org/2013/08/better-git-log/)中提到的，你可以通过`alias` 来创建一个简洁的`git lg` 命令来定制自己喜欢的输出方案。

## git diff 进阶

`git diff` 是用来比较版本之间的差异变化 balbalbala 之类的，哪里修改了，哪里添加了 balbalbala

```bash
#与上次 commit 之间的差别（爸爸）
git diff HEAD
#与上上次（爷爷）
git diff HEAD^
# 与上上上次（曾祖父）
git diff HEAD^^
# 与前面第5次commit（好吧…祖先吧）
git diff HEAD~5
#中间是两个点比较(爸爸)和(爷爷)的差别
git diff HEAD^..HEAD
#比较 两个不同 hash 值记录之间的不同
git diff f5fdjsalfjdskaf..4fdklsajfdksaf
#比较 branch 之间的不同
git diff master bird
# 根据时间来比较哦
git diff --since=1.week.ago --until=1.minute.ago
```

## git blame

如果你想要看看某一个文件的相关历史记录，可以使用`git blame` 命令。 如`git blame index.html --date short`

![2._git_blame__base.less_--date_short__git__and_New_Tab-3](https://c2.is26.com/wp-image/2013/09/2._git_blame__base.less_-date_short__git__and_New_Tab-3.png)

## git config进阶

config 就是配置的意思，git config 字如其意，就是 git 的配置文件，git config 文件有三层。  
第一层config是在系统层`etc/gitconfig`， 可以通过使用 `git config --system`来进行配置，此层gitcofnig 配置针对系统所有用户的分支都有效。

第二层是`~/.gitconfig`，针对某个用户有效，针对此层设置使用的是`git config --global`命令。

第三层是项目文件夹中的配置文件，比如说我有一个 project1的文件夹，`project1/.git/config`就是在这个 repo 中使用的 gitconfig 配置。直接使用`git config` 就能进行配置。

## 基础配置

`git config --help`,使用这个命令可以列出 git config 的帮助列表。  
而使用`git config --list`,则可以显示你目前的 git config 配置。

**用户信息配置**

```bash
# 设置用户名
git config --global user.name "will luo"
# 设置用户邮箱
git config --global user.emal "i@luolei.org"

```

对于我们日常常用的 git 命令，我们可以通过下面设置来缩写

```bash
# status 缩写成 st
git config --global alias.st status
# checkout 缩写成 co
git config --global alias.co checkout
# branch 缩写成 br
git config --global alias.br branch
# commit 缩写成 ci
git config --global alias.ci commit

```

大家可以根据自己的喜好来缩写，当然，到时候别忘了备份自己的 config 文件（可参考我的博文[dotfiles新手教程](https://luolei.org/2013/09/dotfiles-tutorial/)）。
