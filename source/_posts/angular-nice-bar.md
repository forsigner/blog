---
title: 不可错过的Angular scrollbar library
date: 2016.02.17
tags: [JavaScript]
categories: 前端
---

最近，工作中忙于开发一个desktop apps，主要技术基于 [electron](https://github.com/atom/electron) 和 [angular.js](https://github.com/angular/angular.js) 。开发过程中，发现在 Windows 中滚动条巨丑无敌，作为一个设计出身的程序猿，我当然不能忍，于是我用下班时间造了一个 scrollbar 轮子，叫 **[angular-nice-bar](https://github.com/forsigner/angular-nice-bar)** （[查看 Demo](http://forsigner.com/nice-bar/)）。

我希望这个滚动条长得好看，可自定义，轻量级，不要依赖于jQuery，能和Ajax一起用，且支持黑色主题，因为我们的app是深色背景的。所以这个滚动条有以下高大上的Features ^ ^:

- Nice looking
- Customize
- Lightweight
- No jQuery dependency
- Can use with Ajax
- Support dark theme

开始，我并不想造轮子，尝试找一些现有的好用的angular scrollbar libraries，比如下面的类库：

- [Angular-perfect-scrollbar](https://github.com/itsdrewmiller/angular-perfect-scrollbar)
- [ngTinyScrollbar](https://github.com/yads/ngTinyScrollbar)
- [ng-scrollbar](https://github.com/asafdav/ng-scrollbar)
- [ng-scrollbars](https://github.com/iominh/ng-scrollbars)

可惜，这些libraries并不能很好满足我的需求，有些长得不好看，有些用起来别扭，有些和Ajax一起用就挂了，有些太重量级。因此我决定自己去实现一个。

希望**[angular-nice-bar](https://github.com/forsigner/angular-nice-bar)** 能帮到有需要的人。
