---
title: ionic Mac下连接android手机调试
date: 2015-03-07
tags: [ionic, android]
categories: 前端
---


前端开发时，调试比较方便，一个Chrome，不用编译不用等待，非常方便。ionic开发就不一样了，界面调试虽然可以用Chrome，但是Chrome代替不了真实的手机环境，ionic程序经常可以在Chrome的emulator可以运行，但到着呢是的手机环境就撒娇了。有两种方法可以对ionic程序进行调试，一种是虚拟机，另一种是真实的android手机。虚拟机的优点是就是你不需要一部android手机，只要配置好android开发环境就好了，但虚拟机慢得实在让人无法忍受；另一种就是真机调试咯，真机调试优点就是快。在Mac下，可能会遇到adb无法连接android手机的情况，下面是我的解决办法。
<!-- more -->

## 获取Android设备的Vendor ID

执行以下命令查看连接的USB设备信息

``` python
$ system_profiler SPUSBDataType
```

执行完这条命令后，找到你手机的连接信息，例如我的手机手魅蓝，连接信息如下:

![usb连接信息](http://d.pcs.baidu.com/thumbnail/422fa50e99b8336a79525ee68eaa94ea?fid=1749149254-250528-231176613827012&time=1428202800&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-cHKfxQvHxOWs41vd%2bypZWLOkVv0%3d&expires=8h&prisign=unknow&chkbd=0&chkv=0&size=c1920_u1080&quality=90)

上图中的"0x2a45"，就是所需要的Vender ID。

## 修改adb_usb.ini文件

输入：<code>vim ~/.android/adb_usb.ini</code>命令，打开adb_usb.ini文件中添加你的Vender ID，格式如下：

![usb连接信息](http://d.pcs.baidu.com/thumbnail/d862ccbfe7768944683165053cbe8212?fid=1749149254-250528-520240299263789&time=1428202800&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-N6t8bfrhnlEuDEvNn4J7cAZi4V4%3d&expires=8h&prisign=unknow&chkbd=0&chkv=0&size=c1920_u1080&quality=90)

记得格式要争取，不然会出现一下错误：

![更新](http://d.pcs.baidu.com/thumbnail/9bc09a4ebfb0c0d1f2a226893c43f9b7?fid=1749149254-250528-983441257023133&time=1428202800&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-VHC7XVRfdvTMYkEQfscxn%2b8pA5k%3d&expires=8h&prisign=unknow&chkbd=0&chkv=0&size=c1920_u1080&quality=90)

### 重启adb

执行以下命令重启adb

``` python
$ adb kill-server
$ adb start-server
$ adb devices
```
执行完<code>adb devices</code>后看到以下反馈就说明你成功了：

![检查](http://d.pcs.baidu.com/thumbnail/7fa250bf3278858e28a9da70583a3d94?fid=1749149254-250528-658210706645655&time=1428202800&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-fJOG4y3Ix5Ob%2foS%2f%2b5iJxTXHYlg%3d&expires=8h&prisign=unknow&chkbd=0&chkv=0&size=c1920_u1080&quality=90)


### 调试

现在你就可以使用真机调试ionic程序了，执行一下命令就可以了：

``` python
$ ionic run android
```

当然,你使用Eclipse或Android Studio开发Android App时，同样可以使用这种方法连接你的Android设备。
