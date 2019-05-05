---
title: Dahlia：一个现代化的 React 框架
date: 2019-05-05
tags: [React, JavaScript, TypeScript]
categories: 前端
---

## 什么是前端框架

React 是什么？按照官方的说法，React 是一个用于构建用户界面的 JavaScript 库，所以它不是一个框架。

在前端中，框架是什么？也许很难下定义，但很容易举例，Angular 就是一个框架。

## Dahlia 是什么

Dahlia 是什么？它是一个框架，是一个基于 React 开发的框架。你可以认为它是一个和 Angular 同级别的东西。

Dahlia 是一个大而全的框架，包括了很多东西：

- CLI 工具
- 路由集成
- 状态管理
- Http Client
- GraphQL Client
- 表单
- 弹窗
- 国际化
- ...

## 为什么创建 Dahlia

我为什么不用直接使用 Angular 或者 Vue，最重要的原因是：老了，记忆力衰退。记不住 ngFor，记不住 ngModal，记不住 v-on，接不住 v-show... 记不住众多的的框架 Api。

因为老了，所以 Dahlia 这个框架暂时也只支持 TypeScript，因为如果没有 TypeScript, `dangerouslySetInnerHTML`这样的 Api 也会令我抓狂，因为 `dangerouslySetInnerHTML` 这个单词我可能要背好几周才能写出来。

React 以灵活著称，为什么要搞一个框架？因为懒得折腾，如果我记忆力足够好，我应该会选择 Angular，可惜不够好，所以搞了一个大而全 Dahlia，希望能少折腾、多做事、早下班。

## Dahlia 有什么特点

- **TypeScript** 是一等公民，提供良好的开发体验
- 基于 **create-react-app**，不用关心 Webpack 配置，享受 React 社区最优秀的 setup、develop、build 工具
- **渐进式** 地开发模式，可以快速上手，也可以开发复杂应用

Dahlia 非常多地方借鉴了 Next.js，如果说和 Next.js 有什么不同，那可能是比 Next.js 更加框架化，使用 Dahlia 你会有更高开发效率和更好的开发体验，Dahlia 让你真正的专注于业务的开发，快速解决为各种需求，而不是在各种捣鼓和选择中迷失自我。

## 如何使用

安装 Dahlia CLI:

```bash
yarn global add dahlia-cli
```

初始化应用:

```bash
dh new myapp
```

它将在当前文件夹中创建一个名为 myapp 的目录，目录结构如下：

```bash
.
├── package.json
├── pages
│   └── index.tsx
└── tsconfig.json
```

启动开发服务器:

```bash
cd myapp
dh start
```

Dahlai 现在还在不断改善完善中，我们团队已在项目使用，欢迎 PR。

- Github 地址：https://github.com/forsigner/dahlia
- 详细文档：https://dahlia.js.org
