<template>
  <div class="layout-main">
    <div class="box box1"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box box7"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>

<script>
  export default {
    name: 'Grid'
  }
</script>

<style scoped>
.layout-main {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-gap: 20px;
}
.layout-main .box {
  height: 100px;
  background: green;
}
.layout-main .box1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
.layout-main .box7 {
  grid-column-start: 2;
  grid-column-end: 4;
}
</style>