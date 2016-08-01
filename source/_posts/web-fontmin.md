---
title: Web-Fontmin -- 在线提取你需要的字体
date: 2016-03-13
tags: [JavaScript,Fontmin]
categories: 前端
---


# 关于@font-face

** [@font-face](http://www.w3.org/TR/css3-fonts/)** 是[CSS3](http://www.w3.org/TR/CSS/#css3)中的一个模块，使用 @font-face 可以自定义网页字体，即使用户的电脑没有安装某种字体。怎么用 @font-face 呢？你可能见过类似下面的代码片段，它可以让 @font-face 兼容所有浏览器。

```css
@font-face {
    font-family: "SentyZHAO";
    src: url("/fonts/SentyZHAO.eot"); /* IE9 */
    src: url("/fonts/SentyZHAO.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("/fonts/SentyZHAO.woff") format("woff"), /* chrome, firefox */

    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url("/fonts/SentyZHAO.ttf") format("truetype"),
    url("/fonts/SentyZHAO.svg#SentyZHAO") format("svg"); /* iOS 4.1- */
    font-style: normal;
    font-weight: normal;
}
```

# Webfont Generator - Font Squirrel

在上面的代码片段可以看出，要兼容性好的使用 @font-face，我们同时需要 eot 、woff、ttf、svg 格式的字体。常用的工具是 [fontsquirrel](http://www.fontsquirrel.com/fontface/generator)，一个字体生成器，可以在线生成  eot 、woff、ttf、svg 格式的字体，相信很多前端用过，具体用法可以官网试试。

# Fontmin

第一个纯 JavaScript 字体子集化方案，一个百度出品的优秀工具。
Fontmin 有什么用呢？

> 提供了 ttf子集化，eot/woff/svg格式转换，css生成 等功能，助推 webfont 发展，提升网页文字体验。

上面是官方的说法，通俗地理解有3个作用：

1. 提取部分字体
2. 转换字体格式
3. 生成 webfont 和对应 CSS 样式

##  Fontmin 应用场景

有时候，我们想给网站的 Logo 、 Slogan 、标题、活动页等的中文自定义字体，我们可以使用 @font-face 引入 Web 字体，但是完整的中文字体库都是 8M 10M ，加载性能非常差，所以我们提取部分我们使用到的字体，这样可以把字体文件变成几KB。

##  Fontmin 用法

Fontmin 的用法很简单：

```js
var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('fonts/*.ttf')
    .dest('build/fonts');

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});
```

详细介绍和用法可以看这篇文章： http://efe.baidu.com/blog/fontmin-getting-started/

## 基于 Fontmin 的工具

- **[fontmin-app](https://github.com/ecomfe/fontmin-app)** - Fontmin 桌面版 App，需下载安装使用
- **[gulp-fontmin](https://github.com/ecomfe/gulp-fontmin)** - Fontmin 的 Gulp 插件
- **[font-spider](https://github.com/aui/font-spider)** - 自动分析页面使用的 WebFont 并进行按需压缩

# Web-fontmin

好吧，扯了这么多，终于到文章的主题。

Web-fontmin 不是什么高大上的东西，一个基于 Fontmin 构建的字体工具，它的用处只有两个：

1. 提取字体
2. 字体格式转换

通俗的理解，Web-fontmin 是一个这样的工具：Squirrel + fontmin-app，他是两者的结合体。

Squirrel 只有单纯的生成不同格式的webfont，且不支持中文。Web-fontmin不单止可以转换格式同时支持中文，还可以提取字体，并且有更快的上传和转换速度。

Fontmin-app 主要作用是提取字体，需要下载安装，且不支持Linux。Web-Fontmin 拥有Fontmin-app的所有功能，并且在线即可用。

使用Web-fontmin：http://fontmin.forsigner.com/

Github 地址：**[web-fontmin](https://github.com/forsigner/web-fontmin)**

网页效果：

![page-1](http://forsigner.com/images/web-fontmin/page-1.png)
![page-2](http://forsigner.com/images/web-fontmin/page-2.png)


# 常用免费字体网站

推荐几个常用的字体下载网站：

- [Google fonts](https://www.google.com/fonts/)
- [Dafont](http://www.dafont.com/)
- [Typekit](https://typekit.com/)
