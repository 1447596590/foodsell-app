<template>
  <div id="app">
      <vheader :seller="seller"></vheader>
      <div class="tab" style="border-bottom:1px solid green">
    <div class="tab-item">
      <router-link to='/goods'>商品</router-link></div>
    <div class="tab-item">
      <router-link to='/ratings'>评论</router-link></div>
    <div class="tab-item">
      <router-link to='/seller'>商家</router-link></div>
  </div>
  <keep-alive>
    <router-view :seller="seller"/>
  </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import vheader from '@/components/vheader/vheader'
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    axios.get('static/data.json').then(
      (response) => {
        this.seller = response.data.seller
        console.log(this.seller)
      }
    )
  },
  components: {
    vheader
  }
}
</script>

<style>
@import url('./common/style');
  .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  }
  .tab-item{
  flex: 1;
  text-align: center;
  }
  a{
    display: block;
    text-decoration: none;
  }
  .router-link-active{
    color: red;
  }
</style>
