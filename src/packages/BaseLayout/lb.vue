<!--
 * @Author: FHP
 * @Description: 轮播图的逻辑
 * @Date: 2022-09-01 21:23:22
 * @LastEditTime: 2022-09-01 22:07:33
-->
<template>
  <div class="mainbox">
    <div class="box">
      <ul class="silder">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
    <button @click="left">左边</button>
    <button @click="right">右边</button>
  </div>
</template>

<script>
  export default {
    name: 'lb',
    methods: {
      left () {

      },
      right () {
        const ulel = document.querySelector('.silder')
        console.log('[ ulel.style.marginLeft ] >', ulel.style.marginLeft)
      }
    }
  }
</script>

<style lang="less" scoped>
.mainbox {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    height: 300px;
    width: 500px;
    background: #e8e8e8;
  }
  .silder {
    list-style: none;
    height: 300px;
    width: 2000px;
    padding: 0;
    margin: 0;
    li {
      width: 500px;
      height: 300px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
  }
}
</style>