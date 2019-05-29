<template>
  <ul>
    <li v-for="item of goodsList" :key="item._id || item.id" class="goods-item" @click="goGoodsDetails(item)">
      <section class="left-img">
        <img v-lazy="item.image" />
      </section>
      <section class="right-txt">
        <p class="goods-name"></p>
      </section>
    </li>
  </ul>
</template>

<script>
  import { GoodsMixin } from '@/mixins/goodsMixin';
  
  export default {
    name: 'GoodsList',
    mixins: [ GoodsMixin ],
    props: {
      goodsList: { type: Array, default: () => [] }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>