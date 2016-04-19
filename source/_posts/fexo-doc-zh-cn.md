---
title: Fexo 文档
date: 2016-03-10
tags: [JavaScript,Hexo]
categories: 前端
---


# 开始

## 安装

```bash
$ cd my-blog
$ git clone git@github.com:forsigner/fexo.git themes/fexo
```

## 启用

打开博客根目录的 `_config.yml` 设为 `theme: fexo`

## 升级

```bash
$ cd themes/fexo
$ git commit -am 'update'
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

你可设置盒子是否显示和其显示的文字

``` bash
toolbox:
  isShow: true # true|fase
  text: 盒子
```

## 搜索页面 Slogan

``` bash
search_slogan:
  isShow: true # true|fase
  text: Can you find the bug of world ~
```

## 友链页面 Slogan

``` bash
link_slogan:
  isShow: true # true|fase
  text: 交换友链可以邮件 forsigner@gmail.com
```

## 设置文章标题对齐方式

``` bash
post:
  header_align: center # left|center
```

# 启用页面

你可以启用你想要的页面，在开启关于、友链、项目的页面后，你可以对这些设置这些页面的内容

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

启用友链页面后，可以设置类似以下格式的内容

```bash
link:
  - name: 织网
    info: 身体和灵魂，总有一个在路上
    url: http://zheng-ji.info/
    avatar: https://avatars3.githubusercontent.com/u/1414745?v=3&s=460
  - name: Dongyado
    info: 生命不止，折腾不息
    url: http://dongyado.com/
    avatar: https://avatars0.githubusercontent.com/u/6274940?v=3&s=460
  - name: OrangeCoder
    info: android ffmpeg nodejs gradle
    url: http://orangecoder.com/
    avatar: https://avatars0.githubusercontent.com/u/2263785?v=3&s=460
  - name: EverET
    info: 好记性不如烂笔头
    url: http://everet.org/about-me/
    avatar: https://avatars1.githubusercontent.com/u/1559563?v=3&s=460
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

启用关于页面后，可以设置类似以下格式的内容:

```bash
about:
  - type: me
    icon: icon-user
    text_value:
    - "Scut，1991，Spring."
    - "喜欢设计，擅长编程，喜欢睡懒觉."
    - "前端开发工程师，常用 HTML / CSS / JavaScript."
  - type: Github
    icon: icon-github
    text_key: Github
    text_value: "@forsigner"
    text_value_url: https://github.com/forsigner
  - type: weibo
    icon: icon-weibo
    text_key: 微博
    text_value: "@forsigner"
    text_value_url: http://weibo.com/u/1847075964
  - type: mail
    icon: icon-mail
    text_key: Gmail
    text_value: "forsigner@gmail.com"
  - type: location
    icon: icon-location
    text_value: 珠海
```


## 启用项目页面

1. 在博客根目录执行 `hexo new page project`
2. 修改`my-blog/source/project/index.md`里面的内容:

``` bash
---
title: project
layout: project
comments: false
---
```

启用项目页面后，可以设置类似以下格式的内容

```bash
project:
  - type: personal
    name: fexo
    url: https://github.com/forsigner/fexo
    intro: A minimalist design theme for hexo
  # - type: company
  #   name: Fexo
  #   url: https://github.com/forsigner/fexo
  #   intro: A minimalist design theme for hexo
  - type: personal
    name: beside
    url: https://github.com/forsigner/beside
    intro: I need you beside me
  - type: personal
    name: web-fontmin
    url: https://github.com/forsigner/web-fontmin
    intro: 字体子集化，在线提取你需要的字体
  - type: personal
    name: magic-check
    url: https://github.com/forsigner/magic-check
    intro: Beautify Radio and Checkbox with pure CSS
  - type: personal
    name: nice-bar
    url: https://github.com/forsigner/nice-bar
    intro: A nice and lightweight scrollbar
  - type: personal
    name: angular-nice-bar
    url: https://github.com/forsigner/angular-nice-bar
    intro: A nice and lightweight scrollbar in Angular
```


## 启用搜索页面

- 在博客根目录执行 `hexo new page search`
- 修改`my-blog/source/search/index.md`里面的内容:

``` bash
---
title: search
layout: search
comments: false
---
```

- 然后安装 Hexo 插件 `hexo-search` (重要)

先进入 blog 的根目录

```bash
$ cd my-blog
$ npm install hexo-search --save
```

# 个性化设置

## 自定义CSS

也许 Fexo 默认的样式满足不了你个性化的需求，使用此配置你可以在不修改 Fexo 源码的情况下，任意的自定义 Fexo 的样式，方法如下：

1. 在 blog 根目录新建文件夹 `my-blog/source/css`
2. 然后在此目录新建一个 CSS，名字随意，如 `personal-style.css`
3. 修改`fexo/_config.yml`下面配置，然后你就可以写你想要的样式了

``` bash
source/css/personal-style.css
```

比如我的个人自定义样式如下：

```css
@font-face {
  font-family: "Meiryo";
  src: url("/fonts/Meiryo.eot");
  /* IE9 */
  src: url("/fonts/Meiryo.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
  url("/fonts/Meiryo.woff") format("woff"), /* chrome, firefox */
  url("/fonts/Meiryo.ttf") format("truetype"), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url("/fonts/Meiryo.svg#Meiryo") format("svg");
  /* iOS 4.1- */
  font-style: normal;
  font-weight: normal;
}
html.page-home {
  /*background-image: url('/images/bg.jpg')*/

  /*background: linear-gradient( #1abc9c, transparent), linear-gradient( 90deg, skyblue, transparent), linear-gradient( -90deg, coral, transparent);*/
  /*background-blend-mode: screen;*/

  /*background: linear-gradient(to left, #5f2c82, #49a09d);*/
}
```

## 自定义博客名的字体

由于中文字体文件太大，有的快10M，所以 Fexo 没有引入中文字体，导致博客名有点难看。
但是可以通过提取字体来减小字体文件大小，让字体只有几KB。
一下步骤可以让你实现自定义博客名字体，包括英文和中文：

1. 下载免费可用的ttf格式字体
2. 利用 [Web-Fontmin](http://fontmin.forsigner.com/) 提取字体，然后下载 Web 字体和样式
3. 在博客根目录的`source`文件夹新建目录 `fonts`
4. 把下载的 web-fontmin 里的 CSS 内容 copy 到你的 `personal-style.css` 里去
5. 修改`fexo/_config.yml`下面配置，设置字体名称：


``` bash
blog_name_font_familiy: myFontName

# 注意: 这是css文件里的font-familiy的值 ,例如里面是 font-familiy: "myfontName"
```

PS：自定义博客名字体前请先自定义CSS


## 为首页设置背景

如果你不喜欢首页简洁的白色，想个性化一点，你可以自定义首页的背景颜色或者图片

```css
html.page-home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0jjj;
  bottom: 0;
  background-image: url('/images/bg.jpg');
  background-color: transparent;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  /*background: linear-gradient( #1abc9c, transparent), linear-gradient( 90deg, skyblue, transparent), linear-gradient( -90deg, coral, transparent);*/
  /*background-blend-mode: screen;*/

  /*background: linear-gradient(to left, #5f2c82, #49a09d);*/
}
```

# 第三方服务

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
