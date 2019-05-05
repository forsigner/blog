---
title: React 异步数据管理思考
date: 2019-05-04
tags: [React, JavaScript, TypeScript]
categories: 前端
---

异步数据管理一直是前端的一个重点和难点，可以这么说，80%的 web 应用会有异步数请求据并在 UI 中消费，并且在相当多的 web 应用中，处理异步数据是它的核心业务逻辑。

在 React 的生态圈中，大部分人把异步数据使用状态管理维护，比如使用 Redux，用异步 Action 获取远程数据，然后存在 store 中。

但在这个时间节点，9012 年了，我认为使用状态管理去维护异步数据不是一种优雅的方式，React Hooks 出现后，我认为直接在组件内维护异步数据更加合理。不管从开发效率还是可维护性看，都比使用状态管理好。

为什么这说呢？下面我们通过代码来看看。

现在，假设我们要实现一个功能，获取一个 TodoList 数据，并且用组件渲染。

最简单是直接在组件内使用生命周期获取数据，然后存在组件内部的 state 中。

## 使用 React 生命周期

```jsx
import React from 'react'

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      todos: [],
      error: null,
    }
  }
  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const todos = await (await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      )).json()
      this.setState({ todos, loading: false })
    } catch (error) {
      this.setState({ error, loading: false })
    }
  }

  render() {
    const { loading, todos, error } = this.state

    if (loading) return <span>loading...</span>
    if (error) return <span>error!</span>
    return (
      <ul>
        {todos.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    )
  }
}
```

在线 Demo 请看：
[![Edit fetch-data-with-cdm](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jnz7v46llv?fontsize=14)

这种方式非常非常符合人的直觉，但最大的问题是：外部无法改变异步数据，组件渲染后数据就无法再改变。这也是大部分人使用状态管理维护异步数据的缘由。

下面我们看看如何使用 Redux 维护异步数据。

## 使用 Redux

假设我们已经使用了 Redux 中间件 `redux-thunk`，我们会有下面类似的代码:

首先，我们会把字符串定义定义为常量到一个 `constant.js`

```js
export const LOADING_TODOS = 'LOADING_TODOS'
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS'
export const LOAD_TODOS_ERROR = 'LOAD_TODOS_ERROR'
```

然后，编写异步的 action, `actions.js`:

```jsx
import {
  LOADING_TODOS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_ERROR,
} from '../constant'

export function fetchTodos() {
  return dispatch => {
    dispatch({ type: LOADING_TODOS })
    return fetch('https://jsonplaceholder.typicode.com/todo')
      .then(response => response.json())
      .then(todos => {
        dispatch({
          type: LOAD_TODOS_SUCCESS,
          todos,
        })
      })
      .catch(error => {
        dispatch({
          type: LOAD_TODOS_ERROR,
          error,
        })
      })
  }
}
```

接着，在 reducer 中处理数据，`todos.js`

```js
import {
  LOADING_TODOS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_ERROR,
} from '../constant'

const initialState = {
  loading: false,
  data: [],
  error: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_TODOS:
      return {
        ...state,
        loading: true,
      }
    case LOAD_TODOS_SUCCESS:
      return {
        ...state,
        data: action.todos,
        loading: false,
      }
    case LOAD_TODOS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
```

还没完，最后，在组件中使用:

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTodos } from '../actions'

class Todos extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTodos)
  }

  render() {
    const { loading, items, error } = this.props
    if (loading) return <span>loading...</span>
    if (error) return <span>error!</span>

    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  const { todos } = state
  return {
    loading: todos.loading,
    items: todos.data,
    error: todos.error,
  }
}

export default connect(mapStateToProps)(Todos)
```

在线 Demo 请看：
[![Edit fetch-data-with-redux](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xjl84rjvno?fontsize=14)

我们可以发现，使用 Redux 管理异步数据，代码量激增，啰嗦冗余，模板代码一堆，，不管开发效率还是开发体验，亦或是可以维护性和可读性，个人认为，类似的 redux 这样的解决方案并不优雅。

下面我们看看如何使用 React Hooks 获取异步数据。

## 使用 React Hooks

我们使用 一个库叫[`dahlia-rest`](https://github.com/forsigner/dahlia/blob/master/packages/dahlia-rest/README.md) 的 `useFetch` 获取数据，可以轻松的拿到数据的状态 `{ loading, data, error }`，然后渲染处理：

```js
import React from 'react'
import { useFetch } from 'dahlia-rest'

const Todos = () => {
  const { loading, data, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos',
  )

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
export defulat Todos
```

`dahlia-rest`的完整用法可以看 [dahlia-rest](https://dahlia.js.org/docs/rest/basic)

在线 Demo 请看：
[![Edit fetch-data-with-dahlia](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/lxz0ym7qj9?fontsize=14)

代码非常简洁，loading 状态和错误处理非常优雅，也许你发现了，貌似这也和使用生命周期一样，外部无法改变数据状态，其实不是的，下面重会点讲讲如何更新数据。

## Hooks 更新异步数据

使用 hooks 维护异步数据，有三种方式更新异步数据，这里用 [`dahlia-rest`](https://github.com/forsigner/dahlia/blob/master/packages/dahlia-rest/README.md) 举例。

### 内部 refetch

这是最简单的重新获取数据的方式，通常，如果触发更新的动作和`useFetch`在统一组件内，可以使用这种方式。

```jsx
const Todos = () => {
  const { loading, data, error, refetch } = useFetch('/todos', {
    query: { _start: 0, _limit: 5 }, // first page
  })

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  const getSecondPage = () => {
    refetch({
      query: { _start: 5, _limit: 5 }, // second page
    })
  }

  return (
    <div>
      <button onClick={getSecondPage}>Second Page</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

在线 Demo 请看：
[![Edit refetch](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5kk9j78qwl?fontsize=14)

### 更新依赖 (deps)

通过更新依赖来重新获取数据，这也是常用的方式之一，因为在很多业务场景中，触发动作会在其他组件中，下面演示如何通过更新依赖触发数据更新：

这里使用一个简单的状态管理库维护依赖对象，状态管理的完整文档请看[dahlia-store](https://dahlia.js.org/docs/store/intro)。

定义一个 store 用来存放依赖：

```jsx
// /stores/todoStore.ts
import { createStore } from 'dahlia-store'

const todoStore = createStore({
  params: {
    _start: 0,
    _limit: 5,
  },
  updateParams(params) {
    todoStore.params = params
  },
})
```

在组件中，使用依赖：

```jsx
import { observe } from 'dahlia-store'
import todoStore from '@stores/todoStore'

const Todos = observe(() => {
  const { params } = todoStore
  const { loading, data, error } = useFetch('/todos', {
    query: params,
    deps: [params],
  })

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  const updatePage = () => {
    todoStore.updateParams({ _start: 5, _limit: 5 })
  }

  return (
    <div>
      <button onClick={updatePage}>Update Page</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
})
```

在线 Demo 请看：
[![Edit deps](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yj5yko1nzz?fontsize=14)

你可以在任意地方，不管组件内还是组件外，你都可以可以调用`todoStore.updateParams`更新依赖，从而实现数据更新。

注意：这里的依赖是个对象，你必须更新整个对象的引用，如果你只更新对象的属性是无效的。

### 使用 fetcher

有时候，你需要在组件外部重新获取数据，但`useFetch` 却没有任何可以被依赖的参数，这时你可以使用 fetcher

```jsx
import { useFetch, fetcher } from 'dahlia/rest'

const Todos = () => {
  const { loading, data, error } = useFetch('/todos', { name: 'GetTodos' })

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

const Refresh = () => (
  <button onClick={() => fetcher.GetTodos.refetch()}>refresh</button>
)

const TodoApp = () => (
  <div>
    <Refresh />
    <Todos />
  </div>
)
```

在线 Demo 请看：
[![Edit fetcher](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pkjkvj5pr0?fontsize=14)

使用 fetcher 是，你需要为`useFetch` 提供 name 参数，用法是：`fetcher['name'].refetch()`，这里的 `refetch` 和内部 `refetch` 是同一个函数，所以它也有 options 参数。

## 总结

个人认为，异步数据不应该使用状态管理来维护，应该放在组件内。对于大多数 web 应用，状态管理中的数据应该是比较薄的一层，并且应该避免在状态管理中处理异步带来的副作用。也许，Redux 默认不支持处理异步数据，是一个相当有远见的决定。

我们发现，使用 Hooks 管理异步数据，代码非常简洁，有一种大道至简感觉和返璞归真感觉。几行代码就能写完功能，为什么要搞出那么长的链路，搞那么绕的逻辑。
