---
title: ionic android打包
date: 2015-3-12
tags: [ionic]
categories: 前端
---



App用ionic开发完成后，就可以打包发布市场啦。发布一个App可以上传市场的包，关键要做两样东西，一是打一个release包，而是给包签名。命令不多，但命令比较长，记录一下。
<!-- more-->

## 打包

首先生成 release包

``` python
$  cordova build --release android  # 记得加上--release 参数，不然会打出debug包
```

执行完这条命令后，cordova会根据你的config.xml生成一个未签名的apk包。在platform文件夹可以找到apk包（<code>platforms/android/ant-build</code>），接下来就可以签名了。

## 生成安全钥匙

App签名需要用到安全钥匙，你可以用JDK的keytool工具生成，执行下面命令：

``` python
# 把my-release-key和alias_name换成你的名字
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

执行后需要回答一些问题，正常填写就好了

``` python
Enter keystore password:
Re-enter new password:
What is your first and last name?
  [Unknown]:  test
What is the name of your organizational unit?
  [Unknown]:  test
What is the name of your organization?
  [Unknown]:  test
What is the name of your City or Locality?

```

之后会生成一个your_name.keystore文件，这就是你的安全秘钥，记得要好好保管，下次更新应用要用到，丢失就大事了，你以后就甭想更新市场上的应用了。

## 签名

使用JDK中的jarsigner工具为apk签名，命令如下：

``` python
# my-release-key和alias_name换成你的名字
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
```

执行后会生成一个已签名成功的apk，你可以用这个包发布市场。

## 优化（可选）

使用Zipalign优化，Zipalign是一个android平台上整理APK文件的工具，它首次被引入是在Android 1.6版本的SDK软件开发工具包中。它能够对打包的Android应用程序进行优化， 以使Android操作系统与应用程序之间的交互作用更有效率，这能够让应用程序和整个系统运行得更快。

命令如下：

``` python
$ zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk
```

done
