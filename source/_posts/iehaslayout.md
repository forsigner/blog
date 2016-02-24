---
title: IE Haslayout
date: 2013-03-18
tags: [CSS]
categories: 前端
---



我们们那知道浏览器有bug，而且Windows上的lE的bug 似乎比太多数浏览器都多。IE/Win的衣现与其他浏览器不同的原因之一是，显示引擎使用一个称为布局(layout)的内部概念。因为布均是一个专门针对显示引擎内部工作方式的概念，所以一般悄况下不需要了解它。但是，布局问题是许多IE/Win显示bug的根源，所以理解这个概念以及它如何影响CSS是有捂助的。
<!-- more -->


什么是布局

Windows 上的IE 使用布局概念来控制元素的尺寸和定位。那些称为拥有布局(have layout)的元素负责本身及其子元素的尺寸和定位。如果一个元旦在没有拥有布局，那么它的尺寸和位置由最近的拥有布局的祖先元素控制。

IE 显示引擎利用布局概念减少它的处理开销。在理想悄况下，所有元素都控制自己的尺寸和定位。但是，这会在IE中导致很大的性能问题。因此，IE/Win开发团队决定只将布局应用于实际需要它的那些元素，这样就可以充分地减少性能开销。

在默认情况下拥有布局的元素包括:

- body
- 标准模式中的 html
- table
- tr, td
- img
- hr
- input, select, textarea, button
- iframe, embed, object, applet
- marquee

布局概念是Windows 上的I E 特有的，而且它不是CS S 属性.尽管某些CSS 属性会使元ffi拥有布局，但是在CSS 巾无法显式地设宣布局.可以使用JavaScript函数hasLayout 查看一个元亲是否拥有布局.如果元素拥有布局，这个函数就返回true ; 否则返回falseo hasLayout 是一个只读属性，所以无法使用JavaScript选行设置.

设宜以下CSS 属性会自动地使元亲拥有布局·

``` css
position: absolute
float: left or right
display: inline-block
width: any value
height: any value
zoom: any value (Microsoft property—doesn’t validate)
writing-mode: tb-rl (Microsoft property—doesn’t validate)
```

布局有什么效果?

布局是许多IElWin 显示bug 的根源。例如， 如果一个文本段落靠谷一个浮动元索，那么期望文本围绕这个元索。但是，在Windows 上的1E
6 和更低版本巾，如果段落拥有布局(例如，由于设置了高度).那么它就被限制为矩形，因此阻止文本国绕浮动元素〈见图9-5).




Figure Above:

期望文本围绕相邻的浮动元素，但是，在IE/Win上，如果文本元素拥有布局，就不会这样显示。

这会导致浮动布间的各种问题更糟的是，许多人使用IE 作为主浏览器，他们会俯误地认为这才是正确的表现，在其他浏览器以不同方式处理泞-动元素时，他们反而会这必不解.

另-个问题涉及拥有布局的元素如何确定自己的尺，如果元亲的内容变得比元素本身大，那么期望元素流出到元素外.但是，在Windows 上的IE 6
和更低版本中，拥有布局的元素会销误地扩展以便适应内容的尺寸(见图9-6).




Figure Above:

拥有布局的错误的扩展以便适应内容

这意味IE/Win中的width 实际上更像min-width. 这种行为也是在IE/Win中许多浮动布局被破坏的原因。当浮动框的内容错误地迫使框的宽度增加时，框对于可用空间来说太大了，因此下降到其他浮动元素在下面.

其他问题包括:

- 拥有布局的元素不进行收缩。
- 布局元亲对浮动进行自动消理。
- 相对定位的元素不获得布局。
- 在拥有布局的元素之间空白地不叠加。
- 在不拥有布局的块级链接上，单击区域只覆盖文本。
- 常见bug及其修复方法

CSS 开发人员最重要的技能之一是发现常见浏览器bug的能力。通过了解导致这些bug 的各种元索，可以在它们造成问题之前发现并且修复它们。

双空白边浮动bug

最常见且最容易发现的bug 之一是IE6和更低版本中的双空白边浮动bug。顾名思义，这个Windows bug使任何浮动元素上的空白边加倍(见图9-7)。

Figure Above:

IE/Win 的双空白浮动bug示意阁

这个bug 很容易修复，将元素的display 属性设置为inline 就行了.因为元素是浮动的，将display 属性设置为inline，实际上不会影响显示方式。但是，这似乎会阻止Windows 上的IE6和更低版本将所有空白地加倍。这是一个非常容易发现和修复的bug : 每当对具有水平空白边的元素进行浮动时，都应该很自然地将display属性设置为inline。

3像素文本偏移bug

另一个非常常见的I E 5-61Win bug 是3像素文本偏移bug。当文本与二个浮动元示相邻时，这个bug 就会表现出来。例如，假设将-个元素向左浮动，并且不希望相邻段落中的文本围绕浮动元素。你可能会在段落上应用一个左空白边，其宽度等于浮动元素的宽度:

``` css
.myFloat { float: left; width: 200px; }
p { margin-left: 200px; }
```

如果这么做，在文本和浮动元素之间就会出现一个莫名其妙的3像素间隙。(见图9-8) 。

Figure Above:

IE 5-6/Win 的3像素文本偏移bug示意图

修复这个bug 需要双管齐下。首先，给包含文本的元素设置任意的高度。这会迫使元素拥有布局，这在表面上会消除文本偏移。因为Windows 上的IE6和更低版本将height作为min-height那样对待，所以设置一个小的高度并不会影响元素在这些浏览器巾的实际尺寸。但是，这会影响其他浏览器，所以要使用Holly招数对除了Windows上的IE6 和更低版本之外的所有其他浏览器隐藏这个规则，

``` css
/* Hide from IE5-Mac. Only IE-Win sees this. \*/
* html p { height: 1%; }
/* End hide from IE5/Mac */
```

不幸的是，这么做会导致另一个问题。正如在前面学到的，拥有布局的元素被限制为矩形的，并且出现在浮动元索的旁边而不是它们的下面。添加200像素的空白边实际上会在IE5-6/Win 中在浮动元素和段落之间产生200像素的间隙。为了边免这个问隙，需要将IE 5-6/Win 上的空白边重新设置为零:

``` css
/* Hide from IE5-Mac. Only IE-Win sees this. \*/
* html p { height: 1%; margin-left: 0; }
/* End hide from IE5/Mac */
```

文本偏移被修复了，但是现在另一个3像亲间隙出现了，这一次是在浮动元素上。为了去掉这个问隙，需要在浮动元素上设置一个负值的3像素右空白边：

``` css
/* Hide from IE5-Mac. Only IE-Win sees this. \*/
* html p { height: 1%; margin-left: 0; }
* html .myFloat { margin-right: -3px; }
/* End hide from IE5/Mac */
```

如果浮动元素是除了图像之外的任何其他东西，那么这个问题己经修复了。但是，如果浮动元旦在是图像，那么还有放后一个问题需要解决。 IE 5.x/Win在图像的左右都添加3像亲的间隙。而IE6不改变图像的空白边。因此，需要用另一个招术在IE5.x/Win 上去掉3 像素的问隙:

``` css
/* Hide from IE5-Mac. Only IE-Win sees this. \*/
* html p { height: 1%; margin-left: 0; }
* html img.myFloat { margin: 0 -3px; ma\rgin: 0; }
/* End hide from IE5/Mac */
```

这会解决问题，但是采用的方式很难看而且太复杂。因此，如果可能的话，最好将这些规则分别放进单独的浏览器特定的样式表中。如果这样做，用于Windows上的lE 5.x的样式表如下：

``` css
p { height: 1%; margin-left: 0; }
img.myFloat { margin: 0 -3px; }
```
IE 6的样式表如下:

``` css
p { height: 1%; margin-left: 0; }
img.myFloat { margin: 0; }
```

IE 6躲躲猫bug

另一个奇怪而且很烦人的 bug 是IE6 的躲躲猫(peek-a-boo) bug，之所以起这个名称是因为在某些条件下文本看起来消失了，只有在前新装载页面时才再度出现。出现这个bug的条件是:一个浮动元素后面跟着一些非浮动元素，然后是一个清理元素，所有这些元素都包含在一个设置了背景颜色或阅像的父元束中。如果清理元素碰到了浮动元素，那么中间的作浮动元素看起来消失了，隐藏到了父元素的背景颜色或图像后面，只有在刷新页面时才重新出现(见图9-9)。




Figure Above:

IE 6的躲躲猫bug示意图

相对容器中的绝对定位

我要讨论的段后一个主要浏览器bug涉及相对定位容器中的绝对定位元素。在前面的章节中你学到将绝对定位的元素嵌套在相对容器中是多么有用。但是，IE6和更低版本在使用这种技术时有许多bug。

这些bug 的原因在于相对定位的元素没有获得IE/Win 的内部hasLayout 属性。因此，它们不创建新的定位上下文，所有绝对定位元素相对于窗口进行定位(见图9-10)。




Figure Above:

IE5.x对相对容器中的绝对定位元素的定位方式不正确

为了使Windows 上的IE 6和更低版本的表现正确。需要迫使相对应位的容器拥有布局。一种方法是在容器上显式地设置width 和height。但是，常常希望在不知道容器的width和height的况下，或者在需要这些属性保持灵活的情况下使用这种技术。

可以使用Holly 招数为容器提供一个的高度。这会让容器拥有布局。但是因为IE 6和更低版本中的元素会不正确地扩展以适应它们的内容，所以设置小的高度不会影响实际高度。

``` css
/* Hides from IE-Mac \*/
* html .container { height: 1%; }
/* End hide from IE-Mac */
```

停止对IE 的批评

IE 并不足惟一一种有bug 的浏览器，所以你可能会奇怪我为什么只关注IE bug。 不必担心，我找并不是专门和微软过不去，这么做是有理由的。

首先， IE 目前占有最大的浏览器市场份额。因为有许多人在使用IE，IE bug 往往很快被发现而且很好地记录下来。当在IE中发现一个重大的CSS
bug时，许多开发人员会尝试寻找修复方法或解决方案。由于IE的流行程度，被记录并修复的IE bug比其他任何浏览器都要多.

另一个主要问题是开发的节奏。Firefox、Safari和Opera等浏器不断地进行更新，新版本以非常高的频率出现。 bug 几乎一经发现就被修复了，并且发布浏览器的新版本.因此，现在讨论的任何Firefox或Safari bug 可能已经被下一个修订版修复了。

如此高的开发节奏确实很棒，但是也有自己的问题。开发人员要应付的浏览器版本不是两三个，而是20或30个。你无法确定用户是否使用最新的版本，这使测试变得极其困难。另一方面，IE差不多5年没有发布主要修订版了。因此，bug有更多的时间可以暴露出来，开发人员也有更强的寻找修复方法的动力。

幸运的是，IE 7承诺将成为更符合标准的浏览器。许多著名的IE bug 已经被解决，而且对高级CSS 2.1 选择器（比如子选择器和属性选择器）的支持也在增加。与所有浏览器一样，新的bug也会出现，IE7远不是完美的。但是，人们越快地升级到IE 7和Firefox 等现代浏览器，IE 5.0等老式浏览器就会越快地退役。

在这个过渡时期，可以考虑使用Dean Edwards 的IE 7 补丁。这是一系列JavaScript 文件，它们使IE 5-6/Win 能够接近IE7的水平.这包括改进的选择器实现和许多bug 修复。关与这个补丁的更多信息，请访问 http://dean.edwards.name/IE7/

摘自：http://adamghost.com/2009/03/ie-has-layout-and-bugs-zh/

下面是我收集到的关于IE Haslayout的文章,通过阅读这些文章，可以更加深入理解Haslayout：

- HasLayout Overview
- IE Haslayout 详解
- IE hasLayout的问题总结
- On having layout
