<template>
  <div class=stars :class="className">
    <span v-for="state in statesArr" :key="state.id" class="star-item" :class="state"></span>
  </div>
</template>

<script>
export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    className () {
      return 'star-' + this.size
    },
    statesArr () {
      let onNumber = Math.floor(this.score)
      let halfNumber = Math.round(this.score - onNumber)
      let offNumber = 5 - onNumber - halfNumber
      let stars = []
      for (let i = 0; i < onNumber; i++) { stars.push('on') }
      if (halfNumber) { stars.push('half') }
      for (let i = 0; i < offNumber; i++) { stars.push('off') }
      return stars
    }
  }
}
</script>

<style lang="stylus">
bg-image($url)
  background-image: url('img/'+$url+'@2x.png')
  @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
    background-image: url('img/'+$url+'@3x.png')
  }
.stars
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-24
    .star-item
      width 10px
      height 10px
      background-size 100% 100%
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        bg-image("star24_on")
      &.half
        bg-image("star24_half")
      &.off
        bg-image("star24_off")
  &.star-36
    .star-item
      width 10px
      height 10px
      background-size 100% 100%
      margin-right 6px
      &:last-child
        margin-right 0
      &.on
        bg-image("star36_on")
      &.half
        bg-image("star36_half")
      &.off
        bg-image("star36_off")
  &.star-48
    .star-item
      width 10px
      height 10px
      background-size 100% 100%
      margin-right 22px
      &:last-child
        margin-right 0
      &.on
        bg-image("star48_on")
      &.half
        bg-image("star48_half")
      &.off
        bg-image("star48_off")
</style>
