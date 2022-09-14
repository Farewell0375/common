# Vue相关
## 自动引入组件 <Badge text="vue2.x"/>
```js
const requireComponent = require.context(
 "./components",
 false,
 /\w+\.(vue|js)$/
);
const cmps = {};
requireComponent.keys().map(fileName => {
  // map创建一个新数组，结果是该数组中的每个元素都是调用一个提供的函数
  // 测试vpn好使不
  const cmp = requireComponent(fileName).default;
  cmps[cmp.name] = cmp;
});

export default {
  // 注册
  components: {
    ...cmps
  }
 ```
## 全局注册 <Badge text="vue2.x"/>
## 禁止修改 <Badge text="vue2.x"/>
## 一个页面中多个router-view如何实现 <Badge text="vu2.x"/>
```js
{
    path: '/xxx'
    // component变成components
    components: {
        key1: () => import('@/packages/BaseLayout/sandBox.vue'),
        key2: () => import('@/packages/BaseLayout/sandBox.vue')
    }
}
```

使用时

```js
<router-view name="key1"></router-view>
<router-view name="key2"></router-view>
```
## 作用域插槽 <Badge text="vue2.x"/>

作用域插槽，就是组件中提供数据可供外界访问的插槽

在子组件中

```vue
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item">
        <slot name="title" :row="item">xxx</slot>
      </li>
    </ul>
  </div>
</template>
```

在父组件中

```vue
<template>
  <div>
    <CenterLayout :list="list">
      <template #title="{row}">{{row.name}}</template>
    </CenterLayout>
  </div>
</template>
```

上面等同于

```vue
<template slot="title" slot-scope="{row}">{{row.name}}</template>
```

## 路由守卫 <Badge text="vue2.x"/>

**全局路由守卫**

router.beforeEach

**组件路由守卫**

在定义路由时

```js
{
    path: '/xxx',
    component: 'xxx',
    beforeEnter (to, from, next) => {
        // 进入组件前
    }
}
```

**写在组件内部的守卫**

```vue
methods: {

},
beforeRouterEnter (to, from, next) {
// 进入组件之前
}
beforeRouterUpdate (to, from, next) {
// 组件更新前
}
beforeRouterLeave (to, from, next) {
// 离开组件前
}
```
## vuex <Badge text="vue2.x"/>

**state** 仓库，用于存放东西

**getters** 用于过滤之类的

**mutation** 同步方法

**actions** 异步方法

## keep-alive <Badge text="vue2.x"/>

## watch 监听对象会有哪些问题，要怎么解决 <Badge text="vue2.x"/>

监听对象时，newval会和oldval一样，这是因为对象是引用的

可以用computed来解决，computed中定义一个属性，然后序列化一下，再watch中监听这个computed的属性。

## 微任务与宏任务

微任务与宏任务都属于异步任务

微任务-》宏任务-》微任务-》宏任务 就是事件循环

promise.then() 和 async/await是微任务

settimeout 之类的属于宏任务

## vue为什么使用异步渲染 nextTick <Badge text="vue2.x"/>

vue的异步渲染其实是将dom的更新操作放在微任务中，因为微任务优先于宏任务，所以代码中使用settimeout也可以获取最新的dom数据

而nexttick时注册一个回调函数放在微任务队列，所以要注意nexttick的位置

https://github.com/berwin/Blog/issues/22

## 动态组件

<component :is="xx" />

## 双向绑定的原理 <Badge text="vue2.x"/>
在vue2中，通过`object.defineProperty`数据劫持以及组合了订阅发布模式来实现的

数据接触，发布订阅模式，组合起来
## 自定义指令

## 父子，祖孙 通讯方式 兄弟组件除了bus还能用什么通信

```vue
provider () {
	return {
		xxx: 1
	}
}
injdect: ['xxx']
```

```vue
Vue.prototype.$bus=new Vue();
$bus.$on
$bus.$off
$bus.$emit
```

## es6解构赋值怎么设置默认值

const { a = 1, b= 2} = xxx

## 自己封装v-model，以及原理