<template>
<!-- eslint-disable -->
  <a-layout class="ptp-layout" :class="{ 'is-compose': !compose, 'no-space': !layoutSpace, 'no-space-top': noSpaceTop }">
    <div class="ptp-layout-content">
      <div
        v-if="!conTopHide"
        class="ptp-layout-top"
        :class="{
          'is-lr_ele': $slots.contentTopLeft ||  $slots.contentTopRight
        }"
      >
        <div class="ptp-ctslot-left" v-if="$slots.contentTopLeft">
          <slot name="contentTopLeft"></slot>
        </div>
        <div class="ptp-ctslot-right" v-if="$slots.contentTopRight">
          <slot name="contentTopRight"></slot>
        </div>
        <slot name="contentTop" v-if="$slots.contentTop && (!$slots.contentTopLeft &&  !$slots.contentTopRight)"></slot>
      </div>
      <div class="ptp-layout-main" :class="{ 'no-mp': noMainPadding}">
        <slot name="contentMain">
          <div></div>
        </slot>
      </div>
      <div v-if="!noBottom" class="ptp-layout-bottom"
           :class="{
          'is-lr_ele': $slots.contentBottomLeft ||  $slots.contentBottomRight
        }">
        <slot name="contentBottom" v-if="$slots.contentBottom && (!$slots.contentBottomLeft && !$slots.contentBottomRight)"></slot>
        <div class="ptp-cbslot-left" v-if="$slots.contentBottomLeft">
          <slot name="contentBottomLeft"></slot>
        </div>
        <div class="ptp-cbslot-right" v-if="$slots.contentBottomRight">
          <slot name="contentBottomRight"></slot>
        </div>
      </div>
    </div>
    <slot></slot>
  </a-layout>
</template>
<script>
export default {
    name: 'middleConLayout',
    props: {
        compose: Boolean,
        space: {
            type: Object,
            default: () => ({
                col: '8',
                row: '0'
            })
        },
        layoutSpace: {
            default: true
        },
        layoutPadding:  {
            default: true
        },
        noMainPadding: Boolean,
        noBottom: Boolean,
        conTopHide: Boolean,
        noSpaceTop: Boolean
    },
    data() {
        return {
            typeArr: ['TabsPages'],
            cacheSlot: ''
        }
    },
    computed: {
        getSlots() {
            return this.$slots.contentTopRight
        }
    },
    watch: {
        getSlots(n) {
            console.log(n)
        }
    },
    beforeUpdate() {
        // this.setSpace()
    },
    mounted() {
      /* eslint-disable */
        // this.setSpace()
        // this.cacheSlot = this.$slots.contentMain[0].tag.match(/(\w)+$/g)
    },
    methods: {
        setSpace() {
            if(this.$slots.contentTopLeft && this.$slots.contentTopLeft.length) {
                this.$slots.contentTopLeft.forEach(item => {
                    if(item.componentInstance) {
                        let unit = 'px'
                        if(/(\d+)(px|vh|vw|rem)/g.test(this.space.col)) {
                            unit = ''
                        }
                        item.componentInstance.$el.style.marginRight = (this.space.col || '0') + unit
                    }
                })
            }
            if(this.$slots.contentTopRight && this.$slots.contentTopRight.length) {
                this.$slots.contentTopRight.forEach(item => {
                    if(item.componentInstance) {
                        let unit = 'px'
                        if(/(\d+)(px|vh|vw|rem)/g.test(this.space.col)) {
                            unit = ''
                        }
                        item.componentInstance.$el.style.marginLeft = (this.space.col || '0') + unit
                    }
                })
            }
        }
    }
}
</script>
<style lang="less">
  @padding: 20px; // 设置内容的边距
  @bottomHeight: 40px;
  @space: 8px; // 按钮的间距

  .ptp-layout {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    background: transparent;
  }
  .ptp-layout.is-compose {
    padding-right: 10px;
  }
  .ptp-layout.no-space {
    padding: 0;
    border-left: 1px solid #e8e8e8;
  }
  .ptp-layout.no-space .ptp-layout-content {
    border-radius: 0;
  }
  .ptp-layout .ptp-layout-content {
    display: flex;
    flex: auto;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /*background: #ffffff;*/
    border-radius: 6px 0 0 6px;
  }
  .ptp-layout.is-compose .ptp-layout-content{
    border-radius: 6px 6px 0 0;
  }
  .ptp-layout .ptp-layout-content .ptp-layout-top {
    flex: 0 0 auto;
    position: relative;
    width: 100%;
    height: 54px;
    padding: 0 @padding;
    line-height: 54px;
    margin-bottom: 10px;
    background: #FFFFFF;
    border-radius: 6px 0 0 6px;
  }
  .ptp-layout .ptp-layout-top.is-lr_ele {
    display: flex;
  }
  .ptp-layout .ptp-layout-top .ptp-ctslot-left {
    display: flex;
    align-items: center;
  }
  .ptp-layout .ptp-ctslot-left > * {
    margin-right: @space;
  }
  .ptp-layout .ptp-layout-top .ptp-ctslot-right {
    position: absolute;
    right: @padding;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .ptp-layout .ptp-ctslot-right > * {
    margin-left: @space;
  }
  .ptp-layout .ptp-layout-content .ptp-layout-main {
    flex: auto;
    width: 100%;
    height: 100%;
    overflow: auto;
    /*padding: 10px;
    padding-top: 4px;*/
    background: #FFFFFF;
    border-radius: 4px 0 0 0;
  }
  .ptp-layout .ptp-layout-content .ptp-layout-main.no-mp {
    padding: 0;
  }
  .ptp-layout .ptp-layout-content .ptp-layout-bottom {
    flex: 0 0 auto;
    position: relative;
    width: 100%;
    height: @bottomHeight;
    line-height: @bottomHeight;
    padding: 0 @padding;
    background: #FFFFFF;
  }
  .ptp-layout .ptp-layout-content .ptp-layout-bottom.is-lr_ele {
    display: flex;
    height: calc(@bottomHeight + 1px);
    border-top: 1px solid #f5f5f5;
  }
  .ptp-layout .ptp-layout-bottom .ptp-cbslot-left {
    height: @bottomHeight;
  }
  .ptp-layout .ptp-layout-bottom .ptp-cbslot-right {
    position: absolute;
    right: @padding;
    height: @bottomHeight;
  }
  .ptp-layout.no-space-top .ptp-layout-content .ptp-layout-top {
    margin-bottom: 0;
  }
  .ptp-layout.no-space-top .ptp-layout-content .ptp-layout-top {
    border-radius: 0;
  }
  .ptp-layout.no-space-top .ptp-layout-content .ptp-layout-main {
    border-radius: 0;
  }
  .main-con .ptp-layout {
    padding-left: 0;
  }
  @media screen and (min-width: 1400px) {
    @bottomHeight: 40px;
    @fontSize: 14px;
    .ptp-layout .ptp-layout-content .ptp-layout-bottom {
      height: @bottomHeight;
      line-height: @bottomHeight;
      font-size: @fontSize;
    }
    .ptp-layout .ptp-layout-content .ptp-layout-bottom.is-lr_ele {
      height: calc(@bottomHeight + 1px);
      font-size: @fontSize;
    }
    .ptp-layout .ptp-layout-bottom .ptp-cbslot-left {
      height: @bottomHeight;
      font-size: @fontSize;
    }
    .ptp-layout .ptp-layout-bottom .ptp-cbslot-right {
      height: @bottomHeight;
      font-size: @fontSize;
    }
    .ptp-layout .ptp-layout-bottom .ptp-cbslot-right /deep/ * {
      font-size: @fontSize;
    }
  }
</style>
