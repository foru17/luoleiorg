---
title: 淘宝前端智勇大闯关第三季:相关知识点
date: "2013-08-15"
cover: https://c2.is26.com/wp-image/2013/08/Screen-Shot-2013-08-16-at-2.35.41-AM.png
categories:
  - code
tags:
  - javascript
---

昨天在微博看到阿里巴巴校园招聘发了一条微博：[淘宝UED前端智勇大闯关”第三季来啦](https://ued.campus.alibaba.com/quiz3/index.php?t=ZDE1YmVjZTg5M01uc2lBUVlHQndFT0ExRUdWa2tH)，今晚临时做了一下，倒也挺有意思，涉及挺多知识点，也挺有趣，有兴趣的童鞋可以去试一试。这篇文章，来说一说这次闯关涉及的一些知识点，也当作是分享吧。

#### **第一关:密码解锁**

做这种前端相关的题目，chrome或者firefox这种带开发者工具调试台的浏览器是必须的，看源码也是几本技能。第一关直接注释在源码里了，console执行几次命令，右侧就会随机出来三个数字，然后3！=最多6次试一试，就通关了。

#### **第二关：棱镜（难道在黑美帝么）**

![quiz-2-a](https://c2.is26.com/wp-image/2013/08/quiz-2-a.png)

这关简单，考察css3的rotae属性值，修改一下两个镜子的 left,top 和 -webkit-transform 就好。

#### **第三关：Canvas二维码**

展示一堆数字，做这题的时候表示的确是不会，第一次做的时候，就在这里卡住了直接time up game over。

![quiz-2](https://c2.is26.com/wp-image/2013/08/quiz-2.png)

#### **第四关：看图猜东西**

给你展示五张logo或者软件截图，有sublime，github，npm，ubuntu，grunt, less balabala平时前端开发涉及得到的软件和网站。

![quiz-4](https://c2.is26.com/wp-image/2013/08/quiz-4.png)

#### **第五关：猜房子**

![quiz-5](https://c2.is26.com/wp-image/2013/08/quiz-5.png)

我猜出了过程，却没写出代码，555，提示用jquery，这到底思路倒是正确了，通过 $('#id').html() 或者 .txt() 抓去#next-room里的数字，然后获得当前页面的url，修改最后的那个数字。第一次做这题的时候，脑袋短路，没注意到url，view source看了好久每个着落，后来console提示注意url，结果哥还是没看到那room号。思路是对的，查了下jquery的文档，知道了get current page url的几个函数，然后用ajax抓去新界面中的新数字，一直到最后的房间出来为止。

这道题的答案可以参考[《淘宝ued - 前端智勇大闯关(第三季)答案》](https://www.cnblogs.com/webmoon/p/3260502.html)，小提示一下，setTimeOut那个间隔时间没必要设置3秒那么长，直接100毫秒就好了。

做完第五关后，console里提示出下一关的url，我第二次做的时候，提示的url里面是这样的「的/quiz3/i入口。ndex.php干吧爹！?t=MDdmN好吧，DMyYjhHd懒得DVSd25Wd打字了0VHQmxjU还是FVRRUZDa告诉下一关的地址是ued.campus.alibaba.com/quiz3/i入口。ndex.php干吧爹！?t=MDdmN好吧，DMyYjhHd懒得DVSd25Wd打字了0VHQmxjU还是FVRRUZDa告诉」，一堆汉字混在url中，当时想着用正则提取出汉字，结果处理的时候，却提示错误，话说如果遇到这种情况，你会怎么解决呢？后来再做的时候，就直接给出url了。

下面是JQUERY获取当前页面的URL信息的一些函数（摘自[《JQUERY获取当前页面的URL信息》](https://blog.unvs.cn/archives/jquery-local-url-param.html)）

```js
window.location.pathname
例：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361) alert(window.location.pathname); 则输出：/topic/index

设置或获取整个 URL 为字符串。 window.location.href
例：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361) alert(window.location.href); 则输出：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361)

设置或获取与 URL 关联的端口号码。 window.location.port
例：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361) alert(window.location.port); 则输出：8086

设置或获取 URL 的协议部分。 window.location.protocol
例：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361) alert(window.location.protocol); 则输出：http:

设置或获取 href 属性中在井号“#”后面的分段。 window.location.hash

设置或获取 location 或 [URL](https://blog.unvs.cn/catalog.asp?tags=URL "标签_URL_搜索结果") 的 hostname 和 port 号码。 window.location.host
例：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361) alert(window.location.host); 则输出：http:localhost:8086

设置或获取 href 属性中跟在问号后面的部分。 window.location.search
例：[https://localhost:8086/topic/index?topicId=361](https://localhost:8086/topic/index?topicId=361) alert(window.location.search); 则输出：?topicId=361
```

#### **第六关：没出来**

难道因为第五关的答案是我copy直接运行的，当我作弊了，第六关出来还是密码锁 ~ ~ 。

顺便再提示一下，这次闯关倒计时是30分钟，其实，可以自己在console里修改一下时间的。

var \_GNow = 1800; //把这个1800改成一个你喜欢的很大很大的数字~ ~就好了。

总的来说，这次闯关主要考察的还是偏js吧，对于我这种js渣来说，压力还是挺大，说多了都是泪，再多说人羞愧，哥写node去了，时间好紧啊，下个月就各种校招了，木什么作品拿出手啊。
