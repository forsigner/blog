---
title: 简洁的 React 状态管理 - Stamen
date: 2018-10-1
tags: [JavaScript, TypeScript]
categories: 前端
---

说到 React 状态管理，必提的肯定是 Redux 与 MobX，2018 年，它们依然是最火热的状态管理工具，也有一些基于 Redux 的，如 dva、rematch 等，也有新的，如 mobx-state-tree，这里不对各个方案作评价。

不评价但还是想吐槽:

**如果**...

什么 provider, connections, actions, reducers, effects, dispatch, put, call, payload, @observable, @computed, @observer, @inject...

一堆模板代码、各种概念、什么大哲学... 还有各种多余牛毛的 Api。

我只是想早点码完页面下班，早点下班健身、陪妹子...

所以，我想要这样的一个状态管理库：

- ** 轻量** 个人做移动端开发比较多
- **简洁** 没模板代码, 尽量少 api
- **符合直觉** 没复杂的概念， 给个 action 改 state 就好
- **清晰** 更易写出可维护和可读性好的代码
- **高效** 更高的开发效率，这很重要
- **Typescript** 高度支持 state 和 action 的智能提示

我是个**实用主义者**，开发效率、代码可维护性和可读性、开发体验大于各种什么范式、各种理论，也不需要装纯，重要的是可以快速处理业务，产生价值，早点下班打王者。

有一天，我看到了 mobx 作者的 immer, 我感觉使用 immer, 可以实现一个我理想中的状态管理方工具，所以造了一个轮子，叫 [stamen](https://github.com/forsigner/stamen), 他有什么特点呢，我说过想要的就是。

如果有什么核心特点的话，那应该是 "简洁"，这里指的是使用者写代码时简洁，可以专注于业务，而不是自身源代码简洁，把问题留给使用者。

**用法比较点单:**

```js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'stamen';

const { consume, mutate } = createStore({ count: 1 });

const App = () => (
  <div>
    <span>{consume(state => state.count)}</span>
    <button onClick={() => mutate(state => state.count--)}>-</button>
    <button onClick={() => mutate(state => state.count++)}>+</button>
  </div>
);

render(<App />, document.getElementById('root'));
```

只有 state 和 action 没有其他概念， 只有一个 api:

```js
const { consume, mutate } = createStore({
  /** state object**/
});
```

**更用法可以看：**

Github: https://github.com/forsigner/stamen
文档: http://forsigner.com/stamen-zh-cn