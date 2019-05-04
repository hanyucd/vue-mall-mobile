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
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in bannerResource" :key="item.goodsId">
          <img v-lazy="item.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </section>
    <!-- 分类列表 -->
    <section class="type-bar">
      <div class="type-item" v-for="item of category" :key="item.mallCategoryId">
        <img v-lazy="item.image" width="90%" />
        <span>{{ item.mallCategoryName }}</span>
      </div>
    </section>
    <!-- 广告条 -->
    <section>
      <img v-lazy="adBanner" width="100%" alt="" />
    </section>
  </div>
</template>

<script>
  import { fetchHomeData } from '@/api';
  import { Url } from '@/api/url';

  export default {
    name: 'Home',
    data() {
      return {
        locIcon: require('@/assets/images/location.png'),
        bannerResource: [], // 轮播图片
        category: [], // 商品种类列表
        adBanner: '', // 广告
      };
    },
    created(){
      this._getHomeData();
    },
    methods: {
      async _getHomeData() {
        let method = 'get';
        let path = Url.homeDataUrl;
        try {
          let homeData = await fetchHomeData(path, method);
          this.bannerResource = homeData.data.slides;
          this.category = homeData.data.category;
          this.adBanner = homeData.data.advertesPicture.PICTURE_ADDRESS; 
          console.log(homeData)
        } catch(error) {
          console.log(error);
        }
      }
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
    /* width: 100%;
    max-height: 15rem; */
    clear: both;
    overflow: hidden;
  }
  .type-bar {
    background: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-wrap: nowrap;
  }
  .type-bar div {
    flex: 1;
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
</style>