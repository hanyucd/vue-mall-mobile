<template>
  <div class="user">
    <top-bar title="个人中心"></top-bar>
    
    <section class="user-info">
      <img class="avatar" src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg" />
      <p @click="$router.push({ name: 'Login' })">登录 / 注册</p>
    </section>
    <!-- 订单索引 -->
    <section class="order-index-wrapper">
      <div class="order-index-list">
        <section class="order-all">
          <span>全部订单</span>
          <van-icon class="icon" name="arrow" />
        </section>
        <ul>
          <li class="order-index-item" v-for="(item, index) in orderIndex" :key="item.status">
            <van-icon class="icon" :name="item.icon" />
            <p class="title">{{ item.title }}</p>
          </li>
        </ul>
      </div>
    </section>
    <!-- 其他：收藏商品、地址管理、最近浏览 -->
    <section class="other-entry">
      <!-- 收藏商品 -->
      <div class="collection">
        <van-icon class="mark-icon" name="star-o" />
        <span>收藏商品</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <!-- 地址管理 -->
      <div class="address">
        <van-icon class="mark-icon" name="star-o" />
        <span>地址管理</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <!-- 最近浏览 -->
      <div class="browse-history" @click="$router.push({ name: 'BrowseHistory' })">
        <van-icon class="mark-icon" name="eye-o" />
        <span>最近浏览</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
    </section>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import FooterNav from '@/components/FooterNav';
  import ajax from '@/api';

  export default {
    name: 'User',
    components: { TopBar, FooterNav },
    data() {
      return {
        // 待付款 1，待发货 2，待收货 3，评价 4，已完成
        orderIndex: [
          { icon: "balance-pay", status: 1, title: "待付款" },
          { icon: "free-postage", status: 2, title: "待发货" },
          { icon: "points", status: 3, title: "待收货" },
          { icon: "thumb-circle-o", status: 4, title: "评价" },
          { icon: "like-o", status: 5, title: "已完成" }
        ]
      }
    },
    created() {
      this._getUserInfo();
    },
    methods: {
      /**
       * 获取用户信息
       */
      async _getUserInfo() {
        try {
          let userInfo = await ajax.getUserInfo();
          console.log(userInfo)
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