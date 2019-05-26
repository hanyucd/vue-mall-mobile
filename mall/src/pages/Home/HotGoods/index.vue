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
  $color:#b532e9;

  #hot-goods {
    .title {
      background: #EDEDED;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: $color;
      font-size: 15px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #eee;
      .hot-goods-item {
        width: calc(((1 / 2) * 100%) - 1px);
        margin-right: 1px;
        text-align: center;
        margin-top: 1px;
        background: #fff;
        padding-bottom: 5px;
        overflow: hidden;
        .hot-goods-img { width: 80% }
      }
      .name {
        font-size: 14px;
        padding: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        color: $color;
        .code { font-size: 13px; }
        .mall-price {
          font-size: 15px;
          color: $color;
          font-weight: 700;
        }
        .min-price {
          font-size: 12px;
          text-decoration: line-through;
          color: #999;
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
  }
</style>