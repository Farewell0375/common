<!--
 * @Author: FHP
 * @Description: 沙盒
 * @Date: 2022-08-31 14:55:15
 * @LastEditTime: 2022-08-31 23:30:58
-->
<template>
<div @click="divClick" style="margin-left: 300px">123</div>
</template>

<script>
import { throttle } from './util'
export default {
  name: 'sandBox',
  components: {
  },
  methods: {
    divClick: throttle(() => {
      console.log('[ 11 ] >', 11)
    }, 2000)
  }
}
</script>

<style scoped>

</style>
