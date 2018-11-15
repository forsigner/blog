---
title: 可能是基于 Hooks 和 Typescript 最好的状态管理工具
date: 2018-11-13
tags: [JavaScript, TypeScript, React]
categories: 前端
---

接上一篇：[我理想中的状态管理工具](http://forsigner.com/2018/11/12/stamen-i/)

之前说，对于我个人来而言，理想的状态管理工具只需同时满足两个特点：

- **简单易用，并且适合中大型项目**
- **完美地支持 Typescript**

未能找到一个完美满足这两点的，所以我决定自己造了一个：叫 [Stamen](https://github.com/forsigner/stamen)。

首先是 **简单易用，并且适合中大型项目**，Stamen 的 Api 设计借鉴了 dva、mirror、rematch，但却更简单，主要借鉴了它们的 model 的组织方式：state、reducers、effects。把 action 分为 reducer 和 effect 两类是很好的实践。

先看看 Stamen 是怎么使用的：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'stamen';

const CounterStore = createStore({
  state: {
    count: 10,
  },
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
  effects: {
    async asyncIncrement(dispatch) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      dispatch('increment');
    },
  },
});

const App = () => {
  const { get, dispatch } = CounterStore.useStore();
  const count = get(state => state.count);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch(actions => actions.increment)}>+</button>
      <button onClick={() => dispatch('asyncIncrement')}>async+</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

线上 demo 可以看 (Check on CodeSandbox): [Basic](https://codesandbox.io/s/0vrrlkjx5w) | [Async](https://codesandbox.io/s/kmq65p3l97)

这段代码涵盖了 Stamen 的全部 Api，核心的理念包括：

- 尽量简洁的 Api，没有 connect、Provider
- 使用 React Hooks，抛弃 hoc 和 render props
- 推荐使用多 store，store 是分形的，更加灵活

为什么不需要 Provider ？

Stamen 默认是多 store，这更灵活简单 ，所以并不需要使用 Provider 包裹。

为什么使用 Reack Hooks?

用 React Hooks 写出代码可读性更强，可维护性更高，对 Typescript 支持更好，hoc 最大问题是对 Typescript 支持不好，使用 render props 最大问题写出的代码有点反人类，当然 hoc 和 render props 和 React Hooks 对比还有其他缺点，具体可以 Hooks 文档。

之前有一段代码，用 render props 会产生太多嵌套：

```js
const Counter = create({ count: 0 });
const User = create({ name: 'foo' });
const Todo = create({ todos: [] });

const App = () => (
  <div>
    {User.get(user => (
      <div>
        <span>{user.name}</span>
        <div>
          {Todo.get(todo => (
            <div>
              {todo.todos.map(item => {
                <div>
                  <span>{item.name}</span>;
                  <span>{Counter.get(s => s.count)}</span>
                </div>;
              })}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
```

如果使用 React Hooks 改写，可读性会大大提高，下面用 Stamen 改写：

```js
const counterStore = CounterStore.useStore();
const userStore = UserStore.useStore();
const todoStore = TodoStore.useStore();

const count = counterStore.get(s => s.count);
const name = userStore.get(s => s.name);
const todos = TodoStore.get(s => s.todos);

const App = () => (
  <div>
    <span>{name}</span>
    <div>
      {todos.map(item => {
        <div>
          <span>{item.name}</span>
          <span>{count}</span>
        </div>;
      })}
    </div>
  </div>
);
```

接下来是 **完美地支持 Typescript**，前面是过 hoc 对 Typescript 支持，render props 书写可读性差，React Hooks 能很好的平衡这两点。

下面用几张 gif 来展示 Stamen 对 Typescript 完美地支持。

**图一**: 用鼠标悬停到变量 state 和 action，可以查看它们完整的类型定义。不同于使用 connect 等 hoc，你不要写任何类型定义，一切都是自动地类型推倒。


![hover](http://forsigner.com/images/stamen/hover.gif)


**图二**: state 的自动补全。


![state](http://forsigner.com/images/stamen/state.gif)


**图三**: actions 的自动补全，dispatch 支持两种类型参数，一种是字符串(action 的函数名)，另外一种 actionSelector 函数(类似 redux 的 stateSlector)，推荐使用后面一种，开发体验会更好。


![action](http://forsigner.com/images/stamen/action.gif)


**图四**: 使用 actionSelector，方便地跳转到 action 函数定义处，方便安全地进行重构重命名等操作。

![action](http://forsigner.com/images/stamen/go.gif)


Stamen 的 Api 非常简单，可以直接看类型定义：

```js
interface Opt<S, R, E> {
  state: S;
  reducers?: R;
  effects?: E;
}

declare function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>): {
  useStore: () => {
    get: <P>(selector: Selector<S, P>) => P;
    dispatch: (action: ActionSelector<R, E> | keyof R | keyof E, payload?: any) => void;
  };
};
```

更多关于 Stamen 的使用方法，可以看 github: [stamen](https://github.com/forsigner/stamen)