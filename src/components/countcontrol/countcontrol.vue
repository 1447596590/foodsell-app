<template>
  <div class="count-control">
    <div class="add" @click="addToCar">
      <i class="icon-add_circle"></i>
    </div>
    <div class="count" v-show="currentCount>0">{{currentCount}}</div>
    <transition name="fade">
      <div class="decrease" @click="removeFormCar" v-show="currentCount>0">
          <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    currentCount () {
      if (this.$store.state.CountInCar) {
        return this.$store.state.goodsInCar.get(this.food)
      }
    }
  },
  props: {
    food: {}
  },
  methods: {
    addToCar () {
      if (!event._constructed) {
        return
      }
      this.$store.commit('addCountToCar')
      this.$store.commit('addGoodsToCar', this.food)
    },
    removeFormCar () {
      if (!event._constructed) {
        return
      }
      this.$store.commit('remvoeGoodsFromCar', this.food)
      this.$store.commit('delCountToCar')
    }
  }
}
</script>

<style lang="stylus">
.fade-enter-active
  transition opacity .3s ease
.fade-leave-active
  transition opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter,.fade-leave-to
  transform translateX(10px)
  opacity 0
.count-control
  display flex
  flex-direction row-reverse
  font-size 24px
  width 72px
  .decrease
    display inline-block
  .count
    display inline-block
    text-align center
    width 24px
    font-size 10px
    line-height 32px
  .add
    display inline-block
    color rgb(0,160,220)
</style>
