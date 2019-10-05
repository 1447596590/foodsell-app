<template>
    <div class="scroll-seller" ref="sellerr">
        <div class="seller-content">
            <div class="seller-overview">
                <h1 class="seller-title">{{seller.name}}</h1>
                <div class="seller-desc">
                    <starr class="star" :size="36" :score="seller.score"></starr>
                    <span class="seller-text">{{seller.ratingCount}}</span>
                    <span class="seller-text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="seller-remark">
                    <li class="seller-block">
                        <h2>起送价</h2>
                        <div class="block-content">
                            <span class="block-text">{{seller.minPrice}}</span>  元
                        </div>
                    </li>
                    <li class="seller-block">
                        <h2>商家配送</h2>
                        <div class="block-content">
                            <span class="block-text">{{seller.deliveryPrice}}</span> 元
                        </div>
                    </li>
                    <li class="seller-block">
                        <h2>平均配送时间</h2>
                        <div class="block-content">
                            <span class="block-text">{{seller.deliveryTime}}</span> 分钟
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告和活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
            </div>
            <div class="seller-support">
                <div class="supports" v-if="seller.supports">
                    <div class="support-item" v-for="(item,index) in seller.supports" v-bind:key="index">
                        <span class="icon" :class="iconClassMap[item.type]"></span><span class="text">{{item.description}}</span>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="pic">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picscroll">
                    <ul ref="inner">
                        <li class="pic-item" v-for="pic in seller.pics" :key="pic.id"  width="120" height="90">
                            <img :src="pic" alt="unload">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="seller-info">
                <h1>商家信息</h1>
                <ul>
                    <li class="info" v-for="info in seller.infos" :key="info.id">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import starr from '../starr/starr'
import split from '../split/split'
import axios from 'axios'
export default {
  data () {
    return {
      seller: {
        pics: []
      }
    }
  },
  created () {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios.get('static/data.json').then(
      (response) => {
        this.seller = response.data.seller
        this.$nextTick(() => {
          this.Scroll = new Bscroll(this.$refs.sellerr, { click: true })
        })
      }
    )
  },
  ready () {
    this._initScroll()
  },
  methods: {
  },
  components: {
    starr,
    split
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
li
  list-style-type none
.seller-content
  position relative
  height auto
.scroll-seller
  position absolute
  width 100%
  top 174px
  height 496px
  overflow hidden
  .seller-overview
    padding 18px 0
    margin 0 18px
    .seller-title
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
    .seller-desc
      padding-bottom 18px
      line-height 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .star
        display inline-block
        margin-right 8px
        vertical-align top
      .seller-text
        margin-right 12px
        display inline-block
        vertical-align top
        font-size 10px
    .seller-remark
      display flex
      padding-top 18px
      .seller-block
        flex 1
        text-align center
        display inline-block
        border-right 1px solid rgba(7,17,27,0.1)
        &:last-child
          border none
        h2
          margin-bottom 4px
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
        .block-content
          line-height 24px
          font-size 10px
          color rgb(7,17,27)
        .block-text
          font-size 24px
  .bulletin
    padding 18px 18px 0 18px
    .title
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
    .content-wrapper
      padding 0 12px 16px 12px
    .content
      font-size 12px
      line-height 24px
      color rgb(240,20,20)
  .seller-support
    padding 18px 18px 18px 18px
    .supports
      display block
      margin-top 8px
      font-size 12px
      line-height 12px
      .icon
        display inline-block
        vertical-align top
        margin-right 4px
        width 24px
        height 24px
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
        display inline-block
  .pic
    padding 18px 18px 0 18px
    .pic-wrapper
      width 100%
      overflow hidden
      white-space nowrap
      .pic-item
        display inline-block
        margin-right 6px
        width 120px
        height 90px
        margin-right 6px
    h1
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
  .seller-info
    padding 18px 18px 0 18px
    h1
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
    .info
      font-size 12px
      font-weight 200
      color rgb(7,17,27)
      line-height 16px
      padding 16px 12px
      border-bottom 1px solid rgba(7,17,28,0.1)
      &:last-child
        border none
</style>
