# Javascript相关
## JS中的七种数据类型
在 JavaScript 规范中，共定义了七种数据类型，分为 “基本类型” 和 “引用类型” 两大类，如下所示：
- 基本数据类型：`Number`、`String`、`Boolean`、`Null`、`Undefined`、`Symbol`
- 引用数据类型: `Object`

## 如何判断一个对象是否是数组
最方便的就是调用toString方法，然后判断返回值是否为[object Array]，但是这种方法有一个缺点，就是如果页面中重写了Object的toString方法，那么这种方法就不适用了。所以我们可以使用ES5中新增的Array.isArray()方法来判断一个对象是否是数组，这个方法的兼容性很好，IE9+、Firefox4+、Safari5+、Opera10.5+、Chrome都支持。
```js
Object.prototype.toString.call(data)
```
对象类型为 `[object Object]`,数组类型为 `[object Array]`

:::warning
`typeof` 不能判断对象类型，只能判断基本数据类型

`typeof null` 的结果为 `object`
:::

## 深拷贝与浅拷贝

知识点: 展开运算符是浅拷贝

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

**手写深克隆**

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

## apply、bind、call的区别
- 三种方法都是用来改变函数的this对象的指向的。

- apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组arguments）的形式提供的参数。

- apply()方法传入两个参数：一个是作为函数上下文的对象(也就上this)，另外一个是作为函数参数所组成的数组。

- call()方法第一个参数也是作为函数上下文的对象(也就上this)，但是后面传入的是一个参数列表，而不是单个数组。 主要用于继承函数。
```js
function func (a,b,c) {}

func.call(obj, 1,2,3)
// func 接收到的参数实际上是 1,2,3

func.call(obj, [1,2,3])
// func 接收到的参数实际上是 [1,2,3],undefined,undefined
```

- apply和call会立即执行，bind不会。

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
**cookie和session**
- cookie 和 session 都是普遍用来跟踪浏览用户身份的会话方式。

- cookie被禁用了session也不可以使用了，因为session依赖的sessionid是放在cookie中的。
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

## 常用的排序算法

**冒泡排序**，相当于挨个对比
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
**快速排序**,简单来讲 也就是取一个值当中间值，然后获取他左右的数组，左右数组再次获取中间值，再此获取左右值,最后合并数组
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

- slice(start, end) 会返回对应位置的数组或者string，不会改变原数组。 只传一个值标识从这个地方截取到最后

- splice则是对数组的增删改查

## 数组转树 树转数组 递归

**递归函数的通解：首先找出最底层的逻辑 也就是需要return的逻辑 然后再写**
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
**数组转树-递归**
```js
function arr2tree (treeData, pid) {
  const tree = []
  treeData.map(item => {
    if (item.pid === pid) {
      tree.push({
        ...item,
        children: arr2tree(treeData, item.id)
      })
    }
  })
  return tree
}
```

**高效的方法：一次循环进行的数组转树**

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

## 闭包

闭包是指有权访问另外一个函数作用域中的变量的函数。

## 原型和原型链

>  引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象 
>
>  你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 `prototype`）中寻找。 
>
>  引用类型：Object、Array、Function、Date、RegExp
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

:::warning
- 构造函数`function a(){}`的prototype是属于自己的 并不指向Function.prototype,而是他的proto指向Function.prototype。
- new 出来的a（）的实例对象没有prototype
- 他的proto指向构造函数的prototype 和 函数.__proto__ === Function.prototype关系差不多
- 每一个构造函数都有一个prototype,  prototype中的constructor又指回函数本身
- 根据构造函数new出来的实例，他没有prototype 但是有--ptoto-- 他指向构造函数的prototype,由此构成三角关系
:::


## addEventListener

## 事件委托
e.target

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
        super() // 子类没有this,所以es6规范继承时必须调用super() 它指向父类的constructor
    }
}
```

## new操作符干了什么

首先创建一个新的空对象

然后将空对象的隐式原型指向构造函数的prototype

然后把构造函数的this设置为新对象中，执行一次

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

## commonjs和es6 的区别

require() 是复制文件，数值变化不会改变源文件

import是引用源文件，数值改变的话源文件也会变

## ajax和axios

**get**

原生ajax请求get的四个步骤
```js
// 第一步，创建xml对象
let xhr = new XMLHttpRequest()
// 第二部，打开对象
xhr.open('get', url)
// 第三步 发送数据
xhr.send();
// 第四步，接收数据并处理
xhr.onreadystatechange()
```
**post**
原生ajax请求post的四个步骤
```js
// 第一步，创建xml对象
let xhr = new XMLHttpRequest()
// 第二部，打开对象
xhr.open('get', url)
// 第三步 设置请求头
xhr.setRequestHeader()
// 第三步 发送数据
xhr.send();
// 第四步，接收数据并处理
xhr.onreadystatechange()
```


## 取消请求
**xhr.abort()** 可以取消本次请求

**axios** 使用cancelToken可以取消请求
```js
let cancel;
axios.get(url, {
    cancelToken: new CancelToken(function executor(c) {
        cancel = c
    })
})
cancel(); 取消请求
```