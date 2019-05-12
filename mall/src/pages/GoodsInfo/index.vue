<template>
  <div id="goodsInfo">
    <section class="navbar-nav">
      <van-nav-bar title="商品信息" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    </section>
    <section class="top-image">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </section>
    <section class="goods-price">￥{{ goodsInfo.PRESENT_PRICE }}</section>
    <section class="goods-name">{{ goodsInfo.NAME }}</section>
    <section class="goods-tabs">
      <van-tabs sticky animated swipeable>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">
          <div style="text-align: center;">评论区...</div>
        </van-tab>
      </van-tabs>
    </section>
    <section class="goods-bottom">
      <van-button class="btn" plain size="large" type="primary" @click="appendToCart">加入购物车</van-button>
      <van-button class="btn" plain size="large" type="danger" @click="purchase">直接购买</van-button>
    </section>
  </div>
</template>

<script>
  import { fetchGoodsInfoData, addToCart } from '@/api';
  import { Url } from '@/api/url';

  export default {
    name: 'GoodsInfo',
    data() {
      return {
        goodsInfo: {}
      };
    },
    created() {
      let goodsId = this.$route.query.goodsId;
      this._getGoodsInfo(goodsId);
    },
    methods: {
      async _getGoodsInfo(goodsId) {
        let method = 'get';
        let path = Url.goodsDetailInfoApi;
        
        try {
          let res = await fetchGoodsInfoData(path, method, { goodsId });
          this.goodsInfo = res.result;
        } catch (error) {
          (error.code === 404) && this.$toast.fail(error.message);
        }
      },
      /**
       * 添加商品到购物车
       */
      async appendToCart() {
        let method = 'post';
        let path = Url.addGoodsToCartApi;
        let goodsId = this.goodsInfo.ID;
        try {
          let res = await addToCart(path, method, { goodsId });
          console.log(res)
        } catch (error) {
          console.log(error);
        }
      },
      purchase() {}
    }
  }
</script>

<style scoped>
  #goodsInfo {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f0f0f0;
    z-index: 200;
    overflow: scroll;
  }
  .goods-name {
    background: #fff;
    text-align: center;
  }
  .goods-price {
    text-align: center;
    background: #fff;
    padding: 0 .5rem;
    color: #f00;
    font-weight: bold;
  }
  .detail {
    font-size: 0;
  }
  .goods-tabs {
    margin-bottom: 80px;
  }
  .goods-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    display: flex;
  }
  .goods-bottom > .btn {
    flex: 1;
    margin: 1rem;
  }
</style>