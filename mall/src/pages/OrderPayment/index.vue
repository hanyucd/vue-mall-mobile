<template>
  <div class="order-payment">
    <top-bar title="确认订单" hasBack outOrder v-on:outOrderEvt="outOrderEvt"></top-bar>

    <!-- 收货地址 -->
    <section class="address-container">
      <!-- 不存在默认地址 -->
      <div class="common no-address" v-if="!defAddress._id && !tempAddress._id" @click="$router.push({ name: 'AddressManage' })">
        <van-icon name="add-o" />
        <span>点击添加收货地址</span>
      </div>
      <div class="common address-info" v-else @click="$router.push({ name: 'AddressManage' })">
        <section class="location"><van-icon name="location" color="#fff" /></section>
        <section class="address-text">
          <p class="name-tel">
            <span class="name">{{ tempAddress.name || defAddress.name }}</span>
            TEL : <span class="tel">{{ tempAddress.tel || defAddress.tel }}</span>
          </p>
          <p class="address-detail">地址 : {{ tempAddress.address || defAddress.address }}</p>
          <p class="hint">(收货不便时,可选择免费待收货服务)</p>
        </section>
        <section class="arrow"><van-icon name="arrow" /></section>
      </div>
      <!-- 彩条 -->
      <div class="colour-bar"></div>
    </section>
    <!-- 订单商品 -->
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
      <div class="submit-btn" @click="submitOrder">提交订单</div>
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
        defAddress: {}, // 默认地址
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
    // 在进入该组件路由之前被调用 | 在导航完成前获取数据
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm._getDefAddress();
        if (!vm.orderPaymentList.length) vm.$router.push({ name: 'Cart' });
      });
    },
    methods: {
      /**
       * 获取默认地址
       */
      async _getDefAddress() {
        try {
          const res = await ajax.getDefAddress();
          if (res.code !== 200) {
            this.$toast(res.msg);
            return;
          }
          this.defAddress = res.defAddress;
        } catch(error) {
          if (error.response && error.response.status === 401 || 403) this.$toast(error.response.data.msg);
          console.log(error);
        }
      },
      /**
       * 退出订单列表 & 清空订单列表
       */
      outOrderEvt() {
        this.$router.back();
        setTimeout(() => {
          // 方法在 goodsMixin 中
          this.setOrderPaymentList([]); // 清空订单列表
          this.setTempAddress({}); // 清除临时地址
        }, 300);
      },
      /**
       * 提交订单
       */
      async submitOrder() {
        if (!this.defAddress._id && !this.tempAddress._id) {
          this.$toast('请添加收货地址');
          return;
        }
        // 提取订单列表中所有商品 id
        const goodsIds = this.orderPaymentList.map(item => item.goodsId);
        // 整合数据
        let orderInfo = {
          goodsIds,
          tel: this.tempAddress.tel || this.defAddress.tel, // 收货人电话
          address: this.tempAddress.address || this.defAddress.address, // 收货地址
        }
        // 若是从立即购买过来，就向对象添加三个属性
        this.orderPaymentList[0].isNowBuy
          &&
          Object.assign(orderInfo, {
            isNowBuy: this.orderPaymentList[0].isNowBuy, // 是否是立即购买
            nowBuyCount: this.orderPaymentList[0].buy_count, // 立即购买商品的数量
            noweBuyMallPrice: this.orderPaymentList[0].mall_price // 立即购买商品总价
          });

        try {
          const res = await ajax.submitOrderHandle(orderInfo);
          if (res.code === 200) {
            this.$toast(res.msg);
            setTimeout(() => {
              this.setOrderPaymentList([]); // 清空订单列表
              this.$router.back();
            }, 2000);
          }
        } catch(error) {
          console.log(error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>