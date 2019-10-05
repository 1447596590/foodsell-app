<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block" :class="{'active': ratingtype === 2}">
        {{desc.all}}{{ratings.length}}</span>
      <span @click="select(0,$event)" class="block positive" :class="{'active': ratingtype === 0}">
        {{desc.positive}}{{ratinggood}}</span>
      <span @click="select(1,$event)" class="block negative" :class="{'active': ratingtype === 1}">
        {{desc.negative}}{{ratings.length-ratinggood}}</span>
    </div>
    <div class="swith" :class="{'on':switchopen  === true}"  @click="turnswitch">
      <i class="icon-check_circle"></i>
      <span class="swith-text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
// const ALL = 2
export default {
  data () {
    return {
      switchopen: this.onlyContent,
      ratingtype: this.selecttype
    }
  },
  computed: {
    ratinggood () {
      let count = 0
      for (let i of this.ratings) {
        if (i.rateType === 0) { count++ }
      }
      return count
    }
  },
  methods: {
    turnswitch (event) {
      if (!event._constructed) {
        return
      }
      this.switchopen = !this.switchopen
      this.$emit('Onlycontent', this.switchopen)
    },
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.ratingtype = type
      this.$emit('sectype', this.ratingtype)
    }
  },
  props: {
    ratings: Array,
    selecttype: Number,
    onlyContent: true,
    desc: {
      type: Object,
      default: function () {
        return {
          all: '全部',
          negative: '吐槽',
          positive: '好评'
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.ratingselect
  background #fff
  .rating-type
    padding 18px 0
    margin 18px
    margin-bottom 0
    font-size 0
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      border-radius 1px
      font-size 12px
      background  rgba(0,160,220,0.2)
      &.active
        color #fff
        background  rgb(0,160,220)
      .count
        font-size 8px
        margin-left 2px
        line-height 16px
      &.positive
        color rgb(77,85,93,0.2)
        background rgba(0,160,220,0.2)
        &.active
          background rgb(0,160,220)
          color #fff
      &.negative
        background rgba(77,85,93,0.2)
        &.active
          background rgb(77,85,93)
  .swith
    padding 12px 18px
    line-height 24px
    font-size 0
    border-bottom 1px solid rbga(7,17,27,0.1)
    color rgb(147,153,139)
    &.on
      .icon-check_circle
        color #00c850
    .swith-text
      font-size 12px
      display inline-block
      vertical-align top
    .icon-check_circle
      font-size 24px
      margin-right 4px
      display inline-block
      vertical-align top
</style>
