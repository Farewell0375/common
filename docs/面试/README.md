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

## 冒泡排序 插入排序 快速排序

## watch 监听对象会有哪些问题，要怎么解决

## 数组转树 树转数组 递归

## em和rem的区别

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

## vuex

## keep-alive

## 闭包

## 原型链

## addEventListener

## 事件委托

## 构造函数 继承

## 轮播图

## 重绘和回流

## BFC

## 原型与原型链

## 微任务与宏任务