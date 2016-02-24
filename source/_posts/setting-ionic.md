---
title: Mac中配置ionic框架
date: 2015-02-27
tags: [ionic]
categories: 前端
---

最近想做一个App，却苦于自己没有那么多精力去学习Java和Object-C，自己只对JavaScript最熟悉，所以决定用Web来实现，也就是做一Hybrid App。
<!-- more -->

参考了很多Hybrid App的解决方案，觉得ionic最适合我。一是它性能比较出众，而是他基于Agular，我对Agular非常熟悉。

下面是ionic开发环境的配置方法，没有非常复杂：

## 安装ionic

``` python
$  npm install -g cordova ionic  # 安装cordova和ionic
```

可以有三种方式开始一个ionic项目：

``` python
$  ionic start myApp tabs   # 创建带有top栏和bottom栏的示例项目
$  ionic start myApp sidemenu　 # 创建带有左侧带有menu栏的示例项目
$  ionic start myApp blank   #创建空白项目
```

再执行下面命令就可以再浏览器查看效果了：

``` python
$  ionic sserve
```

## 添加ios平台

确保你已经安装了xcode，执行以下命令就可以再模拟器看到效果了：

``` python
$ sudo npm install -g ios-sim
$ cd myApp
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

## 添加Android平台

确保你已经配置好android的开发环境，执行以下命令就可以再模拟器看到效果了：

``` python
$ cd myApp
$ ionic platform add android //这行可能会报错
$ ionic build android
$ ionic emulate android
```

整个过程很简单，可能在配置android开发环境比较麻烦。
