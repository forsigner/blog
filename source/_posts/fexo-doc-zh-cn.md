---
title: Fexo 文档
date: 2016-03-10
tags: [JavaScript,Hexo]
categories: 前端
---

# 安装

```bash
$ cd my-blog
$ git clone git@github.com:forsigner/fexo.git themes/fexo
```

# 启用

打开博客根目录的 `_config.yml` 设为 `theme: fexo`

# 升级

```bash
$ cd themes/fexo
$ git pull
```

# 配置主题

主题配置全部在`theme/fexo`里面完成，所里下面所有配置指的是配置`theme/fexo/_config.yml`。

## 设置基本信息
``` bash
blog_name: Forsigner
slogan: Find the bug of the world
```

## 设置头像

``` bash
# relative url
avatar: /images/avatar.jpg
# or absolute url
avatar: https://avatars0.githubusercontent.com/u/2668081?v=3&s=460
```

## 设置favicon

``` bash
favicon: /favicon.ico
```

## 设置关键词

关键词主要作用是优化SEO

``` bash
keywords: forsigner,前端,设计,Hexo主题,前端开发,用户体验,设计,frontend,design,nodejs,JavaScript
```

## 自定义博客名的字体

由于中文字体文件太大，有的快10M，所以 Fexo 没有引入中文字体，导致博客名有点难看。
但是可以通过提取字体来减小字体文件大小，让字体只有几KB。
一下步骤可以让你实现自定义博客名字体，包括英文和中文：

1. 下载免费可用的ttf格式字体
2. 利用 [Web-Fontmin](http://fontmin.forsigner.com/) 提取字体，然后下载 Web 字体和样式
3. 在博客根目录的s`source`文件夹新建两个子目录: fonts 和 css
4. 把下载的字体方式fonts文件夹，把CSS文件放入css文件夹
5. 修改`theme/fexo/_config.yml`：

``` bash
 # 这是css文件里的font-familiy的值 ,例如里面是 font-familiy: "myfontName"
blog_name_font_familiy: myFontName

fonts_css_path:
  - /css/calligraffittiregular.css
  - /css/second-font.css

```

## 设置首页内容

你可以设置是否在首页直接显示文章

``` bash
init_page_content: HOME_NAV  # HOME_NAV | POST
```

## 设置首页导航

``` bash
home_nav:
  - name: Blog
    url: /archives
  - name: Github
    url: https://github.com/forsigner
    target: _blank
  - name: Douban
    url: http://www.douban.com/people/forsigner/
    target: _blank
  - name: Twitter
    url: https://twitter.com/forsigner
    target: _blank

```

## 设置页面导航

``` bash
page_nav:
  - 博客: /archives/
  - 分类: /category/
  - 标签: /tag/
  - 友链: /link/
  - 关于: /about/
  - RSS: /atom.xml
```

## 设置页面导航样式

``` bash
page_nav_style: CIRCLE  # CIRCLE|ROUND_RECT
```

## 设置面包屑

``` bash
breadcrumb:
  isShow: true # true|fase
```

## 设置盒子

``` bash
toolbox:
  isShow: true # true|fase
```

## 设置文章标题对齐方式

``` bash
post:
  header_align: center # left|center
```

## 启用分类页面

1. 在博客根目录执行 `hexo new page category`
2. 修改`my-blog/source/category/index.md`里面的内容:

``` bash
---
title: category
layout: category
comments: false
---
```

## 启用标签页面

1. 在博客根目录执行 `hexo new page tag`
2. 修改`my-blog/source/tag/index.md`里面的内容:

``` bash
---
title: tag
layout: tag
comments: false
---
```

## 启用友链页面

1. 在博客根目录执行 `hexo new page link`
2. 修改`my-blog/source/link/index.md`里面的内容:

``` bash
---
title: link
layout: link
comments: false
---
```

## 启用关于页面

1. 在博客根目录执行 `hexo new page about`
2. 修改`my-blog/source/about/index.md`里面的内容:

``` bash
---
title: about
layout: about
comments: false
---
```

## 启用Project页面

1. 在博客根目录执行 `hexo new page project`
2. 修改`my-blog/source/project/index.md`里面的内容:

``` bash
---
title: project
layout: project
comments: false
---
```

## 启用统计

``` bash
google_analytics:
baidu_analytics: 57e94d016sfsf1fba3xxxx8a2b0263af0
```

## 启用评论

``` bash
disqus_shortname: forsigner
# duoshuo_shortname: forsigner
```
