---
title: "用JavaScript修复ipa处理过的的png图片"
date: 2016.02.16
tags: [JavaScript]
---

最近做项目遇到一个需求：**解析apk和ipa包，然后把里面的icon上传到服务器。**

## 问题

解析上传过程比较简单，我使用[JSZip][1]对apk和ipa进行解压，然后把找到里面的icon上传到服务器。但是，当我在网页中使用图片时，问题出现了。对于apk中的icon，没有任何问题，但是对于ipa中解析出来的图片，在safari中可以正常显示，在其他任何浏览器去无法显示。

## 原因

Google后发现，是苹果对png图片进行了优化处理，具体看这篇文章（[查看][2]），在文章中我们可以了解到一些有用信息：

> Apple uses [PNGCursh][3] open source library to crush png images inside iPA files。

## 解决方案

作为一个前端工程师，我希望用javascript解决这个问题。其实之前国外已经有人去解决了，[NodeJS-PNGDefry][4]就是可以，可惜这个太久没维护，已经跑不起来。

找不到可用的，我只能自己动手丰衣足食，自己写一个。因此有了[node-pngdefry][5]。[node-pngdefry][5]的功能很明确，就是用Javascript来还原被苹果处理过的png图片。

[node-pngdefry][5]用法很简单，支持命令行和常规的Node.js:

#### 命令行用法

**install：**

```bash
$ npm install -g pngdefry
```

** then run:**

```bash
$ pngdefry -i icon.png -o icon.new.png
```




#### 在Node.js中使用


``` bash
$ npm install pngdefry --save-dev
```

``` js
var pngdefry = require('pngdefry');
var path = require('path');

var input = path.join(__dirname, 'icon.png');
var output = path.join(__dirname, 'icon.new.png');

pngdefry(input, output, function(err) {
  if (err) {
    return;
  }

  console.log('success');
});

```

#### Test

``` bash
$ npm test
```

#### 项目地址

[node-pngdefry][5]


#### 感谢

最后感谢上面提到的文章的作者Jongware。

  [1]: https://stuk.github.io/jszip/
  [2]: http://www.jongware.com/pngdefry.html
  [3]: http://pmt.sourceforge.net/pngcrush/
  [4]: https://github.com/Startappz/NodeJS-PNGDefry
  [5]: https://github.com/forsigner/node-pngdefry
