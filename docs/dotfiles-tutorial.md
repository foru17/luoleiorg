---
title: dotfiles新手教程
date: "2013-09-01"
cover: https://c2.is26.com/wp-image/2013/09/dotfiles.jpg
tags:
  - tutorial
---

大概四个月前，跟朋友聊天，谈到了dotfiles的问题，当时还不知道dotfiles这东西是什么，回去google一下，看得一堆文件想着这什么跟什么啊，就没管了，后来又见paul irish在视频中提到了dotfiles，想着来点钻研精神，就仔细地研究了一下 dotfiles 相关的知识。这篇博文属于技术类，没兴趣的朋友们可以关闭此窗口了。

首先复制下自己100天前在V2EX发的帖子「[菜鸟如何入门dotfiles管理？](https://v2ex.com/t/70242)」，看看我当时是怎么理解dotfiles。

## 菜鸟如何入门dotfiles管理？

前几个月就知道dotfiles这个东西，可是怎么都玩不会，在这里请教一下大家。

1.**dotfiles是什么？**

我自己的理解:linux下（mac下）有各种app，每个人会根据自己的喜好和习惯来设置一些（快捷键，变量等等），而dotfiles就是保存了这些自定义设置的文件，如果换一台电脑，只要你备份了dotfiles文件，一样可以快速回归到自己熟悉的设置。

2.**如何使用dotfiles?**

我自己的理解：a.在系统中使用一个文件夹，通过ln命令，将不同的app，不同的系统设置文件都指引到这个文件夹，这样就可以在这个文件夹管理所有的系统app setting了？。

3.**进阶**  
既然都统一到了一个文件夹，那么，就可以通过git，dropbox来进行备份，分享，也可以clone下其他人的dotfiles。

不知道自己的理解有没有错，话说中文基本没有入门教程，英文也就是github的那个和一些使用dropbox来备份的。

## 理解ln命令

dotfiles 这东西，翻译过来就是「点文件」，就是以`.`开头的文件，常见的如`.bash_profile`,`.vimrc`,`.zshrc`等等。在linux,osx等系统中，这些dotfiles默认都是隐藏的，在shell下要看到这些文件得用`ls -a`命令。像程序猿们，常用到vim, sublime text2, iterm ,zsh 等等相关的工具和开发环境，为了用得顺手，也会根据个人习惯和喜好改改不同工具、环境的配置。

这些点文件，就是我们今天谈的dotfiles，一般来说，配置好了，也不常改，可以万一换了个机器或者坏了个机器，如果要重新配置自己的配置文件，那就蛋疼了。所以，大家应该要会利用好、管理好好自己机器的dotfiles，放到改放的地方，做好备份。

要管理好dotfiles文件，首先得了解一个linux下的命令`ln`。 ln命令是linux下一个十分重要也有用的命令，她可以为一个文件在另外一个地方建立一个同步的链接，类似于快捷键。

`ln [参数][源文件或目录][目标文件或目录]`

在我们备份dotfiles中常用的参数有`ln -s`软链接，s是代号symbolic的意思，所谓软链接，她只会在你选定的位置上生成一个镜像，而不会占用磁盘空间，而如果使用`ln`不带参数的话，则就是硬链接，会在选定的位置上生成一个和源文件大小相同的文件，占用磁盘空间。

## 使用git备份

接下来就是管理自己的dotfiles了，首先找个地方创建一个文件

```bash
mkdir dotfiles //创建一个dotfiles的文件夹放在你喜欢的地方
cd dotfiles
pwd //看看文件夹位置
/Users/luolei/Dropbox/dotfiles  //我放在dropbox里
git init //创建git
```

下面来把系统里的那些dotfiles软连接到这个文件夹

```bash
cd ~/ 去到根目录
mv .vimrc ~/Users/luolei/Dropbox/dotfiles/vimrc
mv .zshrc  ~/Users/luolei/Dropbox/dotfiles/zshrc
ln -s ~/Users/luolei/Dropbox/dotfiles/vimrc .vimrc
ln -s ~/Users/luolei/Dropbox/dotfiles/zshrc .zshrc
```

以上举例软链接了.vimrc , .zshrc到dotfiles，其他的文件类似。软链接做好了后，接下来，你可把这些推到github上（首先要在github上创建一个repo），记得添加一个`.gitignore`。

```bash
cd ~/Users/luolei/Dropbox/dotfiles/
git add .
git commit -m '创建dotfils'
git remote add origin git@github.com:username/dotfiles.git
git push -u origin master
```

好啦，备份完了，现在，由于你努力学习工作，终于神舟换IBM，mini换rmbp，要恢复下dotfiles。

```bash
git clone git@github.com:username/dotfiles.git dotfiles
rm -rf .vimrc .zshrc //首先删除自身机器上原有的dotfiles
ln -s dotfiles/vimrc .vimrc
ln -s dotfiles/zshrc .zshrc
```

dotfiles管理核心理念就是上面所说的，几本掌握好`ln`命令和git（或者其他备份方法）就好，大家可以参考一下[dotfiles.github.io](https://dotfiles.github.io/)上分享的大神的dotfiles，其实如果大家追求更加自动化，可以自己写`.sh`脚本把什么软链接都自动化。比如说paulmillr分享的[dotfiles](https://github.com/paulmillr/dotfiles) .

咳咳，最后再放一个自己的[dotfiles](https://github.com/foru17/luolei-dotfiles)，请忽视吧。
