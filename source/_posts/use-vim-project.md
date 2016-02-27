---
title: vim插件project的用法
date: 2012-12-29
tags: [前端工具]
categories: 工具
---

用任何编辑器写代码，文件管理的方便与否对编码效率影响很大。一般的IDE都有文件管理功能，并且用来的不错。在vim中，要实现较好的文件管理功能一般都靠插件。在有米实习的第一个月，自己一直用NERDTree来管理文件。开始用起来很爽，因为我的vim终于可以和IDE一样管理我的文件了，但是NERDtree有个明显的缺点，当一个项目的文件系统很复杂时，NERDtree展现出的是节点多到让你蛋疼，这时要打开一个文件相当麻烦，效率低下。碰巧js师兄看到我的vim那么悲催，就介绍了一个项目管理插件，叫project。对于vim来说，这是一个几乎完美的项目管理+文件管理插件，优点就不多写了，谁用谁知道。
<!-- more -->

project使用法很简单，下面记录下自己常用的几个功能：

首先，用:Project 打开project，不过我喜欢在 .vimrc 中绑定快捷键 nmaprToggleProject ，这个快捷键的功能是按 pr 切换project的打开和关闭状态。

下面用project打开一个项目，打开project后输入下面类似的命令：

```
    myproject=var/www/myproject CD=. filter="*.js  *.html *.md" {
        ...
    }
```

假设myproject文件中有四个文件：jqurey.js index.html readme.md info.php 和一个子文件夹 child，文件夹child两个文件：test.html和sea.js。把光标停在上两行代码中并按下\r刷新，project中应该出现以代码：


```
    myproject=var/www/myproject CD=. filter="*.js  *.html *.md" {
        jquery.js
        index.html
        readme.md
    }
```

在project在添加一行，添加后代码如下：


```
    myproject=var/www/myproject CD=. filter="*.js  *.html *.md" {
        jquery.js
        index.html
        readme.md
        child=child filter=".js" {

        }
    }
```

再使用/r刷新刚添加的那行，project代码应该如下：

```
    myproject=var/www/myproject  CD=.  filter="*.js  *.html *.md"  {
        jquery.js
        index.html
        readme.md
        child=child filter=".js"  {
            sea.js
        }
    }
```

上面是使用project打开一个项目的简单完整过程，下面是一些自己常用的命令：

- \r---reflash光标所在的文件夹
- \R---reflash光标所在的文件夹及其子文件夹
- \c---create一个项目文件夹
- \C---create一个项目文件夹，并会导入期所有子文件夹，项目较大时慎用
- \s---如果光标在文件前，用水平分割窗口的方式打开文件，如果光标在文件前，open or close it.
- \S---用水平分割窗口的方式打开该文件件的所有文件
- \o---打开一个文件，光标会跳到新打开的文件窗口中
- \v---代开一个文件，光标不会跳
- vim中默认的maplocalleader是 \ ,我喜欢在.vimrc设置let maplocalleader=";",执行以上命令式使用 ; 代替 \ 。

done 。
