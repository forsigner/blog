---
name: 风格
order: 930
---

# 风格指南

## TypeScript

**Type safety** 是 Dahlia 的重要特点之一，所以 Dahlia 为 **TypeScript** 提供了一等的支持，Dahlia 建议使用 TypeScript 来开发你的项目，Dahlia 内置的状态管理有完善类型支持，你几乎不需要写任何类型定义，就可以享受完整的类型智能提示。

**Type safety** 也是我创建 Dahlia 的最大初衷之一，如果你使用过 TypeScript 的方式开发 React 项目，不管是搭配 Redux 还是 Mobx，都会有些蹩脚，你很容易会因为要写各种类型定义而变得心情烦躁。

## createStore

把 store 的分拆成属性导出，同时保留默认导出，这样你在组件内使用 store 时会更加优雅和灵活。

```js
// bad
import { createStore } from 'dahlia'
const counterStore = createStore({
  // options
})

export default counterStore
```

```js
// good
import { createStore } from 'dahlia'

export const { useStore, dispatch } = createStore({
  // options
})

export default { useStore, dispatch }
```

## state selector

使用 state selector 选择所需的 state，可以减少重复渲染的可能，提高组件的性能。

```js
// bad
const state = useStore(S => S)
```

```js
// good
const count = useStore(S => S.count)
const { count, step } = useStore(S => ({ count: S.count, step: S.step }))
```

## action selector

使用 action selector 选择所需 dispatch 的 action，用字符串智能提示更弱，而且不能跳转到定义处，使用 action selector 你可以放心的进行代码重构，代码可维护性增加。

```js
// bad
dispatch('increment')
```

```js
// good
dispatch(A => A.increment)
```

## GraphQL String

为 GraphQL 查询命名，方便工具自动生成 typings。

```js
// bad

// bad
const GET_HERO = gql`
  {
    hero {
      name
    }
  }
`
```

```js
// good
const GET_HERO = gql`
  query Hero {
    hero {
      name
    }
  }
`
```


## useQuery·useMutate

分离 GraphQL query 字符串，把他们放在一个单独的文件个好习惯。

```js
// bad
const { loading, data, error } = useQuery(`
  {
    hero {
      name
    }
  }
`)
```

```js
// good
const GET_HERO = gql`
  query Hero {
    hero {
      name
    }
  }
`

const { loading, data, error } = useQuery(GET_HERO)
```
