---
title: ionic常用命令
date: 2015-03-01
tags: [ionic]
categories: 前端
---

下面是ionic常用命令，或者在终端执行“ionic -h”也可以查看，由于这些命令会重复利用，所以还是整理一下，方便自己和别人。
<!-- more -->


``` python
$ npm install -g cordova ionic  # 安装ionic

$ ionic start myApp blank  # 开始一个空白ionic项目
$ ionic start myApp tabs  # 开始一个tabs ionic项目
$ ionic start myApp sidemenu  # 开始一个sidemenu ionic项目

$ionic serve  # 在浏览器运行项目

$ ionic platform add ios  # 添加到ios平台
$ ionic build ios  # build
$ ionic emulate ios  # 在模拟器运行项目
$ ionic run ios  # 在手机运行项目

$ ionic platform add android
$ ionic build android
$ ionic emulate android
$ ionic run android  # 在手机运行项目

$ ionic package [debug,release] [android,ios] # 打包

$ ionic upload  # 上传到ionic view

```
