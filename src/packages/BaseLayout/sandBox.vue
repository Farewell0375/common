<!--
 * @Author: FHP
 * @Description: 沙盒
 * @Date: 2022-08-31 14:55:15
 * @LastEditTime: 2022-09-01 21:23:58
-->
<template>
  <div>
    <lb />
  </div>
</template>

<script>
import lb from './lb'
export default {
  name: 'sandBox',
  components: {
    lb
  },
  data () {
    return {
      list: [
        {
          id: '1',
          name: 'x1'
        },
        {
          id: '2',
          name: 'x2'
        },
        {
          id: '3',
          name: 'x3'
        },
        {
          id: '4',
          name: 'x4'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
