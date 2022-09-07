<!--
 * @Author: FHP
 * @Description: 中间 上 中 下 布局
 * @Date: 2022-08-31 16:19:06
 * @LastEditTime: 2022-09-01 19:13:04
-->
<template>
  <div>
    <Btn />
   <Testa />
   <Testb />
  </div>
</template>

<script>
import Btn from '../vuexTest/btn.vue'
import Testa from '../vuexTest/testa.vue'
import Testb from '../vuexTest/testb.vue'

export default {
  name: 'CenterLayout',
  components: {
    Btn,
    Testa,
    Testb
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
