<template>
  <div class="order-manage">
    <top-bar title="订单管理" hasBack></top-bar>
    
    <section class="order-container">
      <van-tabs v-model="active">
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
      <!-- 加载状态 -->
      <loading :loadingStatus="loadingStatus" type="spinner" />
    </section>
  </div>
</template>

<script>
   import TopBar from '@/components/TopBar';
   import BScroll from '@/components/BScroll';
   import { GoodsMixin } from '@/mixins/goodsMixin';
   import ajax from '@/api';

  export default {
    name: 'OrderManage',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll },
    data() {
      return {
        orderList: [],
        active: 1
      }
    },
    created() {
      this._getOrderList();
    },
    methods: {
      /**
       * 获取订单列表
       */
      async _getOrderList() {
        try {
          const res = await ajax.getOrderList();
          if (res.code === 200) {
            this.orderList = res.orderList;
            this.loadingStatus = false;
          }
          console.log(res);
        } catch(error) {
          this.loadingStatus = false;
          if (error.response && error.response.status === 401 || 403) this.$toast(error.response.data.msg);
          console.log(error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>
