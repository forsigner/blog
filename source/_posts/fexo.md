---
title: 一个极简主义设计的 Hexo 主题
date: 2016-02-23
tags: [JavaScript,Hexo]
categories: 设计
---

作为设计师出身的前端攻城狮， blog 用着别人的主题终究还是不爽，于是花了两天晚上写了一个 Hexo 主题。

主题 Github 地址：[Fexo](https://github.com/forsigner/fexo) - A minimalist design theme.

Demo：http://forsigner.com/

主题的特点是：
- 极简主义设计
- 去除了各种复杂的元素，总共只有 3 个页面
- 列表页面借鉴了 Facebook 的 timeline
- Pure CSS, No JavaScript, No images 所以轻量加载性能高
- 兼容主流浏览器，包括低版本IE

主题截图：
![screenshot-1.png](http://forsigner.com/images/screenshot-1.png)
![screenshot-2.png](http://forsigner.com/images/screenshot-2.png)

## 怎样使用

### 安装

```bash
$ cd my-site
$ git clone git@github.com:forsigner/fexo.git themes/fexo
```

### 使用

修改根目录的 `_config.yml`，设置 `theme: fexo`

### 更新主题

```bash
$ cd themes/fexo
$ git pull
```

### 设置头像

替换 `theme/hexo/source/images/avatar.jpg` 就好了


### 浏览器兼容

- IE8+
- Firefox
- Chrome
- Safari
- Opera

详细文档： [Documention](https://github.com/forsigner/fexo/blob/master/README.md)
