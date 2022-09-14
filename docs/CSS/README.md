## 布局
开发中常用布局属性只有两种，就是`Flex`和`Grid`，`float`属性在开发中几乎已经被淘汰。
`Flex`与`Grid`的区别在于`Flex`用于一维的布局，而`Grid`常用于二维的布局(网格布局)。
## Flex布局与特殊属性

### justify-content相关属性
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd5174e622b34fa692547d691faa592d~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?)
#### `space-around`和`space-evenly`
`space-around`布局和`space-evenly`布局都是做的居中均分剩余空隙间距的布局方式，且这两种排序方式中，各个元素之间的距离都是完全一致的。
他们唯一的区别就是：
:::tip
在`space-around`布局方式中，第一个元素到开头的距离(78px)和最后一个元素到末尾的距离(78px)将会是各个相邻元素之间距离（156px）的一半。（156 / 2 = 78px）

在`space-evenly`布局方式中，第一个元素到开头的距离(113px)和最后一个元素到末尾的距离(113x)将会和各个相邻元素之间的距离(113px)保持完全相等。（都是113px）
:::
#### `stretch`
`stretch`也比较好理解，他的含义是：自动拉伸子元素，直到铺满父容器为止。这里有2点需要强调下，很多新手都很容易忽略：

自动拉伸的元素只针对`width`为`auto`的元素，如果宽度设置了指定的`with`，`stretch`将会失效。
自动拉伸的元素会受到`max-height/max-width`的约束，利用这个特性我们可以更自由的组合元素，做到更个性化的拉伸效果。
### 子元素的特殊属性

#### `flex-gow`
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

#### `flex-shrink`
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

#### `flex-basis`
表示在flex items 被放入flex容器之前的大小，也就是items的理想或者假设大小，但是并不是其真实大小，其真实大小取决于flex容器的宽度，flex items的min-width,max-width等其他样式。

#### `flex`
`flex`属性是 `flex-grow、flex-shrink、flex-basis`的简写，默认为 0，1，auto。
::: warning
经常会问到`flex`取值的问题？

`flex: 0;` 即为`flex:0 1 0%;`表示`flex-grow`是0，`flex-shrink`是1，所以`flex:0`元素会缩小但不会扩展，在加上`flex-basis:0%`表示建议支持是0，因此，设置`flex:0`的元素的最终尺寸表现为最小内容宽度。

`flex: none;` 即为`flex: 0 0 auto`表示`flex-grow`是0，`flex-shrink`是0，`flex-basis`是auto,所以元素既不会扩展也不会收缩，然后`flex-basis`是auto代表尺寸由内容决定，由于元素不具有弹性也就不会换行，最终表现为最大内容宽度。

`flex：1;` 即为 `flex: 1 1 0%`, `flex：auto;` 即为 `flex: 1 1 auto`, 只有`flex-basis`不同,这两种具体表现形式为，元素尺寸可以弹性增大，也可以弹性减小，在`flex:1 `时在尺寸不足时会优先最小化尺寸，`flex:auto`在尺寸不足时优先最大化内容尺寸。
:::
## Grid布局与常用属性
Grid中的属性不多，并且不常提及，因此只做展示用法。

<Grid />

**实现代码**
```vue
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
```

## em和rem的区别

em是根据父元素来计算的，rem根据html的font-size来计算的 默认情况下1rem = 16px

## div居中的几种方式

基本结构

```html
    <div class="box">
      <div></div>
    </div>
```

> 第一种，具有宽高的父元素
>
> >```css
> >.box {
> >   height: 300px;
> >   width: 300px;
> >   background: red;
> >   position: relative;
> > }
> > .box > div {
> >   position: absolute;
> >   height: 100px;
> >   width: 100px;
> >   background: chartreuse;
> >   left: 100px;
> >   top: 100px;
> > }
> >```
> >
> >



> 第二种,不确定宽高的父元素
>
> >```css
> > .box {
> >   height: 300px;
> >   width: 300px;
> >   position: relative;
> > }
> > .box > div {
> >   height: 100px;
> >   width: 100px;
> >   position: absolute;
> >   left: 50%;
> >   top: 50%;
> >   transform: translate(-50%, -50%); //移动自身的百分之50
> > }
> >```
> >
> >



> 第三种,flex布局
>
> >```css
> > .box {
> >   height: 300px;
> >   width: 300px;
> >   background: red;
> >   display: flex;
> > }
> > .box > div {
> >   height: 100px;
> >   background: pink;
> >   width: 100px;
> >   margin: auto; //上下左右全自适应
> > }
> >```
> >
> >



> 第四种，flex居中
>
> >```css
> > .box {
> >   height: 300px;
> >   width: 300px;
> >   background: red;
> >   display: flex;
> >   justify-content: center; //子元素水平居中
> >   align-items: center;//子元素垂直居中
> > }
> > .box > div {
> >   height: 100px;
> >   background: pink;
> >   width: 100px;
> > }
> >```