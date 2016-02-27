---
title: CSS BFC(Block Formatting Context)
date: 2013-03-20
tags: [CSS]
categories: 前端
---


## BFC的定义

BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。BFC在创建了 Block Formatting Context 的元素中，其子元素会一个接一个地放置。垂直方向上他们的起点是一个包含块的顶部，两个相邻的元素之间的垂直距离取决于‘margin’ 特性。在 Block Formatting Context 中相邻的块级元素的垂直边距会折叠（collapse）。
<!-- more -->


在 Block Formatting Context 中，每一个元素左外边与包含块的左边相接触（对于从右到左的格式化，右外边接触右边）， 即使存在浮动也是如此（尽管一个元素的内容区域会由于浮动而压缩），除非这个元素也创建了一个新的Block Formatting Context 。

BFC到底是什么？

当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个BFC就是一个独立的行政单位的意思。

## 怎样才能形成BFC

- float的值不为none。
- overflow的值不为visible。
- display的值为table-cell, table-caption, inline-block中的任何一个。
- position的值不为relative和static。

## BFC的作用

1.不和浮动元素重叠

如果一个浮动元素后面跟着一个非浮动的元素，那么就会产生一个覆盖的现象，很多自适应的两栏布局就是这么做的。比如下图的效果，参考例子

123
The quick brown fox jumped over the lazy dog's back. The quick brown fox jumped over the lazy dog's back. The quick brown fox jumped over the lazy dog's back. The quick brown fox jumped over the lazy dog's back. The quick brown fox jumped over the lazy dog's back.

2.清除元素内部浮动

只要把父元素设为BFC就可以清理子元素的浮动了，最常见的用法就是在父元素上设置overflow: hidden样式，对于IE6加上zoom:1就可以了(IE Haslayout)。

3.嵌套元素Margin边距折叠问题的解决

按照BFC的定义，只有同属于一个BFC时，两个元素才有可能发生垂直Margin的重叠，这个包括相邻元素，嵌套元素，只要他们之间没有阻挡(例如边框，非空内容，padding等)就会发生margin重叠。

因此要解决margin重叠问题，只要让它们不在同一个BFC就行了，但是对于两个相邻元素来说，意义不大，没有必要给它们加个外壳，但是对于嵌套元素来说就很有必要了，只要把父元素设为BFC就可以了。这样子元素的margin就不会和父元素的margin发生重叠了。

摘自：http://www.w3cmm.com/other/css-bfcblock-formatting-context.html
