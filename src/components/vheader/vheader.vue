<template>
    <div class="vheader">
        <div class="vhead-content">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="vcontent">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail()">
                <span class="count">{{supportsNumber}}个</span><i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="detail-btm" @click="showDetail()">
            <span class="bull-title"></span>
            <span class="bull-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background-img">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
        <div class="detail" v-if="detailShow">
            <div class="detail-content">
                <div class="name-star">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star"><star :size="48" :score="seller.score"></star></div>
                </div>
                <div class="title">
                    <span class="line"></span>
                    <span class="text">优惠信息</span>
                    <span class="line"></span>
                </div>
                <div class="supports" v-if="seller.supports">
                    <div class="support-item" v-for="(item,index) in seller.supports" v-bind:key="index">
                        <span class="icon" :class="iconClassMap[item.type]"></span><span class="text">{{item.description}}</span>
                    </div>
                </div>
                <div class="title">
                    <span class="line"></span>
                    <span class="text">商家公告</span>
                    <span class="line"></span>
                </div>
                <div class="seller-bulletin">{{seller.bulletin}}</div>
            </div>
            <div class="detail-close">
                <i class="icon-close" @click="hideDetail()"></i>
            </div>
        </div>
    </transition>
    </div>
</template>

<script>
import star from '../starr/starr'
export default {
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    seller: Object
  },
  created () {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  computed: {
    supportsNumber () {
      return this.seller.supports.length
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.vheader
  position relative
  background rgba(7,17,27,0.5)
  color white
  overflow hidden
  blur 10px
  .vhead-content
    position relative
    display flex
    padding 20px 10px 20px
    height 64px
    .avatar
      border-radius 2px
    .vcontent
      margin-left 15px
      height 64px
      .title
        position relative
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image("brand")
          background-size 100% 100%
          background-repeat no-repeat
        .name
          vertical-align top
          margin-left 10px
          font-size 16px
          line-height 18px
          font-weight bold
      .delivery
        display inline-block
        vertical-align middle
        font-size 12px
      .supports
        display block
        margin-top 8px
        font-size 12px
        line-height 12px
        .icon
          display inline-block
          vertical-align top
          margin-right 4px
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.special
            bg-image('special_1')
          &.invoice
            bg-image('invoice_1')
          &.guarantee
            bg-image('guarantee_1')
        .text
          display inline-block
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      width 40px
      border-radius 14px
      background-color rgba(0,0,0,0.2)
      text-align center
      .count
        font-size 10px
        vertical-align top
      .icon-keyboard_arrow_right
        font-size 10px
        margin-left 2px
        line-height 24px
  .detail-btm
    position relative
    background-color rgba(7,17,27,0.2)
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    .bull-title
      display inline-block
      vertical-align top
      margin-top 8px
      width 22px
      height 12px
      bg-image("bulletin")
      background-size 100% 100%
      background-repeat no-repeat
    .bull-text
      letter-spacing 1px
      font-size 10px
      vertical-align middle
      margin 0 4px
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 8px
  .background-img
    position absolute
    top 0
    right 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    top 0
    left 0
    background rgba(7,17,27,0.8)
    width 100%
    height 100%
    z-index 100
    overflow auto
    backdrop-filter blur(10px)
    .detail-content
      min-height 100%
      width 100%
      .name-star
        margin-top 40px
        margin-bottom -10px
        .name
          font-size 16px
          font-weight 700
          width 100%
          color white
          line-height 16px
          text-align center
        .star
          margin 16px 11px 28px 0
          text-align center
      .title
        margin 0 auto 24px auto
        display flex
        width 80%
        .line
          display inline-block
          flex 1
          height 1px
          background-color rgba(255,255,255,0.2)
          margin auto
        .text
          font-size 14px
          padding 0 12px
          font-weight 700
      .supports
          padding 0 0 28px 36px
          .support-item
            padding 0 6px 12px 16px
            .icon
              display inline-block
              vertical-align middle
              margin-right 4px
              width 12px
              height 12px
              background-size 12px 12px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.special
                bg-image('special_2')
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
            .text
              font-size 12px
              font-weight 200
              color white
              line-height 12px
      .seller-bulletin
        padding 0 48px
        font-size 12px
        font-weight 200
        color white
        line-height 24px
    .detail-close
      width 32px
      height 32px
      margin -10px auto
      font-size 32px
      color rgba(255,255,255,0.5)
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 1s
  }
  &.fade-enter, &.fade-leave-to {
    opacity: 0
  }
</style>
