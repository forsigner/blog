---
title: 使用 VSCode 调试
date: 2018-08-26
tags: [JavaScript,TypeScript]
categories: 前端
---

# 开始使用 VSCode 调试

> 一些由浅入深的 VScode 调试例子，能让你快速理解和上手 VSCode 调试。

## 为什么使用 VSCode ?

我是深度 vi 用户，之前 Atom 深度使用者，现在基本上转到 VSCode，下面是我选择 VSCode 的原因：

- 颜值高，早期不如 Atom，现在已经逐渐赶上
- vi 支持度好，和 Atom 还差点，但已够用
- 调试体验好，完爆 Vim 和 Atom
- 插件多，和 Vim 和 Atom 打个平手
- 对 TypeScript 支持更好

<!-- more -->

## 浅浅地深入

- [一分钟体验 VScode Node.js 调试](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/minimal-node-app/README_zh-CN.md) ( [效果图.gif](https://github.com/forsigner/vscode-debug-examples/raw/master/screenshots/minimal-debug.gif) )
- [最简单的 `launch `模式](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/minimal-node-app/README_zh-CN.md)
- [最简单的 `attach` 模式](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/minimal-attach/README_zh-CN.md)
- [深入 `launch` 和 `attach`](docs/launch-and-attach-zh-CN.md)
- [如何使用 npm](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/use-npm/README_zh-CN.md)
- [怎样使用 Nodemon](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/use-nodemon/README_zh-CN.md)
- [渐进式的配置教学](docs/config-example-zh-CN.md)
- [react 中使用 `attach` (进阶)](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/react-app-attach/README_zh-CN.md)
- [调试单元测试 (Jest)](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/jest-test/README_zh-CN.md)
- [egg.js 调试 (子进程演示)](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/egg-app/README_zh-CN.md)

## 全部例子

### JavaScript 版例子

- [minimal-node-app](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/minimal-node-app/README_zh-CN.md)
- [minimal-attach](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/minimal-attach/README_zh-CN.md)
- [use-npm](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/use-npm/README_zh-CN.md)
- [use-nodemon](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/use-nodemon/README_zh-CN.md)
- [use-nodemon-attach](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/use-nodemon-attach/README_zh-CN.md)
- [express-app](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/express-app/README_zh-CN.md)
- [koa-app](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/koa-app/README_zh-CN.md)
- [react-app](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/react-app/README_zh-CN.md)
- [react-app-attach](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/react-app-attach/README_zh-CN.md)
- [jest-test](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/jest-test/README_zh-CN.md)
- [egg-app](https://github.com/forsigner/vscode-debug-examples/blob/master/JavaScript/egg-app/README_zh-CN.md)


### TypeScript 版例子

- [express-app](https://github.com/forsigner/vscode-debug-examples/blob/master/TypeScript/express-app/README_zh-CN.md)
- [koa-app](https://github.com/forsigner/vscode-debug-examples/blob/master/TypeScript/koa-app/README_zh-CN.md)
- [react-app](https://github.com/forsigner/vscode-debug-examples/blob/master/TypeScript/react-app/README_zh-CN.md)
- [angular-app](https://github.com/forsigner/vscode-debug-examples/blob/master/TypeScript/angular-app/README_zh-CN.md)
- [jest-test](https://github.com/forsigner/vscode-debug-examples/blob/master/TypeScript/jest-test/README_zh-CN.md)
- [egg-app](https://github.com/forsigner/vscode-debug-examples/blob/master/TypeScript/egg-app/README_zh-CN.md)

## 参考资料

- [Node Debugging Guide (Node.js 官方)](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [VSCode Debugging (VSCode 官方)](https://code.visualstudio.com/docs/editor/debugging)
- [Node.js Debugging in VSCode (VSCode 官方)](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-support-for-npm-and-other-tools)
- [Node 调试指南 —— Inspector 协议](https://zhuanlan.zhihu.com/p/30264842)
- [Chrome Remote Debug 初探](https://ielgnaw.com/article/Chrome-Remote-Debug) - [Debugging Node.js with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)
