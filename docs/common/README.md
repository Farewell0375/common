 ## Vue中的常用写法
 ### 自动引入组件
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