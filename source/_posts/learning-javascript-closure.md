---
title: Javascript闭包
date: 2013-02-13
tags: [JavaScript]
categories: 前端
---


从开始学习JavaScript时，就听说闭包是个强大的东西，但也是一个很复杂很难懂的东西。一直以来也对闭包似懂非懂，

直到最近在读汤姆大叔的深入理解JavaScript系列 才基本弄懂什么是闭包，这里感学大叔无私的分享，这种无私的分享精神非常值得学习。下面关于我对闭包的描述大多数也是从大叔那看来。

<!-- more -->

闭包的定义

从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。

从实践角度：以下函数才算是闭包：
             1.即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
             2.在代码中引用了自由变量
上面是汤姆大叔对闭包的定义，本来我想用自己的话来定义一下，但发现这是我见过对闭包最完美的定义，自己实在想不出有比这更准确、更通俗易懂的定义了，所以也不去写自己对闭包的定义了。

闭包的例子

下面是一些闭包使用的例子，当然这里的闭包是从实践的角度来讲的。

例子一（最简单的闭包）：

``` js
var a = "hello"; //函数外部的自由变量a
//这个函数就是一个闭包
function simplestClosure() {
    alert(a);
}
simplestClosure(); //将alert出hello
```

函数simplestClosure在自己的scope寻找不到变量a，(我就把scope称作函数的作用域吧，虽然不太正确，但好理解)，它就会通过作用域链在它的父级函数的作用域或全局内寻找变量a，通过这种链式查找，函数可以访问到自由变量a，这就形成了最简单的闭包。

例子二（内部函数从父函数中返回）：

``` js
var x = 1;
function outerClosure()  {
    var y = 2;
    return function closure(z) {
        alert(x+y+z);
    }
}
//调用闭包函数closure，将alert出6
```

例子三（使用匿名函数隐藏全局作用域变量）：

``` js
// 创建一个匿名函数作为包装
(function() {
    //变量原本应该是全局的
    var msg = "hello";
    //将一个新函数绑定到全局对象
    window.onload = function()  {
    // 这个函数使用“隐藏”变量msg
       alert(msg);
    }
})();
```

例子四（创建封装的作用域来隐藏辅助对象）：

``` js
var foo = {};
// 初始化
(function (object) {
    var x = 10;
    object.getX = function _getX() {
        return x;
    };
})(foo);
alert(foo.getX()); // 获得闭包 "x" – 10
```

例子五（延时调用）：

``` js
var a = 10;
setTimeout(function () {
    alert(a); // 10, after one second
},  1000);
```

例子六(回调函数)：

``` js
var x = 10;
// only for example
xmlHttpRequestObject.onreadystatechange = function() {
    // 当数据就绪的时候，才会调用;
    // 这里，不论是在哪个上下文中创建
    // 此时变量“x”的值已经存在了
    alert(x); // 10
};
```

这里没深入讨论闭包的理论，有兴趣的同学建议去看看大叔的博客和他的的深入理解JavaScript系列。

done。
