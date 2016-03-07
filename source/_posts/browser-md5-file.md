---
title: 在浏览器端获取文件的MD5值
date: 2016-03-04
tags: [JavaScript]
categories: 前端
---

前几天接到一个奇怪的需求，要在web页面中计算文件的md5值，还好这个项目是只需兼容现代浏览器的，不然要坑死了。

其实对文件进行md5，对于后端来说是及其简单的。比如使用Node.js，只要下面几行代码就可以了：

``` js
var fs= require('fs');
var crypto = require('crypto');

function md5File(path, callback) {
  fs.readFile(path, function(err, data) {
    if (err) return;
    var md5Value= crypto.createHash('md5').update(data, 'utf8').digest('hex');
    callback(md5Value)；
  });
}

```

但是对于浏览器，如果不能使用HTML5的file api，对文件md5是几乎不可能的事。如果可以不使用file api，还请哪位大牛給分享一下。

要在浏览器中对文件进行md5，基本思路就是使用HTML5的FileReader接口把文件读取到内存，然后获取文件的二进制内容，最后再进行md5。

Github中已经有人最这个问题进行研究，其中比较优秀的一个项目就是：[js-spark-md5](https://github.com/satazor/js-spark-md5)，该项目使用了世界上最快的md5算法。

为了更好的重用代码，我在js-spark-md5的基础上封装了[browser-md5-file](https://github.com/forsigner/browser-md5-file)，可以更方便的使用md5 file。

- 项目地址：**[browser-md5-file](https://github.com/forsigner/browser-md5-file)**

- Demo： [查看](http://forsigner.com/browser-md5-file)


使用方法非常简单：


```html
<script src="bower_components/browser-md5-file/dist/browser-md5-file.js"></script>
```

```js
var el = document.getElementById('upload');
el.addEventListener('change', handle, false);

function handle(e) {
  var file = e.target.files[0];
  browserMD5File(file, function (err, md5) {
    console.log(md5); // 97027eb624f85892c69c4bcec8ab0f11
  });
}
```

详细的使用方法可以查看Github中的文档。

关于浏览器兼容性，由于使用的HTML5 api，所以只能兼容到一下浏览器：
- IE10+
- Firefox
- Chrome
- Safari
- Opera

还有一点，由于需要把文件读取到内存，md5大文件会性能较差。
