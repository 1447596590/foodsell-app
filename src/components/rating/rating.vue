<template>
    <div class="ratings-content" ref="ratingscro">
        <div class="rating-scroll">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周围商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <starr class="starr" :size='36' :score="seller.serviceScore"></starr>
                        <span class="title">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <starr class="starr" :size='36' :score="seller.foodScore"></starr>
                        <span class="title">{{seller.foodScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect v-on:Onlycontent="setonlycontent" v-on:sectype="settype" :desc='desc' :ratings='ratings'></ratingselect>
            <div class="rating-wrapper">
              <ul>
                <li class="ratingitem" v-for="rating in ratings" :key="rating.ids" v-show="!(onlyContent&&!rating.text)&&(rating.rateType===selecttype||selecttype===2)">
                  <div class="avatar-content">
                    <img class="avatar" :src="rating.avatar" width="24" height="24" alt="">
                  </div>
                  <div class="content">
                    <h1 class="username">{{rating.username}}</h1>
                    <div class="star-wrapper">
                      <starr :size='24' :score='rating.score'></starr>
                      <span class="rating-delivery"></span>
                    </div>
                    <div class="ratingtime">{{timeTrans(rating.rateTime)}}</div>
                    <p class="ratingtext">{{rating.text}}</p>
                    <div class="recommand">
                      <i class="rating-icon" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1,}"></i>
                      <span class="recommandgoods" v-for="good in rating.recommend" :key="good.id">{{good}}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import starr from '../starr/starr'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import axios from 'axios'
export default {
  data () {
    return {
      onlyContent: false,
      selecttype: 0,
      ratings: [],
      desc: {
        all: '全部',
        negative: '满意',
        positive: '不满意'
      }
    }
  },
  props: {
    seller: {}
  },
  created () {
    axios.get('static/data.json').then(
      (response) => {
        this.ratings = response.data.ratings
        this.$nextTick(() => {
          if (!this.ratscroll) {
            this.ratscroll = new Bscroll(this.$refs.ratingscro, { click: true })
          } else {
            this.ratscroll.refresh()
          }
        })
      }
    )
  },
  methods: {
    settype (type) {
      this.selecttype = type
    },
    setonlycontent (openswitch) {
      this.onlyContent = openswitch
    },
    timeTrans (time) {
      let date = new Date(time)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()) + ' '
      let h = ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
      let transTime = Y + M + D + h + m
      return transTime
    }
  },
  components: {
    starr,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus">
  .ratings-content
    position absolute
    width 100%
    top 174px
    height 496px
    overflow hidden
    .rating-scroll
      z-index 1
      .overview
        display flex
        padding 18px 0
        .overview-left
          flex 0 0 137px
          width 137px
          border-right 1px solid rgba(7,17,27,0.1)
          text-align center
          .score
            margin-bottom 6px
            line-height 28px
            font-size 24px
            color rgb(255,153,0)
          .title
            line-height 12px
            font-size 12px
            color rgb(7,17,27)
            margin-bottom 8px
          .rank
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
        .overview-right
          padding-left 24px
          .score-wrapper
            margin-bottom 8px
            .title
              display inline-block
              font-size 12px
              color rgb(7,17,27)
            .starr
              display inline-block
              margin 0 12px
              vertical-align top
            .time
              margin-left 12px
      .rating-wrapper
        position relative
        padding 0 18px
        .ratingitem
          flex 1
          list-style-type none
          display flex
          margin-bottom 20px
          .avatar-content
            display inline-block
            img
              border-radius 50%
          .content
            vertical-align top
            display inline-block
            flex 1
            padding 0 18px
            .username
              vertical-align top
              line-height 22px
              font-size 10px
              color rgb(7,17,27)
              display inline-block
            .star-wrapper
              display block
              vertical-align top
            .ratingtime
              font-size 12px
              color rgb(147,157,158)
            .ratingtext
              margin-bottom 8px
              line-height 18px
              color rgb(7,17,27)
              font-size 12px
            .recommand
              line-height 16px
              .rating-icon
                display inline-block
                margin 0 8px 4px 0
                font-size 14px
                vertical-align top
              .recommandgoods
                display inline-block
                overflow hidden
                padding 0 6px
                border 1px solid rgb(7,17,27)
                border-radius 1px
                color rgb(147,157,158)
                background #fff
                font-size 5px
</style>
