<!--
 * @Author: FHP
 * @Description: 入口
 * @Date: 2022-08-25 22:51:29
 * @LastEditTime: 2022-08-31 15:18:41
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="less">
body,html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
