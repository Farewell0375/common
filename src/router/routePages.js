/*
 * @Author: FHP
 * @Description: 路由配置
 * @Date: 2022-08-30 19:52:48
 * @LastEditTime: 2022-08-31 14:56:40
 */
const routes = [
  {
    path: '/BaseLayout/sandBox',
    component: () => import('@/packages/BaseLayout/sandBox.vue')
  }
]
export { routes }
