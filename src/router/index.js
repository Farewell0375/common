/*
 * @Author: FHP
 * @Description:路由
 * @Date: 2022-08-29 22:13:56
 * @LastEditTime: 2022-08-31 14:59:41
 */
import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routePages'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})
export default router
