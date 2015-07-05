---
title: "好用的CSS sprite工具-TexturePacker"
date: 2013-08-01
tags: [CSS]
---


## CSS sprite的苦恼

最近在做web前端优化，其中之一就是把图片合并，也就是使用CSS
sprite技术,开始尝试使用PS手动合并，结果效率极低，而起很难维护。之后尝试各种各样的的CSS
sprite相关工具，最后选择了TextuerPacker，一个可以让我远离CSS sprite苦恼的工具。
<!-- more -->

## 关于TexturePacker

这是作者自己说的一段话：

> 20 seconds to your optimized sprite sheet

> 1. 1.Drop your sprites to TexturePacker
> 2. 2.Choose exporter and image formate
> 3. 3.Press publish

* 下载地址：[download TexturePacker](http://www.codeandweb.com/texturepacker/download)

## TexturePacker优点
* 跨平台，Linux、MacOS、Windows都能安装
* 效率高，可以通过文件夹导入、自动生成CSS、没有定位问题困扰
* 易维护，可以随意增加和减少图标而不影响定位

## TexturePacker使用方法
* 把图标导入TexturePacker后会生成一个png和css文件，如sprite.png和sprite.css
* 对应的icon会根据名字生成class，如icon-ios.png会在css文件中生成.icon-ios {xxx: xxx; }，icon-ios-hover.pngs=>.icon-ios:hover {xxx: xxx;}

代码中使用：

``` css
/* 这些代码是自动生成的*/
.sprite {
  display:inline-block;
  overflow:hidden;
  background-repeat: no-repeat;
  background-image:url(css.png);
}
.icon-ios {
  width:80px;
  height:32px;
  background-position: -80px -160px;
}
.icon-ios:hover {
  width:80px;
  height:31px;
  background-position: -160px -160px;
}
```

``` html
<!-- 要使用背景图像的元素 -->
<span class="sprite icon-ios"></span>
```

## 获取免费license

TexturePacker虽然非常优秀，但不是免费的。但作者对于开发人员是非常人道的，你可以去http://www.codeandweb.com/request-free-license申请一个free licenses。要求如下：

> Bloggers and framework developers can get free full licenses to my tools.

> My requirements to you are:

> * You write your own blog
> * Your blog has at least 5 recent entries which are at least a page long and not older than 6 months
> * Your blog is about game/software/web development or about applications
> * FaceBook or Twitter is not a blog – except you have 100000 friends ;-)

申请成功后，作者会发送类似于一个这样的邮件给你：

> Hi chen,

> Here's your license key for TexturePacker - have fun with it!

> XX-XXXX-XXXX-XXXX-XXXX


> Nice blog! I would be happy to get a (short) blog post in return.

> In case you do a tutorial post about my tools I can link back to your blog from the tutorials section on my page. That might give you some more visitors on your page!

> Kind regards

> Kerstin on behalf of Andreas

> ---------------------------------------------------------------------------

> http://www.codeandweb.com

> http://twitter.com/CodeAndWeb - Follow me on Twitter


> CodeAndWeb / Andreas Loew

> Saalbaustrasse 61

> 89233 Neu-Ulm

> Germany


> \> Free license request

> \>

> \> Name: chen forsigner

> \> Blog: forsigner.com

> \> Description:

> \>

> \>        I am a frontend engineer
