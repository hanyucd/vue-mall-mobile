<template>
  <div class="shop-cart">
    <top-bar title="购物车"></top-bar>

    <div class="shop-cart-container">
      <!-- 空购物车 或者 未登录 -->
      <article v-if="!loadingStatus && !shopCartList.length" class="empty-cart">
        <section class="cart-wrapper">
          <img class="cart-img" :src="cartImg" />
        </section>
        <section class="desc">{{ userToken ? '您的购物车还是空空的哦' : '请先登录噢~~' }}</section>
        <section class="go-shop" v-if="userToken" @click="$router.push({ name: 'Home' })">去购物</section>
        <section class="login-btn" v-else @click="$router.push({ name: 'Login' })">去登录</section>
      </article>

      <!-- 购物车内容 -->
      <b-scroll class="content-scroll" v-if="shopCartList.length" :data="shopCartList">
        <div class="container">
          <section class="header">
            <p class="text">共<span class="mark">3</span>件商品</p>
            <p class="text">管理</p>
          </section>
          <!-- 商品列表 -->
          <ul>
            <li class="goods" v-for="item of shopCartList" :key="item.goodsId">
              <section>
              </section>
            </li>
          </ul>
        </div>
      </b-scroll>

      <!-- 加载状态 -->
      <loading :loadingStatus="loadingStatus"/>
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'Cart',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll },
    data() {
      return {
        shopCartList: [], // 购物车列表
        cartImg: require('@/assets/imgs/shop.png'), // 购物车图片
      }
    },
    created() {
      this._checkShopCart();
    },
    methods: {
      /**
       * 查询购物车数据
       */
      async _checkShopCart() {
        if (!this.userToken) {
          this.loadingStatus = false;
          return;
        }
        
        try {
          const resResult = await ajax.checkShopCart();
          if (resResult.code === 200) {
            // this.shopCartList = resResult.shopCartList;
            this.loadingStatus = false;
          }
        } catch(error) {
          this.loadingStatus = false;
          console.log(error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>