/*
 * @Author: FHP
 * @Description: 模拟vue双向绑定
 * @Date: 2022-09-03 14:26:16
 * @LastEditTime: 2022-09-05 19:16:49
 */
// 发布者
class Dep {
  constructor () {
    this.sub = []
  }
  addSub (wathcer) {
    this.sub.push(wathcer)
  }
  notify () {
    this.sub.forEach(watcher => {
      watcher.update()
    })
  }
}
// 订阅者
class Watcher {
  // 对象 key值 回调函数
  constructor (data, key, callback) {
    this.data = data
    this.key = key
    this.callback = callback
  }
  update () {
    this.callback(this.data[this.key])
  }
}
const obj = {
  name: 'fhp',
  job: 'web'
}
// 实例化发布者和订阅者
const dep = new Dep()

// 数据劫持
for (let key in obj) {
  let val = obj[key]
  Object.defineProperty(obj, key, {
    get () {
      return val
    },
    set (newVal) {
      val = newVal
      // dep.notify()
    }
  })
}
const render = (obj) => {
  for (let key in obj) {
    const val = obj[key]
    document.querySelector(`.${key}`).innerHTML = val
  }
}
render(obj)