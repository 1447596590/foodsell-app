<template>
  <div class="detailshow" v-show="showflag">
    <div class="food-detail" ref="food">
      <div class="food-detail-content">
        <div class="image-header">
          <img :src="beselectfood.image" :alt="beselectfood.name">
          <div @click="backto" class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{beselectfood.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{beselectfood.sellCount}}份</span>
            <span class="good-rate">{{beselectfood.rating}}%</span>
          </div>
          <div class="price">
            <span class="newPrice">￥{{beselectfood.price}}</span>
            <span v-show="beselectfood.oldPrice" class="oldPrice">￥{{beselectfood.oldPrice}}</span>
          </div>
          <div class="countcontrol-wrapper">
            <countcontrol :count = "1" :food = "beselectfood" :fooddetailcount = "hasgoods" v-show="hasgoods"></countcontrol>
          </div>
          <div class="addtocar" v-show="!hasgoods" @click="addtocar">
            <span>加入购物车</span>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="titile">商品介绍</h1>
          <p class="food-info">{{beselectfood.info}}</p>
        </div>
        <split></split>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect v-on:Onlycontent="setonlycontent" v-on:sectype="settype" :ratings='beselectfood.ratings' :selecttype='selecttype' :onlyContent='onlyContent'></ratingselect>
        </div>
        <div class="ratings-wrapper">
            <ul>
              <li class="ratings-item" v-for="rating in beselectfood.ratings" :key="rating.id" v-show="!(onlyContent&&!rating.text)&&(rating.rateType===selecttype||selecttype===2)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12" alt="">
                </div>
                <div class="ratingtime">{{timeTrans(rating.rateTime)}}</div>
                <p class="text">
                  <i class="raticon" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1,}"></i>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="beselectfood.raings"></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import countcontrol from '../countcontrol/countcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

// const POSITIVE = 0
// const NEGATIVE = 1
// const ALL = 2
// 传入子组件的值不要是子组件的值的属性引用，会产生_ob__:observer属性 不能读取输出
export default {
  data () {
    return {
      showflag: false,
      carhave: 0,
      carhas: false,
      selecttype: 0,
      onlyContent: true,
      ratings: this.beselectfood.ratings,
      desc: {
        all: '全部',
        negative: '吐槽',
        positive: '好评'
      }
    }
  },
  props: {
    beselectfood: {
      ratings: []
    }
  },
  computed: {
    needshow (type, text) {
      return function () {
        if (this.onlyContent && !text) {
          //  console.log('没有内容没有only' + this.onlyContent + text)
          return false
        }
        if (this.selecttype === 2) {
          console.log('查看所有')
          return true
        } else {
          console.log('看好坏')
          return type === this.selecttype
        }
      }
    },
    hasgoods () {
      if (this.$store.state.CountInCar) {
        return this.$store.state.goodsInCar.get(this.beselectfood)
      }
      return false
    }
  },
  methods: {
    timeTrans (time) {
      let date = new Date(time)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()) + ' '
      let h = ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
      let transTime = Y + M + D + h + m
      return transTime
    },
    settype (type) {
      this.selecttype = type
    },
    setonlycontent (openswitch) {
      this.onlyContent = openswitch
    },
    addtocar () {
      if (!event._constructed) {
        return
      }
      this.carhas = true
      this.$store.commit('addCountToCar')
      this.$store.commit('addGoodsToCar', this.beselectfood)
    },
    show () {
      this.showflag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.food, { click: true })
        } else {
          this.scroll.refresh()
          console.log(this.$refs.food.clientHeight)
        }
      })
    },
    backto () {
      this.showflag = false
    }
  },
  components: {
    countcontrol,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus">
.food-detail
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 15
  width 100%
  background #fff
  .food-detail-content
    position relative
    .image-header
      width 100%
      position relative
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      position relative
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
      .detail
        margin-bottom 18px
        line-height 10px
        .good-rate
          font-size 10px
          color rgb(147,153,159)
        .sell-count
          margin-right 12px
          font-size 10px
          color rgb(147,153,159)
      .price
        font-weight 700
        line-height 24px
        .newPrice
          margin-right 8px
          font-size 14px
          color rgb(240,20,20)
        .oldPrice
          text-decoration line-through
          font-size 10px
      .addtocar
        position absolute
        right 18px
        bottom 18px
        z-index 16
        height 24px
        line-height 24px
        padding 0 12px
        font-size 10px
        box-sizing border-box
        border-radius 12px
        color #fff
        background rgb(0,160,220)
      .countcontrol-wrapper
        position absolute
        right 18px
        bottom 18px
    .info
      padding 18px
      background #fff
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7,17,27)
      .food-info
        padding 6px 8px 0px 8px
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
        line-height 24px
    .ratings
      background #fff
    .ratings-wrapper
      padding 0 18px
      height 200px
      .ratings-item
        position relative
        padding 16px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        .user
          position absolute
          right 0
          top 16px
          font-size 0
          line-height 12px
          .name
            display inline-block
            vertical-align top
            font-size 10px
            color rgb(147,153,159)
          .avatar
            border-radius 50%
        .ratingtime
          margin-bottom 6px
          line-height 12px
          font-size 10px
          color: rgb(147,153,156)
        .text
          line-height 16px
          font-size 12px
          font-wight 700
          color rgb(7,17,27)
          .raticon
            margin-right 6px
            line-height 24px
            font-size 12px
</style>
