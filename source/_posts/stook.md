---
title: Stook：极简主义的 React 状态管理库
date: 2020-01-03
tags: [React, JavaScript, TypeScript]
categories: 前端
---

## 从 Hooks 说起

一年前，2018 年 9 月左右, React hooks 刚发布，那时 hooks 还不是稳定 Api，只能在 16.7.0-alpha.0 版本能用。那时我就预感到，基于 hooks 状态管理解决方案会逐渐崛起，当时我基于 hooks 创建一个我认为理想的状态管理库：[stamen](https://github.com/forsigner/stamen)。

我还写过一篇文章介绍它：[可能是基于 Hooks 和 Typescript 最好的状态管理工具](https://zhuanlan.zhihu.com/p/49733571)。

## 回顾 Stamen

我之前说过，我想要这样的一个状态管理库：

- 简单易用，并且适合中大型项目
- 完美地支持 Typescript

所以我创建了 Stamen，Stamen 相比 Redux 更加简洁，对 TypeScript 支持度更好。一年多过去了，也在几个小项目中实践过，发现并没有很好满足我的两个期望。

Stamen 的 Api 借鉴了 dva 和 rematch，导致了它没有脱离 Redux 的影子，依然有 state、reducers、effects、dispatch、selector 等概念，可以说没有彻底 Hooks 化，特别是 reducers 处理同步和 effects 处理副作用让我觉得特别扭。

一年后，我创建了更加彻底 Hooks 化的状态管理库：[Stook](https://github.com/forsigner/stook)。

## 关于 Stook

Stook，中文翻译是谷堆，命名灵感来自 store、hooks 两个单词的组合，一个极简主义的 React 状态管理库。

## 基本用法

我们看看 Stook 用法有多么的简单，下面是一个经典的 Counter 组件，展示了 `stook` 的最基本用法:

```jsx
import React from "react";
import { useStore } from "stook";

function Counter() {
  const [count, setCount] = useStore("Counter", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

[![Edit ancient-night-gyres](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ancient-night-gyres?fontsize=14&hidenavigation=1&theme=dark)

Stook 最核心的 Api 就是 `useStore`，也许你发现了，它和 `useState` 非常像，实际上，`useStore` 除了多了一个参数以外，其他用法一模一样。

Stook 极简之处在于它的用法跟 `usState` 几乎一致，学习成本几乎可以忽略，更多的学习成本在于 React Hooks 的掌握和理解，经过一年多，Hooks 已经逐渐在 React 社区中得到认可，相信以后 Hooks 将是每个 React 开发者的基本技能。

## 状态共享

对于状态管理，最核心的功能就是状态的跨组件通信。useState 用于管理单一组件内的状态，useStore 则可以跨组件管理整个应用的状态。

下面展示了如何多个组件如何共享状态：

```jsx
import React from "react";
import { useStore } from "stook";

function Counter() {
  const [count, setCount] = useStore("Counter", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

function Display() {
  const [count] = useStore("Counter");
  return <p>{count}</p>;
}

function App() {
  return (
    <div>
      <Counter />
      <Display />
    </div>
  );
}
```

[![Edit vibrant-swirles-jw7kw](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vibrant-swirles-jw7kw?fontsize=14&hidenavigation=1&theme=dark)

在这个例子中，我们可以看到，要共享状态，只需使用 useStore 订阅同一个 key 即可，非常简单。可以说，只要你学会了 useState，也就学会了 useStore，只要你学会了 useStore，你就学会了 React 的状态管理。

## 自定义 Hooks

为了能使组件和状态管理逻辑分离，强烈建议使用自定义 hooks 管理状态，比如说你要管理 Counter 的状态，那就是自定义一个叫 `useCounter` 的 hooks，然后在各组件中使用 `useCounter()`， 而不是直接使用 `useStore('Counter')`。

示例：

```jsx
import React from "react";
import { useStore } from "stook";

function useCounter() {
  const [count, setCount] = useStore("Counter", 0);
  const decrease = () => setCount(count - 1);
  const increase = () => setCount(count + 1);
  return { count, increase, decrease };
}

function Display() {
  const { count } = useCounter();
  return <div>{count}</div>;
}

function Increase() {
  const { increase } = useCounter();
  return <buttun onClick={increase}>+</buttun>;
}

function Decrease() {
  const { decrease } = useCounter();
  return <buttun onClick={decrease}>-</buttun>;
}

export default function App() {
  return (
    <div>
      <Decrease />
      <Display />
      <Increase />
    </div>
  );
}
```

[![Edit nameless-shadow-ozke5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nameless-shadow-ozke5?fontsize=14&hidenavigation=1&theme=dark)

上面三个子组件，都用到了 useCounter，它们实现了状态共享。

自定义 Hooks 是最佳实践，强烈建议在业务中都使用自定义 Hooks。

## Api

Stook 的核心非常简洁，核心 Api 就 `useStore` 一个，全部 Api 也就 3 个：

- useStore - [查看详情](https://stook-cn.now.sh/docs/stook/use-store)
- mutate - [查看详情](https://stook-cn.now.sh/docs/stook/mutate)
- getState - [查看详情](https://stook-cn.now.sh/docs/stook/get-state)

## 单元测试

测试 stook 是一件非常简单的事，因为测试 stook 也就是在测试 react hooks。

推荐使用 [react-hooks-testing-library](https://react-hooks-testing-library.com/)工具来测试 stook。

### 安装依赖

```bash
npm install -D @testing-library/react-hooks react-test-renderer
```

### 例子

**`useCounter.ts`**

```js
function useCounter() {
  const [count, setCount] = useStore("Counter", 0);
  const decrease = () => setCount(count - 1);
  const increase = () => setCount(count + 1);
  return { count, increase, decrease };
}
```

**`useCounter.test.ts`**

```js
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increase();
  });

  expect(result.current.count).toBe(1);
});
```

更多的测试技巧请看：[react-hooks-testing-library](https://react-hooks-testing-library.com/)。

## 调试

为了更好的编程体验，Stook 支持使用 Redux DevTools 调试。

### 安装 Redux DevTools extension

如果你未安装 Redux DevTools extension，请安装相应浏览器的插件：[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)。

### Setup

使用 devtools 非常简单，先安装 `stook-devtools` 包：

```bash
npm i stook-devtools
```

然后在项目代码中进入，并初始化：

```js
import { devtools } from "devtools";

devtools.init();
```

如果你不想在生产环境引入：

```js
import { devtools } from "devtools";

if (process.env.NODE_ENV !== "production") {
  devtools.init();
}
```

### 效果

生效后，可以在浏览器的 Redux DevTools extension 看到整个应用的 state 状态：

![devtools](https://stook-cn.now.sh/img/stook-devtools.png)

## 总结

Stook 的理念和传统的状态管理方案不同，没有明确的 Action 的概念。事实上，它的理念跟 React 的 `useState`是类似的，推崇的是：一个 Hooks，一个 state，一个 action。Stook 建议把状态分拆，变成一个个 Hooks，然后就变成 `[state, setState]`。

更多关于 Stook 的用法，请看 Github: [Stook](https://github.com/forsigner/stook)。
