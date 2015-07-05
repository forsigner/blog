---
title: "Unix 系统下常用命令"
date: 2013-08-23
tags: []
---

## 文件操作

``` python
ls -l  # 列出文件夹内容(详情模式)
ls -al  # 列出文件夹内容(包括隐藏文件)
touch <file>  # 新建文件
mkdir <dir>  # 新建文件夹
rm [-rf] <file/dir>  # 删除文件
mv <source> <target>  # 修改文件名字
cp [-R] <source> <target>  # 复制文件
ln -s  <source> <target>  # 建立符号链接

rar x <file> #解压
tar -zxvf <file>
unzip  <file>

```
<!-- more -->

## 查找

``` python
which <something>  # 搜索可执行文件
whereis <something>  # 搜索文件
locate <something>  # 搜索文件

find <dir> <condiction> <action>
find <dir> -name "*.jpg" # 查找文件
find . -name "*~"  | xargs rm -rf  # 删除当前文件夹及子文件夹下的某些文件


grep -nr 'xxx' <dir>  # 查找包含字符串"xxx"的文件

```

## 权限管理

``` python

sudo chown -R <owner>:<group>  <file>  # 修改表文件ownership/group

sudo chmod 600 <file>  # 只有所有者有读和写的权限
sudo chmod 644 <file>  # 所有者有读和写的权限
sudo chmod 700 <file>  # 只有所有者有读和写以及执行的权限
sudo chmod 666 <file>  # 每个人都有读和写的权限
sudo chmod 777 <file>  # 开放全部权限
```


## Mac OS x

``` python
brew info <package>
brew doctor <package>
brew install <package>  # 安装
brew uninstall <package>
brew list
brew update
brew upgrade
brew cleanup


```

## Ubuntu

``` python

aptitude search '~i ^vim' #搜索文件
sudo apt-get install <package>  # 安装软件
sudo aptitude purge <package>  # ubuntu卸载软件
sudo apt-get remove <package>  # ubuntu卸载软件
apt-get remove --purge <package>  # 卸载并清除配置
sudo  dpkg  -i  <package.deb>  # 安装软件
```

## 其他

``` python

cat  # 由第一行开始显示档案内容
tac  # 从最后一行开始显示，可以看出 tac 是 cat 的反向显示！
nl  # 显示的时候，随便输出行号！
more  # 一页一页的显示档案内容
less  # 与 more 类似，但是比 more 更好的是，他可以[pg dn][pg up]翻页！
head  # 查看头几行
tail  # 查看尾几行


sed -i "s/oldstring/newstring/g" `grep oldstring -rl yourdir` #替换多文件的字符串

ctrl-a  # 在终端中跳到命令最前面
ctrl-e  # 在终端中跳到命令最后面

ctrl-x e # 打开默认编辑器
man <something> #帮助
!!  # 上一条命令
cd -  # 回到上一次目录
pwd  # 查看路径

ps -A | grep -i apache2  # 查找相关进程
kill 1285 (to kill the process apache2)  # 杀死进程

cal  # 日历
date  # 日期
bc  # 计算器
```
