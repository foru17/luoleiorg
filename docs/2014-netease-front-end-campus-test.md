---
title: 2014网易前端开发笔试题笔记
date: "2013-10-07"
cover: https://c2.is26.com/default.cover.jpg
categories:
  - code
tags:
  - develop
---

9月22日晚收到网易笔试通知，提示欢迎参加23号广州地区校招，详情笔试地点请等详细通知，结果一直到23日下午4点半，距离笔试开始只有2个半小时，才收到笔试地点的邮件和短信，这蛋疼得，于是赶在下班高峰期，赶往大学城华工。又是华工，看来各大企业都很偏爱大学城华工啊。投的岗位是杭州研发院的前端开发。

半路上买了一个麦当劳套餐，下地铁，换了三次站，在六点半终于赶到了大学城。A4教学楼，考场在2楼的一间教室，教室门口贴着一张笔试名单：一张半纸。前端开发的大概20个，运维的、产品的也都在一张纸上，总共大概100多人，哥惊讶发现自己排在第一（座位号），大部分笔试者是华工、中大、广外的，暨大的我只见到3个（百年侨校情何以堪），另外见到一个西安电子科技大学，一个香港中文、一个深大的。广州其他学校的几个学校的同学基本没有，看情况网易这次笔试是直接设了学历槛，不知道有没有了解情况的朋友？当然，广州这边的考生一般也不怎么想出省也是一个原因，网易游戏倒是广州的，可能那个会比较多人吧。

现场还有不少来霸笔的，感觉比正常笔试的还多，工作人员让正常笔试的排一队，霸笔的在另一边再排一队。跟在场的其他同学随便扯了扯，然后拿出手机开 Evernote 看了一下以前整理的前端相关的一些笔记，7点就进考场了，监控的人员胸口挂了一个「智联招聘」的牌子，敢情网易把这个笔试是直接外包了。笔试者按照座位号入座，霸笔的被工作人员领到了其他地方。发试卷了，一张答题卡，一套试卷。这个答题卡，就上面一个「个人信息栏」，下面就是空白，意味着，所有的选择题、填空题、编程题，都要你自己写，如果答题卡不够，可以再要。下面来说说考题。

## 考什么

总共有两大部分，第一部分为计算机科学基础题，所有技术岗的笔试者都要答。第二部分为「专业题」，根据所报岗位不同而分别出题。

### 第一部分:计算机科学基础题

表示试卷发下来，我就傻眼了，前面12道选择题+3道填空题，属于所有技术岗位都必须考的计算机专业基础题。 由于我不是计算机专业的，不少计算机科学很理论化的知识的确是不了解，刚刚搜到CSDN 已经有人放出了前面的一部分，自己也就先 COPY 过来吧，解析部分为自己整理，若出错，请指正。

1.（2分）对于多关键字而言，那种文件组织方便而又高效（） A、顺序文件 B、倒排文件 C、散列文件 D、B+树索引文件

解析:答案 B。

文件在外存上的基本的组织方式有四种：顺序组织，索引组织，散列组织和链组织；对应的的文件名称分别为：顺序文件、索引文件、散列文件和多关键字文件。选择哪一种文件组织方式，取决于对文件中记录的使用方式和频繁程度、存取要求、外存的性质和容量。 **多关键字文件**:包含有多个次关键字索引的文件称为多关键字文件。 **倒排表**的主要优点是：在处理复杂的多关键字查询时，可在倒排表中先完成查询的交、并等逻辑运算，得到结果后再对记录进行存取。这样不必对每个记录随机存取，把对记录的查询转换为地址集合的运算，从而提高查找速度。

2.（2分）以下哪些算法可用于遍历网络图（） A、广度优先搜索 B、深度优先搜索 C、线性规划策略 D、决策树

解析:答案 A、B。

**广度优先搜索**假设从图中某个顶点v出发，在访问了v之后依次访问v的各个未曾访问过的邻接点，然后再分别从这些邻接点出发依次访问它们的邻接点，并使先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问（因此需要用队列来存储顶点），直到图中所有已被访问的顶点的邻接点都被访问为止。如果此时图中还有未被访问的顶点，则另选图中未被访问的顶点作为起点，重复上述过程，直到图中所有顶点都被访问为止。

**深度优先搜索法**是树的先根遍历的推广，它的基本思想是：从图G的某个顶点v0出发，访问v0，然后选择一个与v0相邻且没被访问过的顶点vi访问，再从vi出发选择一个与vi相邻且未被访问的顶点vj进行访问，依次继续。如果当前被访问过的顶点的所有邻接顶点都已被访问，则退回到已被访问的顶点序列中最后一个拥有未被访问的相邻顶点的顶点w，从w出发按同样的方法向前遍历，直到图中所有顶点都被访问。

3.（2分）我们使用一个6元组<a,b,c,d,e,f>来表示6个节点的无向图的顶点数，请问以下哪些6元组是可能的组合（） A、<1,2,3,4,5,6> B、<2,4,4,2,3,5> C、<1,3,4,2,2,1> D、<1,2,2,4,5,2>

解析:

**无向图**:一个无向图(undirected graph)是一个二元组<V,E>，其中：1.V是非空集合，称为顶点集。2.E是V中元素构成的无序二元组的集合，称为边集。

若一个图中每条边都是无方向的，则称为无向图。 若G是无向图，则0≤e≤n(n-1)/2

4.（2分）以下关于可计算性的说法正确的是（） A、 所有问题最终都可以抽象为一个计算模型，图灵机可以在一个有限的时间（虽然可能会占用非常久的时间）内完成计算：现代计算机的设计正是基于该理论。 B、 存在部分问题，我们无法在有限时间内，给出解答：但是，所有问题都可以在有限时间内验证其解答的正确性。 C、 Godel（哥德尔）第一定律指明不存在完备且相容的公理系统。 D、 以上说法都不正确。

5.（2分）16进制数值C396和8进制数值64474的异或结果值（10进制）为（） A、43690 B、16660 C、60350 D、20375

解析:

**异或**:Exclusive OR（异-或运算、模2和）,异或（xor）是一个数学运算符。它应用于逻辑运算。异或符号为“^”。真异或假的结果是真，假异或真的结果也是真，真异或真的结果是假，假异或假的结果是假。就是说两个值不相同，则异或结果为真。反之，为假。 不同为1,相同为0.

若x是二进制数0101，y是二进制数1011，则x^y=1110。 只有在两个比较的位不同时其结果是1，否则结果为0 即“相同为0，不同为1”！

6.（2分）以下经典的问题哪些属于NP问题（） A、图灵停机问题 B、排序 C、0，1背包问题 D、枚举有限集合的所有子集

7.（2分）存在以下字母串：AGDCCDDDGFBBFFGGDDDGGGEFFDDCCCDDDFGAAA现在需要对该串进行Huffman编码，那么字母F对应bit值（二进制格式为）（） A、10 B、11 C、110 D、101

解析：

```
//既然现在用电脑，就用 javascript 来解决一下如果数数的问题
var temp='AGDCCDDDGFBBFFGGDDDGGGEFFDDCCCDDDFGAAA';
var count=temp.match(/F/g); // 搜索整个字符串匹配字母 F
console.log(temp.length); //字符总长度为36
console.log(count.length);; //输出的结果应该是6
```

**霍夫曼编码**:（Huffman Coding）是一种编码方式，是一种用于无损数据压缩的熵编码（权编码）算法，该方法完全依据字符出现概率来构造异字头的平均长度最短的码字，有时称之为最佳编码。

**HC 具体方法**:先按出现的概率大小排队，把两个最小的概率相加，作为新的概率 和剩余的概率重新排队，再把最小的两个概率相加，再重新排队，直到最后变成1。每次相 加时都将“0”和“1”赋与相加的两个概率，读出时由该符号开始一直走到最后的“1”， 将路线上所遇到的“0”和“1”按最低位到最高位的顺序排好，就是该符号的霍夫曼编码。

9.（2分）进程管理如果设计不当将会导致“死锁”的产生，对待死锁，典型的银行家算法属于（1），而剥夺资源属于（2）的方法。 A、（1）=死锁预防，（2）=死锁避免 B、（1）=死锁预防，（2）=死锁解除 C、（1）=死锁避免，（2）=死锁预防 D、（1）=死锁避免，（2）=死锁解除

解析：答案B

**死锁**: 是指两个或两个以上的进程在执行过程中，因争夺资源而造成的一种互相等待的现象，若无外力作用，它们都将无法推进下去。

**系统产生死锁的四个必要条件**: 1）互斥条件：指进程对所分配到的资源进行排它性使用，即在一段时间内某资源只由一个进程占用。如果此时还有其它进程请求资源，则请求者只能等待，直至占有资源的进程用毕释放。 2）请求和保持条件：指进程已经保持至少一个资源，但又提出了新的资源请求，而该资源已被其它进程占有，此时请求进程阻塞，但又对自己已获得的其它资源保持不放。 3）不剥夺条件：指进程已获得的资源，在未使用完之前，不能被剥夺，只能在使用完时由自己释放。 4）环路等待条件：指在发生死锁时，必然存在一个进程——资源的环形链，即进程集合{P0，P1，P2，···，Pn}中的P0正在等待一个P1占用的资源；P1正在等待P2占用的资源，……，Pn正在等待已被P0占用的资源。

**银行家算法**:我们可以把操作系统看作是银行家，操作系统管理的资源相当于银行家管理的资金，进程向操作系统请求分配资源相当于用户向银行家贷款。操作系统按照银行家制定的规则为进程分配资源，当进程首次申请资源时，要测试该进程对资源的最大需求量，如果系统现存的资源可以满足它的最大需求量则按当前的申请量分配资源，否则就推迟分配。当进程在执行中继续申请资源时，先测试该进程已占用的资源数与本次申请的资源数之和是否超过了该进程对资源的最大需求量。若超过则拒绝分配资源，若没有超过则再测试系统现存的资源能否满足该进程尚需的最大资源量，若能满足则按当前的申请量分配资源，否则也要推迟分配。

10.（2分）关于数据库索引，以下说法正确的是（） A、针对某些字段建立索引，能够有小减少相关数据库表的磁盘空间占用； B、针对某些字段建立索引，能够有效的提升相关字段的读与写的效率； C、常见数据库管理系统，通常使用hash表来存储索引； D、数据库索引的存在，可能导致相关字段删除的效率降低；

###### 第二部分:专业题(前端开发)

题型有1.不定项选择题 12道，2.填空题 5道左右 3.简答题 4.编程题 5道左右，偏重考察 javascript，编程题要求手写代码，其中包含 js 题目3道还是4道，一道给出三切换标签界面原型图，要求手写html+css+javascript实现原型图和交互效果。由于距离有一段时间了，详细的题目记不清楚了。就回忆一下几个知识点吧。

1.简答题:什么是闭包，闭包有什么用？请举例说明。

解析：Javascript中，函数内部可以读取全局变量，函数外部无法读取函数内部的局部变量。

```
function f1(){
    var n=1024;
    function f2(){
        console.log(n)
    }
    return f2();
}
var foo =f1();
foo();
//以上函数f2()就是闭包
```

闭包就是能够读取其他函数内部变量的函数。

2.填空题:apply 和 call 的用法和区别。

解析:

两者的作用都是将函数绑定倒另外一个对象上面去，两者仅仅在定义参数方式有所区别。

来自 MDN 的解释：NOTE: While the syntax of this function is almost identical to that of apply(), the fundamental difference is that call() accepts an argument list, while apply() accepts a single array of arguments.

```
  apply(thisArg,argArray);
  call(thisArg[,arg1,arg2…] ]);
```

3.bind 函数的兼容性

解析：

bind方法会创建一个新函数,称为绑定函数.当调用这个绑定函数时,绑定函数会以创建它时传入bind方法的第一个参数作为this,传入bind方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数.

`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

4.参考给出的原型图和要求，手写 html，css和 js。

```html
<iframe
  src="https://jsfiddle.net/foru17/cnvca/3/embedded/result,html,css,js"
  width="100%"
  height="300"
  frameborder="0"
  allowfullscreen="allowfullscreen"
></iframe>
```
