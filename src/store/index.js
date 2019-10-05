import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    CountInCar: 0,
    // this.$store.state.count
    goodsInCarMoney: 0,
    goodsInCar: new Map(),
    beSelectFood: {
      name: String,
      ratings: []
    },
    beSelectFoodRatingCount: 0
  },
  getters: {
    totalMoney: state => {
      let total = 0
      if (state.CountInCar) {
        for (let [item, count] of state.goodsInCar) {
          total += item.price * count
        }
        return total
      }
      return state.CountInCar
    }
  },
  mutations: {
    cleanCar (state) {
      state.CountInCar = 0
      state.goodsInCar.clear()
    },
    test (state) {
      state.count++
    },
    selectRatingCount (state, count) {
      state.beSelectFoodRatingCount = count
    },
    selectFood (state, food) {
      state.beSelectFood = food
    },
    addCountToCar (state) {
      state.CountInCar++
    },
    delCountToCar (state) {
      state.CountInCar--
    },
    addGoodsToCar (state, good) {
      if (state.goodsInCar.has(good)) {
        let count = state.goodsInCar.get(good)
        state.goodsInCar.set(good, ++count)
      } else {
        state.goodsInCar.set(good, 1)
      }
    },
    remvoeGoodsFromCar (state, good) {
      let count = state.goodsInCar.get(good)
      state.goodsInCar.set(good, --count)
    }
  },
  actions: {
    addFun (context) {
      context.commit()
    }
  }
})

export default store
