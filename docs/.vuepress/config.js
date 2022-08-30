/*
 * @Author: FHP
 * @Description: 配置文件
 * @Date: 2022-08-29 22:09:40
 * @LastEditTime: 2022-08-31 00:08:54
 */
const sideMenu = require('./config/sideMenu.js')
console.log('[ sideMenu ] >', sideMenu)
module.exports = {
  title: 'Doc',
  description: '学习记录文档',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: sideMenu.map(item => {
      return {
        title: item.title,
        collapsable: false,
        sidebarDepth: 3,
        path: '',
        children: item.source.map(source => {
          return `/${source}/`
        }),
      }
    })
  }
}