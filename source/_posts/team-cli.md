---
title: 打造前端团队 React CLI 工具
date: 2019-05-04
tags: [前端, JavaScript, TypeScript, CLI]
categories: 前端
---

## 关于前端 CLI 工具

- 对于 Angular，有官方的 [Angular CLI](https://cli.angular.io/)。
- 对于 Vue，有官方的 [Vue CLI](https://cli.vuejs.org/zh/)。
- 对于 React，有官方的 [Create React App](https://facebook.github.io/create-react-app/)。

Angular CLI 和 Vue CLI 是官方推荐的 CLI 工具，可直接在生产环境中使用，但 Create React App 的定位却有点不同，它的目标是让你快速 Set up 一个 React 应用，如果你要在生产环境中使用，因为它的可定制性并不好，你可能要 eject，然后手动维护 webpack 配置。

## 我们团队的历程

首先说背景，这几年以来，我所在的团队使用的都是 React 技术栈，我们业务主要属性是要频繁创建新项目的，但业务的生命周期并不一定短，也可能是长期的。

最开始，应该该是三四年前左右，那是解决方案比较原始，每个人维护自己的 webpack 配置，有新项目就 copy and paste。这样的优点是灵活，本人对自己项目的配置可控性，缺点是配置升级和维护都不容易，项目交接后问题多。

后来，我们使用项目 Boilerplate 的方式，团队内维护一份 Boilerplate，所有新项目都使用这个 Boilerplate 初始化。这样的的有点 webpack 配置统一化，易于多人合作，缺点是配置升级不易，因为 webpack 配置是暴露在项目中的，配置会被人修改，很容易脏掉。

再后来，官方出了 [Create React App](https://facebook.github.io/create-react-app/)。发现原来 webpack 配置可以不暴露在项目中，可以隐藏在 node_modules 中，这是一种非常优雅的解决方案。所以我们使用了和 [Create React App](https://facebook.github.io/create-react-app/) 一样的解决方案，创建自己团队专属的前端 CLI 工具，这也是我们当前的解决方案。这样的优点是 webpack 配置被隐藏，项目目录比较干净，webpack 配置升级容易，只需升级 CLI，缺点是维护 CLI 是一个大工程，需要较多的人力，且需要踩非常多的坑。

## 我推荐的方案

回到文章的标题：**打造前端团队 React CLI 工具**，我认为每个前端团队都应该有自己的 CLI 工具，这是一个团队技术和经验沉淀的重要根据地。

CLI 工具可以承担非常多的工具，比如初始化项目、开发、测试、打包、一键部署、组件开发等，换一句话说，CLI 工具需要参与到研发的整个生命周期中，所以它是团队技术和经验沉淀的重要根据地。

这里我重点要说的是 CLI 所承担的脚手架功能，Create React App 非常优秀，但我不建议作为团队工具直接使用，我也不建议从零开始去实现一个 Create React App（特别是一个中小前端团队），我的建议是基于 Create React App 创建，为什么呢？因为 Create React App 足够问题，出现问题的概率小，站在巨人肩膀上，你可以省很多精力，把更多的精力投入到业务问题中。

## 基于 Create React App 创建 CLI

下面是一个我基于 Create React App 创建的 CLI：

安装:

```bash
yarn global add dahlia-cli
```

初始化项目：

```bash
dh new myapp
```

项目目录:

```bash
.
├── README.md
├── package.json
├── pages
│   └── index.tsx
└── tsconfig.json
```

启动开发服务器：

```bash
cd myapp
dh start
```

![dh](http://forsigner.com/images/dahlia/dahlia-app.png)

原理是非常简单，其实就是对 下面是一个我基于 Create React App 创建的 CLI：

安装:

```bash
yarn global add dahlia-cli
```

初始化项目：

```bash
dh new myapp
```

项目目录:

```bash
.
├── README.md
├── package.json
├── pages
│   └── index.tsx
└── tsconfig.json
```

启动开发服务器：

```bash
cd myapp
dh start
```

![dh](http://forsigner.com/images/dahlia/dahlia-app.png)

原理是非常简单，其实就是对 Create React App 定制化，让它成为适合你团队的工具，但你工具是紧跟 React 社区的，拥有很好的稳定性。

有兴趣了解细节的可以看 [dahlia-cli](https://github.com/forsigner/dahlia/blob/master/packages/dahlia-cli/README.md)。
