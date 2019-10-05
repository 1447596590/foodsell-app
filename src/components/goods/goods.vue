<template>
    <div class="goods-content">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul class="goods-list">
            <li v-for="(n,index) in goods" :key="n.name" class="menu-item" :class="{current:currentIndex === index}" @click="selectList(index,$event)">
                <span class="text">
                    <span v-show="n.type>0" class="icon" :class="iconClassMap[n.type]"></span>{{n.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="good-wrapper" ref="foodWrapper">
        <ul>
            <li v-for="i in goods" :key="i.id" class="food-list food-list-hook" style="list-style-type: none">
                <h1 class="title">{{i.name}}</h1>
                <ul>
                    <li @click="selectfood(food,$event)" v-for="food of i.foods" :key="food.id" class="food-item">
                        <div class="icon">
                            <img width="57" height="57"  :src="food.icon">
                        </div>
                        <div class="content">
                            <h2 class="food-name">{{food.name}}</h2>
                            <p class="food-description">{{food.description}}</p>
                            <div class="extra">
                                <span class="food-count">月卖{{food.sellCount}}份</span>
                                <span class="food-rate">好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="newPrice">￥{{food.price}}</span>
                                <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="countWrapper" @click.stop>
                              <countcontrol class="count-control" :food = 'food'></countcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcar :deliveryPrice = "seller.deliveryPrice" :minPrice = "seller.minPrice"></shopcar>
    <fooddetail ref="fooddetail" :beselectfood = "beselectfood"></fooddetail>
    </div>
</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
import shopcar from '../shopcar/shopcar'
import countcontrol from '../countcontrol/countcontrol'
import fooddetail from '../fooddetail/fooddetail'
export default {
  data () {
    return {
      goods: {},
      listHight: [],
      scrollY: 0,
      beselectfood: {
        ratings: []
        // 当对象类型数据传入子组件时，在父组件要定义在子组件中需要使用此对象的属性
      }
    }
  },
  props: {
    seller: Object
  },
  computed: {
    currentIndex () {
      // 动态绑定，当scrollY变化时，重新计算此函数，重新返回对应的i标签
      for (let i = 0; i < this.listHight.length; i++) {
        let heightPre = this.listHight[i]
        let heightBih = this.listHight[i + 1]
        if (!heightBih || (this.scrollY >= heightPre && this.scrollY < heightBih)) {
          return i
        }
        // 不要再写else了！！！
      }
      return 0
    }
  },
  created () {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios.get('static/data.json').then(
      (response) => {
        this.goods = response.data.goods
        this.$nextTick(() => {
          this._initScroll()
          this._computedHeight()
        })
        // Vue实例Create前DOM并未生成，所以需要调用$nextTick()
        // axios是拿到数据的过程是异步的，想要拿到渲染出来的DOM
      }
    )
  },
  methods: {
    childback (flag) {
      this.detailflag = flag
    },
    selectfood (food, event) {
      if (!event._constructed) {
        return
      }
      this.beselectfood = food
      this.$store.commit('selectFood', food)
      this.detailflag = true
      this.$refs.fooddetail.show()
    },
    selectList (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = document.getElementsByClassName('food-list-hook')
      let jumpIndex = foodList[index]
      this.foodScroll.scrollToElement(jumpIndex, 300)
    },
    _initScroll () {
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, { click: true })
      this.foodScroll = new Bscroll(this.$refs.foodWrapper, { probeType: 3, click: true })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _computedHeight () {
      let foodList = document.getElementsByClassName('food-list-hook')
      // 计算页面高度,food-list-hook是左边的每个标签栏在右边对应的内容
      // foodList返回一个对象，里面是左边的每个标签DOM
      let height = 0
      this.listHight.push(height)
      // 第一个标签的位置当然是0
      for (let i of foodList) {
        height = height + i.clientHeight
        // 累加后的高度，累加的每个阶段对应标签所在的位置,第一个标签的高度对应第二个标签的坐标位置
        this.listHight.push(height)
      }
    }
  },
  components: {
    shopcar,
    countcontrol,
    fooddetail
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.goods-content
  display flex
  position absolute
  top 173px
  bottom 46px
  width 100%
  overflow hidden
  .back-black
    display fixed
    background rgba(7,17,27,0.8)
    left 0
    height 0
    width 100%
    height 100%
    z-index 30
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .goods-list
      background #DCDCDC
      .menu-item
        display table
        height 54px
        width 54px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          font-weight 800
          background #fff
          border none
        .icon
          display inline-block
          vertical-align top
          margin-right 4px
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.special
            bg-image('special_3')
          &.invoice
            bg-image('invoice_3')
          &.guarantee
            bg-image('guarantee_3')
        .text
          text-align center
          font-size 12px
          display table-cell
          vertical-align middle
  .good-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      &:last-child
        padding-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        position relative
        .food-name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .food-description
          margin-bottom 8px
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
        .extra
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
        .countWrapper
          position absolute
          bottom 0
          right 0
          .food-count
            margin-right 12px
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
</style>
