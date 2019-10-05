<template>
  <div class="shopcar">
    <div class="shopcart-list" v-show="!fold">
      <div class="head">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="cleanlist">清空</span>
      </div>
      <div class="scrollcontent" ref="carscroll">
        <div class="list-content">
          <ul>
            <li class="food" v-for="carfood in selectfoods" :key="carfood.id" v-show="carfood[1]">
              <div class="food-item">
                <span class="name">{{carfood[0].name}}</span>
                <div class="price">
                  <span>￥{{carfood[1] * carfood[0].price}}</span>
                </div>
              </div>
              <div class="carcontrol-wrapper">
                <countcontrol class="countcontrol" :food='carfood[0]'></countcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content" @click="togglelist">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:countInCar>0}" >
            <i class="icon-shopping_cart" :class="{highlight:countInCar>0}"></i>
          </div>
            <div class="totalCount">{{countInCar}}</div>
        </div>
        <div class="price" :class="{highlight:totalMoney>0}" >￥{{totalMoney}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{highlight:totalMoney>=minPrice}">
        <span class="detail" v-show="totalMoney<minPrice">￥还差{{havemoney}}起送</span>
        <span class="detail-ready" v-show="totalMoney>=minPrice">去结算</span>
        </div>
    </div>
  </div>
</template>
<script>
import countcontrol from '../countcontrol/countcontrol'
import Bscroll from 'better-scroll'
export default {
  data () {
    return {
      selectfoods: this.$store.state.goodsInCar,
      fold: true,
      goodcount: this.$store.state.CountInCar
    }
  },
  props: {
    minPrice: 0,
    deliveryPrice: 0
  },
  methods: {
    togglelist () {
      if (this.$store.state.CountInCar > 0) {
        this.fold = !this.fold
        console.log(this.countInCar)
      }
    },
    cleanlist () {
      console.log('clean it!')
      this.$store.commit('cleanCar')
    }
  },
  watch: {
    countInCar: function () {
      if (this.countInCar < 1) {
        this.fold = true
        return false
      } else {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.carscroll, { click: true })
          } else {
            this.scroll.refresh()
          }
        })
        return true
      }
    }
  },
  computed: {
    havemoney: function () {
      return this.minPrice - this.totalMoney
    },
    countInCar: function () {
      return this.$store.state.CountInCar
    },
    totalMoney: function () {
      if (this.$store.state.CountInCar === 0) {
        return 0
      }
      return this.$store.getters.totalMoney + this.deliveryPrice
    }
  },
  components: {
    countcontrol
  }
}
// goods组件内没有APP内穿过来的seller，所以需要有APP将seller传到路由里面(包括goods组件)
</script>

<style lang="stylus">
.shopcar
  position fixed
  left 0
  bottom 0
  z-index 99
  width 100%
  height 48px
  background #141d27
  .content
    display flex
    .content-left
      flex 1
      z-index 100
      &:after
        content ''
        height 100%
        display inline-block
        vertical-align middle
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        border-radius 50%
        background #141d27
        text-align center
        vertical-align top
        .logo
          display inline-block
          font-size 24px
          border-radius 50%
          background rgba(0,0,0,0.2)
          height 100%
          width 100%
          &.highlight
            background rgb(0,160,220)
          .icon-shopping_cart
            line-height 56px
            color rgba(255,255,255,0.4)
            &.highlight
              color #fff
        .totalCount
          position absolute
          width 24px
          height 16px
          top 0
          right 0
          text-align center
          border-radius 16px
          font-size 9px
          color #fff
          background rgb(240,20,20)
          box-shadow 0 4px 8px rgba(0,0,0,0.4)
          line-height 16px
      .price
        display inline-block
        font-size 16px
        line-height 24px
        box-sizing border-box
        vertical-align top
        margin-top 12px
        padding-right 12px
        border-right 1px solid rgba(255,255,255,0.4)
        color rgba(255,255,255,0.4)
        &.highlight
          color #fff
      .desc
        display inline-block
        font-size 10px
        box-sizing border-box
        line-height 24px
        vertical-align top
        margin-top 12px
        margin-left 12px
        color rgba(255,255,255,0.4)
    .content-right
      flex 0 0 105px
      background rgba(255,255,255,0.4)
      font-size 12px
      font-weight 700
      line-height 48px
      display inline-block
      text-align center
      &.highlight
        background green
      .detail
        margin 0 auto
        display inline-block
      .detail-ready
        color #fff
        font-weight 800
  .shopcart-list
    position absolute
    top 0
    left 0
    width 100%
    z-index 5
    transform translate(0,-100%)
    transition all 0.5s
    &.fold-transition
      transition all 0.5s
      transform translate(0, -100%)
    &.fold-enter,&.fold-leave
      transform translate3d(0, 0, 0)
    .back-black
      position fixed
      width 100%
      height 100%
      z-index 2
      background rgba(7,17,27,0.8)
    .head
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7,17,27,0.1)
      .title
        float left
        font-size 14px
        color rgb(7,17,27)
      .empty
        float right
        font-size 12px
        color rgb(0,160,220)
    .scrollcontent
      max-height 270px
      overflow hidden
      background #fff
      .list-content
        padding 0 18px
        background #fff
        overflow hidden
        .food
          list-style-type none
          position relative
          padding 12px 0
          display flex
          .food-item
            position relative
            box-sizing border-box
            display inline-block
            flex-grow 1
            vertical-align center
            .name
              line-height 32px
              font-size 14px
              color rgb(7,17,27)
              vertical-align top
            .price
              vertical-align top
              margin-right 10px
              float right
              right 90px
              bottom 12px
              line-height 32px
              color red
              font-size 14px
              font-weight 700
          .carcontrol-wrapper
            vertical-align center
            display inline-block
            float right
</style>
