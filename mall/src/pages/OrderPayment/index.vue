<template>
  <div class="order-payment">
    <top-bar title="确认订单" hasBack outOrder v-on:outOrderEvt="outOrderEvt"></top-bar>

    <!-- 收货地址 -->
    <section class="address-container">
      <div class="adress no-address">
        <van-icon name="add-o" />
        <span>点击添加收货地址</span>
      </div>
      <!-- 彩条 -->
      <div class="colour-bar"></div>
    </section>

    <b-scroll class="content-scroll" v-if="orderPaymentList.length">
      <goods-list :goodsList="orderPaymentList" :isOrderPaymentList="true"></goods-list>
    </b-scroll>
    <!-- 底部提交支付 -->
    <section class="submit-order">
      <div class="total-price">
        <p class="text">共<span class="mark">{{ orderPaymentList.length }}</span>件，</p>
        <span>合计：</span>
        <span class="money">￥{{ totalPrice }}</span>
      </div>
      <div class="submit-btn">提交点单</div>
    </section>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import GoodsList from '@/components/GoodsList';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'OrderPayment',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll, GoodsList },
    data() {
      return {
      }
    },
    computed: {
      // 计算总价格
      totalPrice() {
        let totalPrice = 0;
        this.orderPaymentList.forEach(item => {
          (totalPrice += parseFloat((item.present_price * item.buy_count).toFixed(2)));
        });
        return totalPrice.toFixed(2);
      }
    },
    methods: {
      /**
       * 退出订单列表 & 清空订单列表
       */
      outOrderEvt() {
        this.$router.back();
        setTimeout(() => {
          // 清空订单列表，方法在 goodsMixin 中
          this.setOrderPaymentList([]);
        }, 300);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>