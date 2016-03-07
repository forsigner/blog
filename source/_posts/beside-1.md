---
title: 怎样打造一个DOM元素位置引擎 (一)
date: 2016-03-06
tags: [JavaScript]
categories: 前端
---

## 碎碎念

这是一篇早就应该写的文章，但是由于过年前项目紧张，一直没有时间，这个周末决定把这笔债换了。这个项目开始于两个月前，也是花了比较多时间的一个项目，不像前段时间写的 Hexo 主题 [fexo](https://github.com/forsigner/fexo) ，灵感一现，两个晚上就大体出来了。这也是一个比较有意思的项目，因为它不是一个可以直接用的前端UI组件，它是一个基础UI类库，要更好的使用它，你需要再它基础上去实现一些可用的前端组件。

## 这个DOM元素位置引擎是什么？

说成一个引擎，实在有些装逼，其实它就是控制 DOM 元素位置的一个 JavaScript Library，在前端交互中，怎样给 DOM 元素定位是一个经常遇到的问题，所以我把可以通用的部分抽象出来，这样可以更方便的给元素定位。

这个类库我给它取名叫做 **[beside](https://github.com/forsigner/beside)**，意思是【在旁边】，这也是 **[beside](https://github.com/forsigner/beside)** 的核心功能，让一个元素放置于另一个元素旁边。

##  Beside起源

它起源跟艺术一样，源于生活（装逼）。其实他的起源来源于一个删除按钮，需求来源于我们的交互设计师。开始我们前端做了一个删除成员的功能，没有任何提示，就直接删除了。交互说这当然是不行的，要加个二次确认，前端说可以加个弹窗吗？交互说不行，不要这种大弹窗，在删除按钮旁边弹个小卡片就好了，也就是下面的效果:

![fo-popover](https://raw.githubusercontent.com/forsigner/blog/master/source/images/beside/fo-popover.png)

二次确认这个小功能，它就是 Beside 的起源。


## Beside 到底是什么？

一句话: **[beside](https://github.com/forsigner/beside)** 是一个让一个 DOM 元素放置在另一 DOM 元素的基础 UI 库。

Gibhub: **[beside](https://github.com/forsigner/beside)**

Demo: [查看](http://forsigner.com/beside/)

效果图：

![beside](https://raw.githubusercontent.com/forsigner/blog/master/source/images/beside/beside.png)

## 使用场景

使用 Beside 可以更方便的实现一些前端组件, 典型的包括： Tooltip、Popover、 Dropdown Menu、垂直居中的 Modal 等。

## Beside 的用法

```html
<script src="bower_components/beside/dist/js/beside.js"></script>

<div id="me">ME</div>
<div id="you">YOU</div>
```


```js
beside.init({
  me: document.getElementById('me'),
  you: document.getElementById('you'),
  where: 'top center'
});
```

### 基于 Beside 的 UI component

* [fo-popover](https://github.com/forsigner/fo-popover) A nice popover for Angular.
* [fo-tooltop](https://github.com/forsigner/fo-tooltip) A nice tooltip for Angular.

### 浏览器兼容性

- IE7 && IE7+
- Firefox
- Chrome
- Safari
- Opera
