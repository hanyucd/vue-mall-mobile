<template>
  <div id="cart">
    <section class="navbar">
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    </section>
    <!-- 清空购物车 -->
    <section class="cart-title">
       <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </section>
     <!--购物车商品-->
    <ul class="cart-list" v-if="cartList.length !== 0">
      <li class="cart-item" v-for="goods of cartList" :key="goods.ID">
        <section class="goods-img"><img :src="goods.IMAGE1" width="100%" height="100%" :onerror="errorImg" alt="" /></section>
        <section class="goods-text">
          <div class="goods-name">{{ goods.NAME }}</div>
          <div class="goods-control">
            <van-stepper v-model="goods.COUNT"></van-stepper>
          </div>
        </section>
        <section class="goods-price">
          <div>￥ {{ goods.ORI_PRICE }}</div>
          <div>x {{ goods.COUNT }}</div>
          <div class="all-price">￥ {{ (goods.ORI_PRICE * goods.COUNT).toFixed(2) }}</div>
        </section>
      </li>
    </ul>
     <!-- 计算总价 -->
     <div class="pay">
      <section class="pay-money"><span style="color: black;">合计：</span>￥{{ totalMoney }}</section>
      <section class="pay-btn" @click="pay">付款</section>
     </div>
  </div>
</template>

<script>
  import { fetchCartInfo } from '@/api';
  import { Url } from '@/api/url';
  
  export default {
    name: 'Cart',
    data() {
      return {
        cartList: [],
        isEmpty: false,
        errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
      }
    },
    computed: {
      // 计算总价
      totalMoney() {
        let allMoney = 0;
        this.cartList.forEach(item => {
          allMoney += (item.ORI_PRICE * item.COUNT);
        });
        return allMoney.toFixed(2);
      }
    },
    created() {
      this._getCartInfo();
    },
    methods: {
      /**
       * 获取购物车数据
       */
      async _getCartInfo() {
        let method = 'get';
        let path = Url.cartInfoApi;

        try {
          let res = await fetchCartInfo(path, method);
          this.cartList = res.result;
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
      clearCart() {
      },
      pay() {
        this.$toast.fail('暂不支持支付');
      }
    }
  }
</script>

<style scoped>
  #cart {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 26.5vw;
    background: #f0f0f0;
    overflow: scroll;
  }
  .cart-title {
    height: 3rem;
    line-height: 3rem;
    text-align: right;
    background: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
  }
  .cart-list {
    background: #fff;
  }
  .cart-item {
    display: flex;
    flex-wrap: nowrap;
    padding: .5rem;
    font-size: .85rem;
    border-bottom: 1px solid #E4E7ED;
  }
  .goods-img {
    flex: 0 0 30%;
    border: 1px solid #eaeaea;
    box-shadow: 0 0.533vw 2.133vw #f0f1f2;
  }
  .goods-text {
    flex: 0 0 50%;
    display: flex;
    box-sizing: border-box;
    padding-left: 5.333vw;
    justify-content: space-around;
    flex-direction: column;
  }
  .goods-price {
    flex: 0 0 20%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  .all-price {
    color: red;
    font-weight: 600;
  }
  .pay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 13.5vw;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e4e7ed;
  }
  .pay-money {
    flex: 1;
    padding: .5rem;
    color: red;
    font-weight: 700;
  }
  .pay-btn {
    width: 30vw;
    height: 13vw;
    line-height: 13vw;
    text-align: center;
    color: #fff;
    font-weight: blod;
    font-size: 1.2rem;
    background: #07C160;
  }
</style>