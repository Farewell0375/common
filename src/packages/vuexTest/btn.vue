<!--
 * @Author: FHP
 * @Description: 按钮页面
 * @Date: 2022-09-01 19:07:08
 * @LastEditTime: 2022-09-01 19:16:07
-->
<template>
  <div>
    <button @click="mClick">增加</button>
  </div>
</template>

<script>
  export default {
    name: 'btn',
    methods: {
      mClick () {
        this.$store.commit('increment')
      }
    }
  }
</script>