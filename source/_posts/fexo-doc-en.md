---
title: Fexo Doc
date: 2016-03-10
tags: [JavaScript,Hexo]
categories: 前端
---


# Start

## Installation

```bash
$ cd my-blog
$ git clone git@github.com:forsigner/fexo.git themes/fexo
```

## Enable theme

In file `my-blog/_config.yml` set `theme: fexo`

## Upgrade

```bash
$ cd themes/fexo
$ git commit -am 'update'
$ git pull
```

# Theme Configuration

All setting is in file `theme/fexo/_config.yml`.

## Setting  basic info

``` bash
blog_name: Forsigner
slogan: Find the bug of the world
```

## Setting avatar

``` bash
# relative url
avatar: /images/avatar.jpg
# or absolute url
avatar: https://avatars0.githubusercontent.com/u/2668081?v=3&s=460
```

## Setting favicon

``` bash
favicon: /favicon.ico
```

## Setting keywords

Keywords is for SEO.

``` bash
keywords: forsigner,frontend,design,nodejs,JavaScript
```


## Setting initail page content

Show post list directly in home page or note.

``` bash
init_page_content: HOME_NAV  # HOME_NAV | POST
```

## Setting home nav

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

## Setting page nav

``` bash
page_nav:
  - 博客: /archives/
  - 分类: /category/
  - 标签: /tag/
  - 友链: /link/
  - 关于: /about/
  - RSS: /atom.xml
```

## Setting page nav style

``` bash
page_nav_style: CIRCLE  # CIRCLE|ROUND_RECT
```

## Setting breadcrumb

``` bash
breadcrumb:
  isShow: true # true|fase
```

## Setting toolbox

You can set toolbox's text

``` bash
toolbox:
  isShow: true # true|fase
  text: box
```

## Slogan in search page

``` bash
search_slogan:
  isShow: true # true|fase
  text: Can you find the bug of world ~
```

## Slogan in link page

``` bash
link_slogan:
  isShow: true # true|fase
  text: Mail me to  exchagne friendlink: forsigner@gmail.com
```

## Setting post header align type

``` bash
post:
  header_align: center # left|center
```

# Enable page

You can enable some page that you want，about, link, project and so on

## Enable category page

1. Run `hexo new page category`
2. Replace `source/category/index.md` content with :

``` bash
---
title: category
layout: category
comments: false
---
```

## Enable tag page

1. Run `hexo new page tag`
2. Replace `source/tag/index.md` content with :

``` bash
---
title: tag
layout: tag
comments: false
---
```

## Enable friend links page

1. Run `hexo new page link`
2. Replace `source/link/index.md` content with :

``` bash
---
title: link
layout: link
comments: false
---
```

to configure link content:

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


## Enable about page

1. Run `hexo new page about`
2. Replace `source/about/index.md` content with :

``` bash
---
title: about
layout: about
comments: false
---
```

to configure about content:

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


## Enable project page

1. Run `hexo new page project`
2. Replace `source/project/index.md` content with :

``` bash
---
title: project
layout: project
comments: false
---
```

to configure project content:

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


## Enable search page

1. Run `hexo new page search`
2. Replace `source/search/index.md` content with :

``` bash
---
title: search
layout: search
comments: false
---
```

- Then install Hexo Plugin `hexo-search` (important)

Then to config:

```bash
$ cd my-blog
$ npm install hexo-search --save
```

# Customize

## Customize CSS

To customzie CSS style and not to change Fexo source code, you should do something like that:

1. 在 blog 根目录新建文件夹 `my-blog/source/css`
2. 然后在此目录新建一个 CSS，名字随意，如 `personal-style.css`
3. 修改`fexo/_config.yml`下面配置，然后你就可以写你想要的样式了

1. Create dir in my-blog `my-blog/source/css`
2. Create a css file and name it you like, eg: `personal-style.css`
3. Update `fexo/_config.yml` config，then you can write CSS style in this file

``` bash
personal_style: /css/personal-style.css
# dont't want to customzie, comment this config
```

this is my custom:

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

## Custom fonts

1. Download ttf font
2. Use [Web-Fontmin](http://fontmin.forsigner.com/) get Font，and download font and css
3. Create a dir `fonts` in my-blog's `source`
4. Copy font to source's `font`, copy CSS style content to `personal-style.css`
5. Update `fexo/_config.yml` Config，Set font-familiy


``` bash
blog_name_font_familiy: myFontName
# PS: myFontName is the value of font-familiy in css `personal-style.css`
```

PS：自定义博客名字体前请先自定义CSS


## Custom background

You can custom some page background, use `personal-style.css` better

```css
html.page-home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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

## Enable stats

``` bash
google_analytics:
baidu_analytics: 57e94d016sfsf1fba3xxxx8a2b0263af0
```

## Enable comment

``` bash
disqus_shortname: forsigner
# duoshuo_shortname: forsigner
```

##  Use Mathjax

Use Mathjax，You can use hexo plugin [hexo-renderer-mathjax](https://github.com/phoenixcw/hexo-renderer-mathjax)

Check hexo-renderer-mathjax [Doc](https://github.com/phoenixcw/hexo-renderer-mathjax)
