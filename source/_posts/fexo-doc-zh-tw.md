---
title: Fexo 文檔
date: 2016-03-10
tags: [JavaScript,Hexo]
categories: 前端
---


# 開始

## 安裝

```bash
$ cd my-blog
$ git clone git@github.com:forsigner/fexo.git themes/fexo
```

## 啟用

打開博客根目錄的 `_config.yml` 設為 `theme: fexo`

## 升級

```bash
$ cd themes/fexo
$ git commit -am 'update'
$ git pull
```

# 配置主題

主題配置全部在`theme/fexo`裏面完成，所裏下面所有配置指的是配置`theme/fexo/_config.yml`。

## 設置基本信息
``` bash
blog_name: Forsigner
slogan: Find the bug of the world
```

## 設置頭像

``` bash
# relative url
avatar: /images/avatar.jpg
# or absolute url
avatar: https://avatars0.githubusercontent.com/u/2668081?v=3&s=460
```

## 設置favicon

``` bash
favicon: /favicon.ico
```

## 設置關鍵詞

關鍵詞主要作用是優化SEO

``` bash
keywords: forsigner,前端,設計,Hexo主題,前端開發,用戶體驗,設計,frontend,design,nodejs,JavaScript
```


## 設置首頁內容

你可以設置是否在首頁直接顯示文章

``` bash
init_page_content: HOME_NAV  # HOME_NAV | POST
```

## 設置首頁導航

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

## 設置頁面導航

``` bash
page_nav:
  - 博客: /archives/
  - 分類: /category/
  - 標簽: /tag/
  - 友鏈: /link/
  - 關於: /about/
  - RSS: /atom.xml
```

## 設置頁面導航樣式

``` bash
page_nav_style: CIRCLE  # CIRCLE|ROUND_RECT
```

## 設置面包屑

``` bash
breadcrumb:
  isShow: true # true|fase
```

## 設置盒子

你可設置盒子是否顯示和其顯示的文字

``` bash
toolbox:
  isShow: true # true|fase
  text: 盒子
```

## 搜索頁面 Slogan

``` bash
search_slogan:
  isShow: true # true|fase
  text: Can you find the bug of world ~
```

## 友鏈頁面 Slogan

``` bash
link_slogan:
  isShow: true # true|fase
  text: 交換友鏈可以郵件 forsigner@gmail.com
```

## 設置文章標題對齊方式

``` bash
post:
  header_align: center # left|center
```

# 啟用頁面

你可以啟用你想要的頁面，在開啟關於、友鏈、項目的頁面後，你可以對這些設置這些頁面的內容

## 啟用分類頁面

1. 在博客根目錄執行 `hexo new page category`
2. 修改`my-blog/source/category/index.md`裏面的內容:

``` bash
---
title: category
layout: category
comments: false
---
```

## 啟用標簽頁面

1. 在博客根目錄執行 `hexo new page tag`
2. 修改`my-blog/source/tag/index.md`裏面的內容:

``` bash
---
title: tag
layout: tag
comments: false
---
```

## 啟用友鏈頁面

1. 在博客根目錄執行 `hexo new page link`
2. 修改`my-blog/source/link/index.md`裏面的內容:

``` bash
---
title: link
layout: link
comments: false
---
```

啟用友鏈頁面後，可以設置類似以下格式的內容

```bash
link:
  - name: 織網
    info: 身體和靈魂，總有一個在路上
    url: http://zheng-ji.info/
    avatar: https://avatars3.githubusercontent.com/u/1414745?v=3&s=460
  - name: Dongyado
    info: 生命不止，折騰不息
    url: http://dongyado.com/
    avatar: https://avatars0.githubusercontent.com/u/6274940?v=3&s=460
  - name: OrangeCoder
    info: android ffmpeg nodejs gradle
    url: http://orangecoder.com/
    avatar: https://avatars0.githubusercontent.com/u/2263785?v=3&s=460
  - name: EverET
    info: 好記性不如爛筆頭
    url: http://everet.org/about-me/
    avatar: https://avatars1.githubusercontent.com/u/1559563?v=3&s=460
```


## 啟用關於頁面

1. 在博客根目錄執行 `hexo new page about`
2. 修改`my-blog/source/about/index.md`裏面的內容:

``` bash
---
title: about
layout: about
comments: false
---
```

啟用關於頁面後，可以設置類似以下格式的內容:

```bash
about:
  - type: me
    icon: icon-user
    text_value:
    - "Scut，1991，Spring."
    - "喜歡設計，擅長編程，喜歡睡懶覺."
    - "前端開發工程師，常用 HTML / CSS / JavaScript."
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


## 啟用項目頁面

1. 在博客根目錄執行 `hexo new page project`
2. 修改`my-blog/source/project/index.md`裏面的內容:

``` bash
---
title: project
layout: project
comments: false
---
```

啟用項目頁面後，可以設置類似以下格式的內容

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
    intro: 字體子集化，在線提取你需要的字體
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


## 啟用搜索頁面

- 在博客根目錄執行 `hexo new page search`
- 修改`my-blog/source/search/index.md`裏面的內容:

``` bash
---
title: search
layout: search
comments: false
---
```

- 然後安裝 Hexo 插件 `hexo-search` (重要)

先進入 blog 的根目錄

```bash
$ cd my-blog
$ npm install hexo-search --save
```

# 個性化設置

## 自定義CSS

也許 Fexo 默認的樣式滿足不了你個性化的需求，使用此配置你可以在不修改 Fexo 源碼的情況下，任意的自定義 Fexo 的樣式，方法如下：

1. 在 blog 根目錄新建文件夾 `my-blog/source/css`
2. 然後在此目錄新建一個 CSS，名字隨意，如 `personal-style.css`
3. 修改`fexo/_config.yml`下面配置，然後你就可以寫你想要的樣式了

``` bash
personal_style: /css/personal-style.css
# 如果不想啟用自定義樣式，註釋這行就可以了
```

比如我的個人自定義樣式如下：

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

## 自定義博客名的字體

由於中文字體文件太大，有的快10M，所以 Fexo 沒有引入中文字體，導致博客名有點難看。
但是可以通過提取字體來減小字體文件大小，讓字體只有幾KB。
一下步驟可以讓你實現自定義博客名字體，包括英文和中文：

1. 下載免費可用的ttf格式字體
2. 利用 [Web-Fontmin](http://fontmin.forsigner.com/) 提取字體，然後下載 Web 字體和樣式
3. 在博客根目錄的`source`文件夾新建目錄 `fonts`
4. 把下載的 web-fontmin 裏的 CSS 內容 copy 到你的 `personal-style.css` 裏去
5. 修改`fexo/_config.yml`下面配置，設置字體名稱：


``` bash
blog_name_font_familiy: myFontName

# 註意: 這是css文件裏的font-familiy的值 ,例如裏面是 font-familiy: "myfontName"
```

PS：自定義博客名字體前請先自定義CSS


## 為首頁設置背景

如果你不喜歡首頁簡潔的白色，想個性化一點，你可以自定義首頁的背景顏色或者圖片

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

# 第三方服務

## 啟用統計

``` bash
google_analytics:
baidu_analytics: 57e94d016sfsf1fba3xxxx8a2b0263af0
```

## 啟用評論

``` bash
disqus_shortname: forsigner
# duoshuo_shortname: forsigner
```

##  使用 Mathjax

要使用 Mathjax，可以通過 Hexo 插件 [hexo-renderer-mathjax](https://github.com/phoenixcw/hexo-renderer-mathjax)支持

查看 hexo-renderer-mathjax [文檔](https://github.com/phoenixcw/hexo-renderer-mathjax)
