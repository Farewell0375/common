/* eslint-disable */
/*
 * @Author: FHP
 * @Description: 测试
 * @Date: 2022-08-31 23:22:10
 * @LastEditTime: 2022-09-01 09:02:44
 */
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
export { debounce, throttle }