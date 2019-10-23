<template>
  <div class="order-manage">
    <top-bar title="订单管理" hasBack></top-bar>
    
    <section class="order-container">
      <!-- 标签导航 -->
      <van-tabs v-model="curActiveTab" color="#b532e9">
        <van-tab v-for="(tab, index) in tables" :key="index" :title="tab">
        </van-tab>
      </van-tabs>
      
      <div class="content-container">
        <b-scroll class="content-scroll" v-if="!loadingStatus && orderList.length" :data="orderList">
          <div class="container">
            <section class="order-item" v-for="item of orderList" :key="item._id">
              <div class="order-wrapper" v-if="item.status === curActiveTab">
                <section class="order-number">
                  <span>订单编号：</span>
                  <span class="number">{{ item.order_id }}</span>
                </section>
                <ul class="goods-list">
                  <li class="goods-item" v-for="value of item.order_list" :key="value._id">
                    <section class="goods-img"><img :src="value.image_path" /></section>
                    <section class="goods-name">{{ value.goods_name }}</section>
                    <section class="goods-price">
                      <p class="money">￥{{ value.mall_price }}</p>
                      <p class="buy-count">X {{ value.buy_count }}</p>
                    </section>
                  </li>
                </ul>
                <section class="order-info">
                  <p>共<span class="goods-count">{{ item.order_list.length }}</span>件商品</p>
                  <p>创建时间：<span class="create-time">{{ item.createAt }}</span></p>
                  <p>收货地址：{{ item.address }}</p>
                </section>
              </div>
            </section>
          </div>
        </b-scroll>

        <article class="empty" v-if="!loadingStatus && !orderList.length">
          {{ userToken ? '暂无相关订单~~' : '请先登录噢~~' }}
        </article>
      </div>
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
        orderList: [], // 订单数据
        tables: [ "全部", "待付款", "待发货", "待收货", "已完成" ], // tab 导航标题
        curActiveTab: 0, // 当前激活 tab 索引
      }
    },
    created() {
      let { status }  = this.$route.query;
      this.curActiveTab = status;
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
        } catch(error) {
          this.loadingStatus = false;
          if (error.response && (error.response.status === 401 || 403)) this.$toast(error.response.data.msg);
          console.log(error);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>
