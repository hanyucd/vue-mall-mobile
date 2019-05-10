<template>
  <div>
    <section class="navbar">
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    </section>
    <!-- 清空购物车 -->
    <section class="cart-title">
       <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </section>
     <!--购物车商品-->
    <ul class="cart-list" v-if="cartInfo.length !== 0">
      <li class="cart-item" v-for="goods of cartInfo" :key="goods.goodsId">
        <section class="goods-img"><img :src="goods.image" width="100%" height="100%" alt="" /></section>
        <section class="goods-text">
          <div class="goods-name">{{ goods.name }}</div>
          <div class="goods-control">
            <van-stepper v-model="goods.count"></van-stepper>
          </div>
        </section>
        <section class="goods-price">
          <div>￥ {{ goods.price }}</div>
          <div>x {{ goods.count }}</div>
          <div class="all-price">￥ {{ (goods.price * goods.count).toFixed(2) }}</div>
        </section>
      </li>
    </ul>
     <!-- 计算总价 -->
     <section class="total-money"><span style="color: black;">商品总价：</span>￥{{ totalMoney }}</section>
  </div>
</template>

<script>
  const cartInfoKey = "__CARTINFOKEY__";

  export default {
    name: 'Cart',
    data() {
      return {
        cartInfo: [],
        isEmpty: false
      }
    },
    computed: {
      totalMoney() {
        let allMoney = 0;
        this.cartInfo.forEach(item => {
          allMoney += (item.price * item.count);
        });
        localStorage.setItem(cartInfoKey, JSON.stringify(this.cartInfo));
        return (allMoney).toFixed(2);
      }
    },
    created() {
      this._getCartInfo();
    },
    methods: {
      _getCartInfo() {
        if (localStorage.getItem(cartInfoKey)) {
          this.cartInfo = JSON.parse(localStorage.getItem(cartInfoKey));
        }
        this.isEmpty = this.cartInfo.length > 0 ? true : false;
      },
      clearCart() {
        localStorage.removeItem(cartInfoKey);
        this.cartInfo = [];
      },
    }
  }
</script>

<style scoped>
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
  }
  .goods-text {
    flex: 0 0 50%;
    display: flex;
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
  .total-money {
    background: #fff;
    text-align: right;
    padding: .5rem;
    border-bottom: 1px solid #e4e7ed;
    color: red;
    font-weight: 700;
  }
</style>