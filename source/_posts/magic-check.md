---
title: "用纯CSS美化radio和checkbox"
date: 2016.02.18
tags: [JavaScript]
---

Radio和checkbox需要美化吗？答案是必须的，因为设计风格一直都会变化，原生的样式百年不变肯定满足不了需求。

先看看纯CSS美化过后的radio和checkbox效果：[查看](http://forsigner.com/magic-check/)。

项目地址：[magic-check](https://github.com/forsigner/magic-check)

在CSS出现之前，我们美化radio和checkbox需要借助JavaScript，最具代表性的就是[icheck](https://github.com/fronteed/icheck)，它功能强大复杂并且主题很多。icheck这种美化方案很好很强大，但是也有很多缺点：

- 太重，需要引入JS、CSS，还有图片或者字体图标，而且还依赖jQuery
- 扩展性差，Pure js项目还好，如果是Angular.js、React、Vue.js或者Meteor项目，一般都需要自己对icheck做wrapper
- 样式自定义性不好，修改样式只能重新做图
- 事件行为跟原生不一致
- 可维护性差、复杂，谁用谁知道

所以，如果的项目不需兼容古董浏览器的话，用CSS美化radio和checkbox是最好的选择，这样什么都不用依赖，只需CSS，无JS，无图片，无字体图标。

为了更好的在项目中重用，我把美化的代码写成一个项目，叫[magic-check](https://github.com/forsigner/magic-check)，寓意像魔法一样去美化radio和checkbox。

用法非常简单，最好用Bower和npm进行管理，先Install：

- bower: ``` bower install --save magic-check```
- npm:  ```npm install --save magic-check```

然后加载CSS文件：

```html
<link rel="stylesheet" href="bower_components/magic-check/css/magic-check.css">
```
然后，只要给input元素加上一个CSS类magic-checkbox或magic-radio就可以：

** Radio**

```html
<input class="magic-radio" type="radio" name="radio" id="11">
<label for="11">Normal</label>
```

** Checkbox**

``` html
<input class="magic-checkbox" type="checkbox" name="layout" id="1">
<label for="1">Normal</label>
```
