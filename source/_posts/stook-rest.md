---
title: Stook-rest：React 异步数据管理思考
date: 2020-01-04
tags: [React, JavaScript, TypeScript]
categories: 前端
---

## 回顾

八个月前，我曾经写过一篇文章 [React 异步数据管理思考](https://zhuanlan.zhihu.com/p/64648552)，当时我认为使用 React Hooks 管理异步数据是一个更好的选择。半年来我在项目中一直使用这种解决方案，发现这种方案的有点很多：TypeScript 支持度好、代码量少且可读性好、Loading 状态获取容易等。缺点是：1.异步数据的共享不好处理；2.组件承担了太多的业务逻辑。

八个月后，经过多个项目的实践，我创建了一个异步数据管理的工具：[stook-rest](https://stook-cn.now.sh/docs/rest/intro)。

## 关于 Stook-rest

异步数据管理一直是一个难点，在 React 的生态圈中，很多人把异步数据使用状态管理维护，比如使用 Redux，用异步 Action 获取远程数据。我个人不喜欢使用 Redux 状态管理维护异步数据，我更倾向于在组件内直接获取异步数据，使用 hooks，简化数据的获取和管理。

Stook-rest 是一个基于 Stook 的 Restful Api 数据获取工具。

## 基本用法

我们使用 `stook-rest` 的 `useFetch` 获取数据，可以轻松的拿到数据的状态 `{ loading, data, error }`，然后渲染处理：

```jsx
import React from "react";
import { useFetch } from "stook-rest";

const Todos = () => {
  const { loading, data, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (loading) return <span>loading...</span>;
  if (error) return <span>error!</span>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default Todos;
```

[![Edit bitter-frog-t2tbm](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bitter-frog-t2tbm?fontsize=14&hidenavigation=1&theme=dark)

## 配置

### 全局配置

你可以使用 `config` 方法进行全局配置，全局配置将在每个请求生效：

```jsx
import { config } from "stook-rest";

config({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    foo: "bar"
  }
});
```

### 配置选项

**`baseURL`**: string

Restful Api 服务器 baseURL， 默认为当前前端页面 host。

**`headers`**: object

每个请求都会带上的请求头，默认为 `{ 'content-type': 'application/json; charset=utf-8' }`

### 创建实例

在某些应用场景，你可以能有多个后端服务，这时你需要多个 Client 实例：

```js
const client = new Client({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    foo: "bar"
  }
});

client.fetch("/todos").then(data => {
  console.log(data);
});
```

## useFetch

> const result = useFetch(url, options)

### 用法

以简单高效的方式获取和管理异步数据是 stook-rest 的核心功能。下面是一个示例:

```jsx
import { useFetch } from 'stook-rest'

interface Todo {
  id: number
  title: string
  completed: boolean
}

const Todos = () => {
  const { loading, data, error } = useFetch<Todo[]>('/todos')

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
```

[![Edit bitter-frog-t2tbm](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bitter-frog-t2tbm?fontsize=14&hidenavigation=1&theme=dark)

### URL（string）

HTTP 请求的 URL，eg: "/todos"。

### options

**`method?: Method`**

HTTP 请求的类型，默认为 `GET`, 全部可选值: `type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'`

```js
const { loading, data, error } = useFetch<Todo[]>('/todos', { method: 'POST' })
```

**`query?: Query`**

HTTP 请求的 query 对象，通常 `GET` 类型的请求比较常用。

```js
const { loading, data, error } = useFetch<Todo[]>('/todos', {
  query: { pageNum: 1, pageSize: 20 }
})
```

上面会把 url 转换为: `/todos?pageNum=1&pageSize=20`。详细的转换规则请参照 [qs](https://github.com/ljharb/qs)

**`body?: Body`**

HTTP 请求的 body 对象，和原生 `fetch` 的 [body](https://github.github.io/fetch/#request-body) 类似，不同的是，`useFetch` 的 body 支持 JS 对象：

```js
const { loading, data, error } = useFetch("/todos", {
  body: { title: "todo1" }
});
```

**`params?: Params`**

URL 的参数对象，用法如下：

```js
const { loading, data, error } = useFetch("/todos/:id", {
  params: { id: 10 }
});
```

请求发送后， `/todos/:id` 会转换为 `/todos/10`。

**`headers?: HeadersInit;`**

HTTP 请求头，和原生`fetch`的 [`Headers`](https://github.github.io/fetch/#Headers) 一致，但有默认值: `{ 'content-type': 'application/json; charset=utf-8' }`

**`deps?: Deps`**

`useFetch` 是一个自定义的 React hooks，默认情况下，组件多次渲染，`useFetch` 只会执行一次，不过如果你设置了依赖 (deps)，并且依赖发生更新，`useFetch`会重新执行，就是会重新获取数据，其机制类似于 `useEffect` 的依赖，不同的是不设置任何依赖值时，当组件发生多次渲染，`useFetch` 只会执行一次，`useFetch` 执行多次。

依赖值 deps 是个数组,类型为：`type Deps = ReadonlyArray<any>`

**`key?: string`**

该请求的唯一标识符，因为 stook-rest 是基于 stook，这个 key 就是 stook 的唯一 key，对于 refetch 非常有用。默认是为 `${method} ${url}`，比如请求如下:

```js
const { loading, data } = useFetch("/todos", { method: "POST" });
```

那默认的 key 为: `POST /todos`

### 结果 (Result)

**`loading: boolean`**

一个布尔值，表示数据是否加载中。

**`data: T`**

服务器返回的数据。

**`error: RestError`**

服务器返回错误。

**`refetch: <T>(options?: Options) => Promise<T>`**

重新发起一个请求获取数据，eg:

```jsx
const Todos = () => {
  const { loading, data, error, refetch } = useFetch<Todo[]>("/todos");

  if (loading) return <span>loading...</span>;
  if (error) return <span>error!</span>;

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
```

## 依赖请求

很多时候，一个请求会依赖另外一个请求的数据，这时候请求会有前后顺序，stook-rest 可以非常优雅的处理这种依赖请求：

```jsx
import React from "react";
import { config, useFetch } from "stook-rest";

export default () => {
  const { data: todos } = useFetch("/todos");

  const { loading, data: todo } = useFetch("/todos/:id", {
    params: () => ({ id: todos[9].id })
  });

  if (loading) return <div>loading....</div>;

  return (
    <div className="App">
      <div>Todo:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  );
};
```

我们知道，`params`、`query`、`body` 三中参数值通常是一个对象，其实他们也可以是一个函数，函数参数可以让我们轻易地使用依赖请求。

依赖请求的方式可以大大地减少你的代码量，并让你可以用类似同步的代码书写数据请求代码。

[![Edit sweet-lake-gu2el](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/sweet-lake-gu2el?fontsize=14&hidenavigation=1&theme=dark)


## 数据共享

### 使用

stook-rest 另一个强大的特性是请求数据的共享，由于 stook-rest 底层的数据管理是基于 stook 的，所以跨组件共享数据将变得非常简单：

```jsx
const TodoItem = () => {
  const { loading, data: todo } = useFetch('/todos/1')
  if (loading) return <div>loading....</div>
  return (
    <div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoItem = () => {
  const { loading, data: todo } = useFetch('/todos/1')
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <div>
    <TodoItem></TodoItem>
    <ReuseTodoItem></ReuseTodoItem>
  </div>
)
```
[![Edit wizardly-ellis-nqmqj](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wizardly-ellis-nqmqj?fontsize=14&hidenavigation=1&theme=dark)


上面我们在两个组件中使用了 `useFetch`，它们的唯一 key 是一样的 (都是 `GET /todos/1`)，而且只会发送一次请求，两个组件会使用同一份数据。

### 优化

个人不太建议直接在多个组件使用同一个 `useFetch`，更进一步使用自定义 hooks，增强业务逻辑的复用性：

```jsx
const useFetchTodo = () => {
  const { loading, data: todo, error } = useFetch('/todos/1')
  return { loading, todo, error }
}

const TodoItem = () => {
  const { loading, todo } = useFetchTodo()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>TodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoItem = () => {
  const { loading, todo } = useFetchTodo()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoItem:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <div>
    <TodoItem></TodoItem>
    <ReuseTodoItem></ReuseTodoItem>
  </div>
)
```

[![Edit blue-glitter-zysrb](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/blue-glitter-zysrb?fontsize=14&hidenavigation=1&theme=dark)

## 自定义 hooks

在真实的业务开发中，不建议直接在组件中使用 `useFetch`，更推荐是使用使用自定义 hooks 对请求的业务逻辑进行封装。

### 如何自定义 hooks ?

```jsx
const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch('/todos')
  return { loading, todos, error }
}
```

### 为何推荐自定义 hooks ?

自定义 hooks 有下面几点好处：

#### 为 hooks 命名

这看上去和直接使用 `useFetch` 没有太大区别，实际上它增加了代码的可读性。

#### 文件更易管理

如果我们我们直接在组件中使用 `useFetch`，我们需要在组件引入非常多文件。这个请求数据只有一个组件使用还好，如果多个组件需要共享此请求数据，文件管理将会非常乱。

```jsx
import React from 'react'
import { useFetch } from 'stook-rest'
import { Todo } from '../../typings'
import { GET_TODO } from '../../URL.constant'

export default () => {
  const { data: todos } = useFetch<Todo[]>(GET_TODO)

  if (loading) return <div>loading....</div>
  return (
    <div className="App">
      <div>Todo:</div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  )
}
```

如果使用使用自定义 hooks，我们只需在组件中引入 hooks:

```jsx
import React from 'react'
import { useFetchTodos } from '../../useFetchTodos'

export default () => {
  const { loading, todos } = useFetchTodos()

  if (loading) return <div>loading....</div>
  return (
    <div className="App">
      <div>Todos:</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}
```

#### 更好管理 computed value

为了业务逻辑更好的复用，我们经常会使用 computed value:

```jsx
const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch<Todo[]>('/todos')
  const count = todos.length
  const completedCount = todos.filter(i => i.completed).length
  return { loading, todos, count, completedCount, error }
}
```

#### 更优雅地共享数据

自定义 hooks 让数据跨组件共享数据更加优雅：

```jsx
interface Todo {
  id: number
  title: string
  completed: boolean
}

const useFetchTodos = () => {
  const { loading, data: todos = [], error } = useFetch<Todo[]>('/todos')
  const count = todos.length
  const completedCount = todos.filter(i => i.completed).length
  return { loading, todos, count, completedCount, error }
}

const TodoList = () => {
  const { loading, todos, count, completedCount } = useFetchTodos()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>TodoList:</div>
      <div>todos count: {count}</div>
      <div>completed count: {completedCount}</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

const ReuseTodoList = () => {
  const { loading, todos, count, completedCount } = useFetchTodos()
  if (loading) return <div>loading....</div>
  return (
    <div>
      <div>ReuseTodoList:</div>
      <div>todos count: {count}</div>
      <div>completed count: {completedCount}</div>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

export default () => (
  <div style={{ display: 'flex' }}>
    <TodoList></TodoList>
    <ReuseTodoList></ReuseTodoList>
  </div>
)
```

## Refetch


很多场景中，你需要更新异步数据，比如在 CRUD 功能中，新增、删除、修改、分页、筛选等功能都需要更新异步数据。`stook-rest` 提供了三中方式更新数据，三种方式可在不同业务场景中使用，这是`stook-rest`的重要功能之一，你应该仔细阅读并理解它的使用场景，使用这种方式管理异步数据，整个应用的状态将变得更加简单，代码量会成本的减少，相应的可维护性大大增加。

### 重新获取数据的三种方式

但很多时候，你需要更新异步数据，`stook-rest`提供三种方式更新数据:

- 内部 Refetch
- 更新依赖 deps
- 使用 fetcher

### 内部 Refetch

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

[![Edit vigilant-bouman-y0gu7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vigilant-bouman-y0gu7?fontsize=14&hidenavigation=1&theme=dark)

### 更新依赖 deps

通过更新依赖来重新获取数据，这也是常用的方式之一，因为在很多业务场景中，触发动作会在其他组件中，下面演示如何通过更新依赖触发数据更新：

```jsx
import { useState } from 'react'
import { useFetch } from 'stook-rest'

export default () => {
  const [count, setCount] = useState(1)
  const { loading, data, error } = useFetch('/todos', {
    deps: [count],
  })

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  const update = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={update}>Update Page</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
[![Edit loving-cray-b6xvq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/loving-cray-b6xvq?fontsize=14&hidenavigation=1&theme=dark)

你可以在任意地方，不管组件内还是组件外，你都可以更新依赖，从而实现数据更新。

注意：这里的依赖是个对象，你必须更新整个对象的引用，如果你只更新对象的属性是无效的。

### 使用 fetcher

有时候，你需要在组件外部重新获取数据，但`useFetch` 却没有任何可以被依赖的参数，这时你可以使用 fetcher:

```jsx
import { useFetch, fetcher } from 'stook-rest'

const Todos = () => {
  const { loading, data, error } = useFetch('/todos', { key: 'GetTodos' })

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

const Refresh = () => <button onClick={() => fetcher.get('GetTodos').refetch()}>refresh</button>

const TodoApp = () => (
  <div>
    <Refresh />
    <Todos />
  </div>
)
```

[![Edit stoic-bardeen-y15mg](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stoic-bardeen-y15mg?fontsize=14&hidenavigation=1&theme=dark)

使用 fetcher 是，你需要为`useFetch` 提供 name 参数，用法是：`fetcher['name'].refetch()`，这里的 `refetch` 和内部 `refetch` 是同一个函数，所以它也有 options 参数。

### 高级用法

使用 fetcher 时，为一个 HTTP 请求命名 (name) 不是必须的，每个 HTTP 请求都有一个默认的名字，默认名字为该请求的 url 参数。

为了项目代码的可维护性，推荐把所以 Api 的 url 集中化，比如：

```jsx
// apiService.ts
enum Api {
  GetTodo = 'GET /todos/:id',
  GetTodos = 'GET /todos',
}

export default Api
```

在组件中:

```jsx
import { useFetch, fetcher } from 'stook-rest'
import Api from '@service/apiService'

const Todos = () => {
  const { loading, data, error } = useFetch(Api.GetTodos)

  if (loading) return <span>loading...</span>
  if (error) return <span>error!</span>

  return (
    <div>
      <button onClick={() => fetcher[Api.GetTodos]refetch()}>refresh</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

## 总结

个人认为，使用 Hooks 获取和管理异步数据，将逐渐在 React 社区中流行。我们发现，使用 Hooks 管理异步数据，代码非常简洁，有一种大道至简感觉和返璞归真感觉。