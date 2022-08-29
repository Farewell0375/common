/*
 * @Author: FHP
 * @Description: 配置文件
 * @Date: 2022-08-29 22:09:40
 * @LastEditTime: 2022-08-30 00:20:13
 */
module.exports = {
  title: 'Doc',
  description: '学习记录文档',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      {
        title: 'Promise 相关',   // 必要的
        path: '/Promise/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  }
}