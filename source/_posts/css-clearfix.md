---
title: "清除浮动的方法"
date: 2013-03-25
tags: [CSS]
---

float是网页布局中最常用的css属性之一，但是使用float同样会带来各种各样的问题，例如它使元素脱离正常的文档流，使父元素的高度坍塌等，所以我们经常要清除浮动。

<!-- more -->

现在，越来越多人反对使用float来布局，最具代表性的就是google，因为float布局是会产生各种问题，有事问题还是莫名其妙的，而且使用display: inline-block能够完成大多数float能完成的布局。但某些方面，display: inline-block并不能代替float，例如float的方向性，float依然是常用的布局属性之一，所以清除浮动不可避免。

清除浮动的方法很多，不过从分类来说，清除浮动的方法可以分成两类：

1.利用 clear 属性。
2.触发浮动元素父元素的 BFC (Block Formatting Contexts, 块级格式化上下文)。

常用的清除浮动方法

1.添加额外标签

这是比较古老一种方法，通过在浮动元素末尾添加一个空的标签然后使用clear:both。

3)父元素设置 overflow

``` css
.main{float:left;}
.side{float:right;}
.footer
```

优点：通俗易懂，容易掌握。
缺点：可以想象通过此方法，会添加多少无意义的空标签，有违结构与表现的分离，在后期维护中将是噩梦。

2.overflow 方法

通过设置父元素overflow值设置为hidden触发浮动元素父元素的 BFC；在IE6中还需要触发 hasLayout ，例如 zoom：1,使用方法如下：

3)父元素设置 overflow

``` css
.main{float:left;}
.side{float:right;}
.footer
```
优点：不存在结构和语义化问题，代码量极少。
缺点：内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。

3.使用 :after 伪元素的方法

主流的用法如下：

``` css
/* 清理浮动 */
.clearfix:after {
    visibility:hidden;
    display:block;
    font-size:0;
    content:" ";
    clear:both;
    height:0;
}
.clearfix {
    zoom:1;
}
```

这是现在主流的清理浮动方式。

"那些年我们一起清除过的浮动"提到两种更简洁的清除浮动方法：

方案一：

相对于空标签闭合浮动的方法代码似乎还是有些冗余，通过查询发现Unicode字符里有一个“零宽度空格”，也就是U+200B ，这个字符本身是不可见的，所以我们完全可以省略掉 visibility:hidden了。

``` css
.clearfix:after 
{
        content:"\200B";
        display:block;
        height:0;
        clear:both; 
}
.clearfix {
        *zoom:1;
 }
```

方案二：

由Nicolas Gallagher 大湿提出来的,原文:A new micro clearfix hack，该方法也不存在firefox中空隙的问题。

``` css
/* For modern browsers */
.cf:before,.cf:after {
        content:"";
        display:table;
}
.cf:after { 
        clear:both; /* For IE 6/7 (trigger hasLayout) */
}
.cf {
        zoom:1; 
}
```

上面的方法用到了  ：before伪元素，很多人对这个有些迷惑，到底我什么时候需要用before呢？为什么方案一没有呢？其实它是用来处理margin边距重叠的，由于内部元素 float 创建了BFC，导致内部元素的margin-top和 上一个盒子的margin-bottom 发生叠加。如果这不是你所希望的，那么就可以加上before，如果只是单纯的闭合浮动，after就够了！并不是如同大湿《Clear Float》一文所说的：但只使用clearfix:after时在跨浏览器兼容问题会存在一个垂直边距叠加的bug，这不是bug，是BFC应该有的特性。

推荐阅读

- 那些年我们一起清除过的浮动
- 清理浮动的几种方法以及对应规范说明
- 更简洁的 CSS 清理浮动方式

