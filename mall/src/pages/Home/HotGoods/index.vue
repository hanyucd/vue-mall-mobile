<template>
  <div id="hot-goods">
    <section class="title">
      <span class="name">热卖商品</span>
    </section>
    <ul>
      <li class="hot-goods-item" v-for="item of hotGoods" :key="item.goodsId" @click="goGoodsDetails(item)">
        <img v-lazy="item.image" class="hot-goods-img" />
        <p class="name">{{ item.name }}</p>
        <p class="price">
          <span class="code">￥</span>
          <span class="mall-price">{{ item.mallPrice }}</span>
          <span class="min-price">{{ item.price }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { GoodsMixin } from '@/mixins/goodsMixin';

  export default {
    name: 'HotGoods',
    mixins: [ GoodsMixin ],
    props: {
      hotGoods: { type: Array, default: () => [] }
    },
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>