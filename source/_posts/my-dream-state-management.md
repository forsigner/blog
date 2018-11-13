---
title: 我理想中的状态管理工具
date: 2018-11-12
tags: [JavaScript, TypeScript, React]
categories: 前端
---


现已存在许多成熟的状态管理解决方案：Redux、Mobx、Mobx-state-tree，还有基于 Redux 的 Dva.js、Rematch... 但对于我个人来说，理想的状态管理工具只需同时满足两个特点：

- **简单易用，并且适合中大型项目**
- **完美的支持 Typescript**

要做到这两点其实并不简单。

首先说说 **“简单易用，并且适合中大型项目”**，这里包含层含义：

- Api 足够简单，尽量引入少的概念
- 易用性高，使用者易用上手，较少的冗余代码
- 能让使用者更容易的写出可维护性高的代码
- 能让业务代码有良好地组织方式

怎么才能算是简单易用呢？用一个叫 [reworm](https://github.com/pedronauck/reworm) 的状态管理库来举例，它的使用方式是这样的：

```js
import React from 'react';
import { Provider, create } from 'reworm';

const { set, get } = create({ name: 'John' });

class App extends React.Component {
  componentDidMount() {
    set(prev => ({ name: 'Peter' + prev.name }));
  }
  render() {
    return (
      <Provider>
        <div>{get(s => s.name)}</div>
      </Provider>
    );
  }
}
```

我碰巧写写过一个类似状态管理库，叫 [mistate](https://github.com/forsigner/mistate)，甚至更简单，连 `Provider` 都不用，实现代码也只有 40 行。用法如下：

```js
import React from 'react';
import { create } from 'mistate';

const { get, set } = create({ count: 0 });

const App = () => (
  <div>
    <span>{get(s => s.text)}</span>
    <button onClick={() => set(prev => ({ count: prev.count++ }))}>+</button>
  </div>
);
```

它们足够简单，非常容易上手，但是它们致命是缺点是并不适合中大型项目，它们自由度太高，缺乏对业务代码的约束，在多人合作的中大型项目，代码的可维护性会大大降低，因为每个人写的代码风格可能都不一样。举个例子，有些人可能会直接在 Component 中使用 `set`，有些人可能会基于 `set` 封装成一个个 `acton`:

```js
import React from 'react';
import { create } from 'mistate';

const { get, set } = create({ count: 0 });
const actions = {
  increment() {
    set(prev => ({ count: prev.count++ })
  },
  decrement() {
    set(prev => ({ count: prev.count-- })
  },
}

const App = () => (
  <div>
    <span>{get(s => s.text)}</span>
    <button onClick={() => actions.increment)}>+</button>
    <button onClick={() => actions.decrement)}>+</button>
  </div>
);
```

这种自由度虽然灵活度高，但是降低了代码的可维护性。

另外，用 render props 获取 state 看似比 Redux 的 Connect 简单，但其实并不优雅，比如一个很常见的获取多个 state，使用 render props 可能要这样：

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

多个 render props 的嵌套会导致 callback hell 类似结果，直接让你的代码反人类。

上面说完了 “**简单易用**”，下面聊聊 “**适合中大型项目**”。当然，我心目中的 “**适合中大型项目**” 的前提是 “**简单易用**”，否者我并不会选择它。

首先上面面说的 reworm 和 mistate 并不适合在中大型项目中使用，他们适合用在小型项目，比如一个简单的营销活动，还以非常适合的场景就是在工具类库中使用，因为它们足够简单、轻量。

再说说大家熟悉 Redux 和 Mobx，首先是 Redux ，我个人认为 Redux 确实满足 “**适合中大型项目**”，因为使用者几乎都会按照它推荐的方式来组织代码，但它不满足 “**简单易用**”，太过于繁琐，使用起来有种吃*的感觉(本人没吃过~)。然后是 Mobx，个人挺喜欢，挺 “**简单易用**”，对使用者写出的代码有一定的限制，但感觉又太过于自由，并且非 Immutable，给人感觉是一个很中庸的解决方案。


在满足 **“简单易用，并且适合中大型项目”** 的前提下，个人比较喜欢的状态管理解决方案是: [dva](https://github.com/dvajs/dva)、[rematch](https://github.com/rematch/rematch)、[mirror](https://github.com/mirrorjs/mirror)，三者都是基于 Redux 开发，他们的 Api 相似度极高，简化了 Redux 的使用，使得代码组织方更加合理，通俗的说就是为 Redux 用户提供了最舒服的套路去写代码，可以说是当前 Redux 社区中的最佳实践。

看看他们是如何组织代码，以 mirror 来举例:

```js
import React from 'react'
import mirror, {actions, connect, render} from 'mirrorx'

// declare Redux state, reducers and actions,
// all actions will be added to `actions`.
mirror.model({
  name: 'app',
  initialState: 0,
  reducers: {
    increment(state) { return state + 1 },
    decrement(state) { return state - 1 }
  },
  effects: {
    async incrementAsync() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      actions.app.increment()
    }
  }
})

// connect state with component
const App = connect(state => {
  return {count: state.app}
})(props => (
    <div>
      <h1>{props.count}</h1>
      {/* dispatch the actions */}
      <button onClick={() => actions.app.decrement()}>-</button>
      <button onClick={() => actions.app.increment()}>+</button>
      {/* dispatch the async action */}
      <button onClick={() => actions.app.incrementAsync()}>+ Async</button>
    </div>
  )
)

// start the app，`render` is an enhanced `ReactDOM.render`
render(<App />, document.getElementById('root'))
```

可以看出它们核心是把 Redux 分散的 actions 和 reducers 合并在一个地方，并减少了样板代码，而且自带异步 action 解决方案，抽象为 effects。

说完第一个特点，接下来是第二个特点：**“完美的支持 Typescript”**。

为什么我这么这么执着于 Typescript，使用过 Typescript 的都应该知道，不过什么规模的项目，开发体验比使用 Javascript 好太多，没入坑的同学可以去试试。

基于第一特点的筛选，原生 Redux 和 Mobx 已被忽略，对于[dva](https://github.com/dvajs/dva)、[rematch](https://github.com/rematch/rematch)、[mirror](https://github.com/mirrorjs/mirror)，对 Typescript 支持最好的是 Rematch，它本身也是用 Typescript 写的，遂继续忽略 Dva 和 mirror。

在聊 Rematch 和 Typescript 一起使用之前，先了解一下原生 Redux 和 Typescript 怎么一起使用， 用使用频率最高的 connect 举个例子：

```js
interface StateProps {
  count: number
}

interface DispatchProps {
  increment: () => void
}

interface OwnProps {
  name: string
}

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(MyComponent);
```

为了 MyComponent 的 props 能有正确的类型断言，你必须手写 StateProps 和 DispatchProps，这是一件很蛋疼的事情，也没有体现出使用 Typescript 的优势所在。理想的应该是 connect 之后 MyComponent 的 props 能被自动推倒出来，这才是完美的开发体验。但是基于 hoc 的使用方式，这方面貌似暂时无解，除非使用 render props，但是 render props 的书写方式真是有点辣眼睛。

再来看看 Rematch 和 Typescript 怎么一起使用：

```js
import * as React from 'react'
import { connect } from 'react-redux'

import { iRootState, Dispatch } from './store'

const mapState = (state: iRootState) => ({
	dolphins: state.dolphins,
	sharks: state.sharks,
})

const mapDispatch = (dispatch: Dispatch) => ({
	incrementDolphins: dispatch.dolphins.increment,
	incrementDolphinsAsync: dispatch.dolphins.incrementAsync,
	incrementSharks: () => dispatch.sharks.increment(1),
	incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
	incrementSharksAsync2: () => dispatch({ type: 'sharks/incrementAsync', payload: 2 }),
})

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
type Props = connectedProps

class Count extends React.Component<Props> {
  // ....
}

export default connect(mapState, mapDispatch)(Count)

```

跟原生的 Redux 基本大同小异，没体现 Typescript 的优势，有点强行上 Typescript 的感觉。

对我个人而言 Rematch 也无法满足这两个特点。

所以, 我决定自己造一个:

> [stamen: **可能是基于 Hooks 和 Typescript 最好的状态管理工具**](https://github.com/forsigner/stamen)