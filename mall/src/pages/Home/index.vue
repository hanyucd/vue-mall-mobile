<template>
  <div>
    <!-- 顶部搜素 -->
    <section class="search-bar">
      <van-row gutter="20">
        <van-col :span="3">
          <img class="location-icon" width="80%" :src="locIcon" alt="" />
        </van-col>
        <van-col :span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col :span="5">
          <van-button round size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </section>
    <!-- 轮播图 -->
    <section class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner, index) in bannerResource" :key="index">
          <img v-lazy="banner.imageUrl" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        locIcon: require('@/assets/images/location.png'),
        bannerResource: [
          {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
          {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg'},
          {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
        ]
      };
    }
  }
</script>

<style scoped>
  .search-bar {
    height: 3rem;
    line-height: 3rem;
    background: #b532e9;
    overflow: hidden;
  }
  .location-icon {
    padding-top: .8rem;
    padding-left: .3rem;
  }
  .search-input {
    width: 100%;
    height: 1.3rem;
    background: #b532e9;
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
  }
  .swiper-area {
    width: 100%;
    max-height: 15rem;
  }
  .swiper-area::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
</style>