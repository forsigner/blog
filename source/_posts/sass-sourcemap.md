---
title: 在Chrome下调试Sass
date: 2013-12-06
tags: [CSS,Sass]
categories: 前端
---

用Sass写CSS很爽，但是调试起来却让人头痛，因为CSS文件是编译生成的，所以在Chrome调试时得出的CSS位置信息并没有多大帮助。为了解决Sass的调试难题，也有开发这开发了一些Chrome插件，如[SASS Inspector](https://chrome.google.com/webstore/detail/sass-inspector/lkofmbmllpgfbnonmnenkiakimpgoamn), 我体验了一整子，用起来并不是很舒服。
<!-- more -->

Google是个好人，为了让开发这更好的使用CSS预处理器，为Chrome增加了一个叫source map功能，利用source map，我们可以在Chrome像调试CSS一样调试Sass,但前提是所用的CSS预处理器需要支持source map

## 用法

**首先，要让Chrome启用CSS source maps**

CSS source maps默认是启用的，不过你还要启用Auto-reload generated CSS,方法是：打开开发者工具的设置，然后点击General,然后启用Enable CSS source maps 和 Auto-reload generated CSS。

**然后，使用Sass或Compass编译CSS**

**如果直接使用Sass**，因为要支持source map，所以要安装pre版

``` bash
$ gem install sass -v '>=3.3.0alpha' --pre
```

安装好后,就可以编译支持source map的CSS了，例如：


``` bash
# 编译一个style.scss文件
$ sass --watch --sourcemap sass/styles.scss:css/styles.css

# 编译一个style.scss文件（如果有用到compass）
$ sass --watch --compass --sourcemap sass/styles.scss:css/styles.css 

# 编译整个文件夹里的所有scss文件
$ sass --watch --sourcemap sass/:css/ 
```


**如果使用Compass**，为了支持source map，也要要安装pre版

``` bash
$ gem install compass --pre
# 或者
$ gem install compass-sourcemaps --pre
```

安装好后,在config.rb中添加<code>sass_options = {:sourcemap => true}</code>,就可以编译支持source map的CSS了：

``` bash
$ compass watch

```

最好，把编译好的css引入到的项目中，然后审查元素，奇迹就出现了。


#### 推荐阅读
- [Working with CSS Preprocessors](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors?hl=zh-CN)
