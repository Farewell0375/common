## 从输入URL到页面显示发生了什么?

在浏览器输入url后，浏览器主进程处理输入信息后开始导航，与网络进程通信，准备发起url请求，此时并不会直接发起请求，会首先查找本地缓存资源，如果有就返回资源给浏览器，没有的话就发起url请求。

总体来说分为以下几个过程:
   DNS 解析:将域名解析成 IP 地址
   TCP 连接：TCP 三次握手
   发送 HTTP 请求
   服务器处理请求并返回 HTTP 报文
   浏览器解析渲染页面
   断开连接：TCP 四次挥手

> 三次握手
>
>  客户端发送一个带数据包到服务器端口（第一次握手，由浏览器发起，告诉服务器我要发送请求了）
>  服务器发回一个响应包以示传达确认信息（第二次握手，由服务器发起，告诉浏览器我准备接受了，  你赶紧发送吧）
>  客户端再回传一个数据包，代表“握手结束”（第三次握手，由浏览器发送，告诉服务器，我马上就发了，准备接受吧）

> 四次挥手
>
> 发起方向被动方发送报文，表示已经没有数据传输了。并进入 FIN_WAIT_1 状态。(第一次挥手：由浏览器发起的，发送给服务器，我请求报文发送完了，你准备关闭吧)
> 被动方发送报文，表示同意关闭请求。此时主机发起方进入 FIN_WAIT_2 状态。(第二次挥手：由服务器发起的，告诉浏览器，我请求报文接受完了，我准备关闭了，你也准备吧)
>   被动方向发起方发送报文段，请求关闭连接。并进入 LAST_ACK 状态。(第三次挥手：由服务器发起，告诉浏览器，我响应报文发送完了，你准备关闭吧)
>   发起方向被动方发送报文段，然后进入等待 TIME_WAIT 状态。被动方收到发起方的报文段以后关闭连接。发起方等待一定时间未收到回复，则正常关闭。(第四次挥手：由浏览器发起，告诉服务器，我响应报文接受完了，我准备关闭了，你也准备吧)

## 如何判断是数组还是对象

可以使用原型链中的toString方法

```js
Object.prototype.toString.call(data) // [object Object] [object Array]
```



## typeof null 是object

## 深拷贝与浅拷贝

知识点: 展开运算符是浅克隆

```js
const obj1 = {
   name: 'xxx'
}
const obj2 = {...obj1}
```

`object.assing({}, xx)` 也属于浅拷贝

最简单的深克隆方法，就是`JSON.parse(JSON.stringify())`，但是这个方法有个问题，就是如果遇到下面的情况，对于undefined的键值对会被直接删除掉。

其次，他无法克隆函数和正则对象，并且如果对象存在循环引用，会报错

```js
const obj1 = {
    name: undefined,
    sex: '男'
}
console.log(JSON.parse(JSON.stringify(obj1))) // { sex: '男' }
```

手写深克隆

```js
const deepClone = (data) => {
  if (typeof data !== 'object' || data === null) {
    // 非对象或者数组直接返回
    return data
  }
  let _cloneData = undefined
  if (Array.isArray(data)) {
    _cloneData = []
  } else {
    _cloneData = {}
  }
  // 最核心的地方在于for in 此方法可以循环对象也可以循环数组
  for (let key in data) {
    _cloneData[key] = deepClone(data[key])
  }

  return _cloneData
}
```

## apply， bind和call的区别

apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组arguments）的形式提供的参数。

apply( )方法传入两个参数：一个是作为函数上下文的对象，另外一个是作为函数参数所组成的数组。

call ()方法第一个参数也是作为函数上下文的对象，但是后面传入的是一个参数列表，而不是单个数组。 主要用于继承函数

apply和call会立即执行

bind不会

## 防抖与节流

```js
// 防抖 只执行最后一次
function debounce(fn, delay) {
  let timer = null
 return function () {
   if (timer) clearTimeout(timer)
   timer = setTimeout(() => {
    fn.apply(this, arguments)
    clearTimeout(timer)
    timer = null
   }, delay)
 }
}
// 节流 一段时间内只执行一次
function throttle(fn, delay) {
  let lock = false
  return function () {
    if (lock) return
    lock = true
    fn.apply(this, arguments)
    setTimeout(() => {
      lock = false
    }, delay)
  }
}
```

## cookie sessionstorage 和 localstorage的区别以及使用方法

#### cookie 和 session

cookie 和 session 都是普遍用来跟踪浏览用户身份的会话方式。

cookie被禁用了session也不可以使用了，因为session依赖的sessionid是放在cookie中的

#### cookie 和 session 区别

- cookie 数据存放在客户端，session 数据放在服务器端。
- cookie 本身并不安全，考虑到安全应当使用 session。
- session 会在一定时间内保存在服务器上。如果访问量比较大，会比较消耗服务器的性能。考虑到减轻服务器性能方面的开销，应当使用 cookie 。
- 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个域名最多保存 50 个 cookie。 将登陆信息等重要信息存放为 session、其他信息如果需要保留，可以放在 cookie 中。

在 web 本地存储场景上，cookie 的使用受到种种限制，最关键的就是存储容量太小和数据无法持久化存储。

| **分类**       | **生命周期**                                                 | **存储容量**                               | **存储位置**                               |
| -------------- | ------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| cookie         | 默认保存在内存中，随浏览器关闭失效（如果设置过期时间，在到过期时间后失效） | 4KB                                        | 保存在客户端，每次请求时都会带上           |
| localStorage   | 理论上永久有效的，除非主动清除                               | 4.98MB（不同浏览器情况不同，safari 2.49M） | 保存在客户端，不与服务端交互。节省网络流量 |
| sessionStorage | 仅在当前网页会话下有效，关闭页面或浏览器后会被清除。         | 4.98MB（部分浏览器没有限制）               | 保存在客户端，不与服务端交互。节省网络流量 |

## 一个页面中多个router-view如何实现

首先需要在路由定义中

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

## 作用域插槽

就是提供数据可供外界访问的插槽

在子组件中

```vue
// CenterLayout
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

等同于

```vue
<template slot="title" slot-scope="{row}">{{row.name}}</template>
```



## 冒泡排序 插入排序 快速排序

冒泡排序，相当于挨个对比

```js
for (let i=0; i< arr1.length - 1; i++) {
  for (let j = i+1; j <arr1.length -1; j++) {
    if (arr1[i] > arr1[j]) {
      let temp = arr1[i]
      arr1[i] = arr1[j]
      arr1[j] = temp
    }
  }
}
```

不知道是冒泡还是插入排序,，看起来像是冒泡排序,但确实是插入排序

```js
for (let i = 1; i< arr.length; i++) {
  for (let j = i; j > 0; j--) {
    if (arr[j] < arr[j - 1]) {
      let temp = arr[j]
      arr[j] = arr[j - 1]
      arr[j - 1] = temp
    } else{
        break
    }
  }
}
```

快速排序,简单来讲 也就是取一个值当中间值，然后获取他左右的数组，左右数组再次获取中间值，再此获取左右值，知道数组中

```js
function sort (arr) {
  // 递归的重点就在于找到什么时候return出去
  if (arr.length < 2) {
    return arr
  }
  // 取第一个值定为中间值
  const mid = arr[0]
  // 取小于中间值的数组
  const left = arr.slice(1).filter(item => item < mid)
  // 取大于中间值的数组
  const right = arr.slice(1).filter(item => item >= mid)
  // 然后对左右两边再进行相同的操作 得到最终结果 也就上递归
  return [...sort(left), mid, ...sort(right)]

}
```



## slice, splice

slice(start, end) 会返回对应位置的数组或者string，不会改变原数组。 只传一个值标识从这个地方截取到最后

splice则是对数组的增删改查

## watch 监听对象会有哪些问题，要怎么解决

监听对象时，newval会和oldval一样，这是因为对象是引用的

可以用computed来解决，computed中定义一个属性，然后序列化一下，再watch中监听这个computed的属性。

## 数组转树 树转数组 递归

递归函数的通解：首先找出最底层的逻辑 也就是需要return的逻辑 然后再写

树转数组

```js
// treeToArray
function treeToArray (data) {
  if (!data) return []
  let result = []
  data.map(item => {
    if (!item.children) {
      result.push(item)
    } else {
      const a = JSON.parse(JSON.stringify(item))
      delete a.children
      result.push(a, ...treeToArray(item.children))
    }
  })
  return result
}
```

高效的方法：一次循环进行的数组转树

```js
function array2Tree (data, father) {
  const result = []
  const itemMap = {}
  data.map(item => {
    itemMap[item.id] = { ...item, children: [] }
  })
  data.map(item => {
    const treeItem = itemMap[item.id]
    item.pid == father && result.push(treeItem)
    if (!itemMap[item.pid]) {
      itemMap[item.pid] = {
        children: []
      }
    }
    itemMap[item.pid].children.push(treeItem)
  })
  return result
}
```



## em和rem的区别

em是根据父元素来计算的，rem根据html的font-size来计算的 默认情况下1rem = 16px

## div居中的几种方式

基本结构

```html
    <div class="box">
      <div></div>
    </div>
```

> 第一种，具有宽高的父元素
>
> >```css
> >.box {
> >   height: 300px;
> >   width: 300px;
> >   background: red;
> >   position: relative;
> > }
> > .box > div {
> >   position: absolute;
> >   height: 100px;
> >   width: 100px;
> >   background: chartreuse;
> >   left: 100px;
> >   top: 100px;
> > }
> >```
> >
> >



> 第二种,不确定宽高的父元素
>
> >```css
> > .box {
> >   height: 300px;
> >   width: 300px;
> >   position: relative;
> > }
> > .box > div {
> >   height: 100px;
> >   width: 100px;
> >   position: absolute;
> >   left: 50%;
> >   top: 50%;
> >   transform: translate(-50%, -50%); //移动自身的百分之50
> > }
> >```
> >
> >



> 第三种,flex布局
>
> >```css
> > .box {
> >   height: 300px;
> >   width: 300px;
> >   background: red;
> >   display: flex;
> > }
> > .box > div {
> >   height: 100px;
> >   background: pink;
> >   width: 100px;
> >   margin: auto; //上下左右全自适应
> > }
> >```
> >
> >



> 第四种，flex居中
>
> >```css
> > .box {
> >   height: 300px;
> >   width: 300px;
> >   background: red;
> >   display: flex;
> >   justify-content: center; //子元素水平居中
> >   align-items: center;//子元素垂直居中
> > }
> > .box > div {
> >   height: 100px;
> >   background: pink;
> >   width: 100px;
> > }
> >```
> >
> >

## 路由守卫

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
    },
        
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

## vue中没有this的时候就是用箭头函数执行东西，回调函数会自动找到this

## vuex

**state** 仓库，用于存放东西

**getters** 用于过滤之类的

**mutation** 同步方法

**actions** 异步方法



## keep-alive

## 闭包

闭包是指有权访问另外一个函数作用域中的变量的函数。

## 原型链

# 原型和原型链

>  引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象 
>
>  你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 `prototype`）中寻找。 
>
>  引用类型：Object、Array、Function、Date、RegExp
>
>  
>
>  ```js
>  
>  const obj = {}
>  const arr = []
>  const fn = function () {}
>  
>  obj.a = 1
>  arr.a = 1
>  fn.a = 1
>  
>  console.log(obj.a) // 1
>  console.log(arr.a) // 1
>  console.log(fn.a) // 1
>  
>  ```
>
>  ```js
>  function name() {}
>  console.log(name.__proto__ === Function.prototype);
>  //类推
>  函数.__proto__ === Function.prototype
>  数组.__proto__ === Array.prototype
>  对象.__proto__ === Array.prototype
>  ```
>
>  原型链的个人理解
>
>  eg: 定义一个函数 `function a(){}`
>
>  因为a是函数 所以 `a.__proto__ === Function.prototype`
>
>  又因为`Function.prototype`是一个对象 所以可以推导出
>
>  `Function.prototype.__proto__ === Object.prototype`
>
>  所以就会逐层查找  这就是原型链



构造函数`function a(){}` 是有Function原型创建的 所以有prototype

用构造函数实例化出来的__proto__指向该构造函数的prototype

```js
var obj={
   prorA:'1234',
   methodB:function(){
   }
};
function Foo() {}
Foo.prototype= obj;
var foo = new Foo();
//函数对象的prototype属性指向的对象就是这个实例对象的原型对象，也就是__proto__指向的对象
console.log(foo.__proto__===obj);//true
console.log(Foo.prototype===obj);//true
console.log(Foo.prototype===foo.__proto__);//true
console.log(Foo.prototype.__proto__===Object.prototype);//true;
```

重要的 

构造函数`function a(){}`的prototype是属于自己的 并不指向Function.prototype     而是他的proto指向Function.prototype



new 出来的a（）的实例对象没有prototype

他的proto指向构造函数的prototype 和 函数.__proto__ === Function.prototype关系差不多

## addEventListener

## 事件委托

e.target

## 原型与原型链

每一个构造函数都有一个prototype,  prototype中的constructor又指回函数本身

根据构造函数new出来的实例，他没有prototype 但是有--ptoto-- 他指向构造函数的prototype,由此构成三角关系

## 构造函数 继承

常用的7中 原型链继承 构造函数继承 组合继承 原型式继承 寄生继承 寄生组合继承 class继承

**原型链继承**  子类prototype指向new 一个父类，就是原型链继承

优点：简单

缺点：属性共享，子类不能向父类传参

```js 
function Parent() {}
function Child() {}
Child.prototype = new Parent()
```

**借用构造函数继承**，也是经典继承    **没看懂**

构造函数就是个普通函数，直接调用时和普通函数没有区别，所以可以使用 apply()和 call()方法以新创建的对象（即new操作符调用子构造函数创建的那个对象）为上下文执行父类构造函数（以普通函数的形式）。

优点：避免共享，可以传参， 缺点：每次创建实例都会创造一遍方法

```js
function Parent(name) {}
function Child() {
    // 相当于把this绑定在这里 执行一遍父类的方法
    Parent.call(this, name)
}
```

**组合继承**，也就上原型链继承和构造函数继承组合的方法

最常用的，他又1和2的优点，缺点是调用了2次父节点的构造函数

```js
function Parent() {}
function Child() {
    Parent.call(this)
}
Child.prototype = new Parent()
// 因为prototype中的constructor又指回函数本身
Child.prototype.constructor = Child
```



原型式继承

```js
```

寄生式继承

```js
```

寄生组合式继承

**es6继承**

```js
class A {}
class B extend A {
    constructor () {
        super() 子类没有this,所以es6规范继承时必须调用super() 它指向父类的constructor
    }
}
```

## 重绘和回流

### 回流（Reflow）

当渲染树`render tree`中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为**回流(reflow)**。每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建`render tree`。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为**重绘**。

**简单来说，回流就是计算元素在设备内的确切位置和大小并且重新绘制**

**回流的代价要远大于重绘。并且回流必然会造成重绘，但重绘不一定会造成回流。**

### 重绘（Repaint）

当渲染树`render tree`中的一些元素需要更新样式，但这些样式属性只是改变元素的外观，风格，而不会影响布局的，比如`background-color`。则就叫称为**重绘(repaint)**。

**简单来说，重绘就是将渲染树节点转换为屏幕上的实际像素，不涉及重新布局阶段的位置与大小计算**

## BFC

简单来说就是，`BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用`BFC`呢，`BFC`可以看做是一个`CSS`元素属性

这里简单列举几个触发`BFC`使用的`CSS`属性

- overflow: hidden
- display: inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex

触发bfc可以解决flot，margin等脱离文档流导致高度塌陷的问题

## 微任务与宏任务

微任务与宏任务都属于异步任务

微任务-》宏任务-》微任务-》宏任务 就是事件循环

promise.then() 和 async/await是微任务

settimeout 之类的属于宏任务

## vue为什么使用异步渲染 nextTick

vue的异步渲染其实是将dom的更新操作放在微任务中，因为微任务优先于宏任务，所以代码中使用settimeout也可以获取最新的dom数据

而nexttick时注册一个回调函数放在微任务队列，所以要注意nexttick的位置

https://github.com/berwin/Blog/issues/22

## vue2和vue3的区别

## 路由跳转 点一次跳转两个页面

router.go(n)

## new操作符干了什么

首先创建一个新的空对象

然后将空对象的隐式原型指向构造函数的prototype

然后把构造函数的this设置为新对象中，执行一次

## 动态组件

<component :is="xx" />

## 双向绑定的原理

## promise是同步还是异步

promise是同步的 但是他的then是异步的 微任务

## Promise

**链式调用**

只要then中返回的是promise对象，就可以链式调用

```js
axios.get(url1)
	.then(res1 => {
  	return axios.get(url2)  
}).then(res2 => {
    xxx
}
```

**all**,等待都完成后返回一个数组包含所有结构

```js
promise.all(
    [
        //放每一个promise对象
    ]
)
```

**race**和all的执行一样，但是只返回最快返回的结构



## axios封装拦截的执行顺序

## 盒子的拖拽

## 跨域

前端就是jsonp和proxy

## 自定义指令

directive 和methods同级

bind, insterd, unbind, update, beforeupdate

## 父子，祖孙 通讯方式 兄弟组件除了bus还能用什么通信

```vue
provider () {

	return {
		xxx: 1

	}

}

injdect: ['xxx']
```

$bus

```js
Vue.prototype.$bus=new Vue();
$bus.$on
$bus.$off
$bus.$emit
```



## es6解构赋值怎么设置默认值

const { a = 1, b= 2} = xxx

## 自己封装v-model，以及原理



## commonjs和es6 的区别

require() 是复制文件，数值变化不会改变源文件

import是引用源文件，数值改变的话源文件也会变

## ajax和axios

**get**

原生ajax请求的四个步骤

第一步，创建xml对象

let xhr = new XMLHttpRequest()

第二部，打开对象

xhr.open('get', url)

第三步 发送数据

xhr.send();

第四步，接收数据并处理

xhr.onreadystatechange()

**post**

原生ajax请求的四个步骤

第一步，创建xml对象

let xhr = new XMLHttpRequest()

第二部，打开对象

xhr.open('get', url)

第三步 设置请求头

xhr.setRequestHeader()

第三步 发送数据

xhr.send();

第四步，接收数据并处理

xhr.onreadystatechange()

**xhr.abort()**可以取消本次请求

**axios**使用cancelToken可以取消请求，

```js
let cancel;
axios.get(url, {
    cancelToken: new CancelToken(function executor(c) {
        cancel = c
    })
})
cancel(); 取消请求
```

## 双向绑定的原理

在vue2中，通过object.defineProperty数据劫持以及组合了订阅发布模式来实现的

数据接触，发布订阅模式，组合起来
