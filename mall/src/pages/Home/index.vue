<template>
  <div>
    <!-- 顶部搜素 -->
    <header class="header">
      <section class="city">杭州 ▼</section>
      <section class="search-box">
        <van-icon name="search" class="search-icon"/>
        <input class="box" type="text" @focus="focus" placeholder="请输入搜索关键词" v-model="searchKeyword" />
        <van-icon name="clear" class="clear" @click="searchKeyword = ''" v-show="searchKeyword" />
      </section>
      <!-- 取消 -->
      <transition name="cancel-bounce">
        <section class="cancel" v-show="isSearch" @click="cancelSearch">取消</section>
      </transition>
    </header>
    <!-- 内容区 -->
    <section class="content" v-if="homeData">
      <b-scroll 
        class="content-scroll"
        ref="scrollRef"
        v-if="homeData"
        :data="homeData.hotGoods"
        :probeType="probeType"
        :pullup="true"
        :bounce="bounce"
        :listenScroll="true"
        @scroll="scroll"
        @scrollEnd="scrollEnd"
      >
        <div class="container">
          <!-- 轮播图 -->
          <banner :slides="homeData.slides"></banner>
          <!-- 分类 -->
          <category v-if="homeData.advertesPicture" :category="homeData.category" :advertesPicture="homeData.advertesPicture.PICTURE_ADDRESS"></category>
          <!-- 推荐商品 -->
          <recommend :recommend="homeData.recommend"></recommend>
          <!-- 楼层商品 -->
          <div v-if="homeData.floorName">
            <floor v-for="(item, index) in Object.keys(homeData.floorName)"
              :key="index"
              :floorName="homeData.floorName[item]"
              :floor="homeData[item]"
              :num="index + 1"
            >
            </floor>
          </div>
          <!-- 热卖商品 -->
          <hot-goods :hotGoods="homeData.hotGoods"></hot-goods>
        </div>
      </b-scroll>
    </section>
    <!-- 搜索结果 -->
    <search v-show="isSearch"></search>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import Banner from './Banner';
  import Category from './Category';
  import Recommend from './Recommend';
  import Floor from './Floor';
  import HotGoods from './HotGoods';
  import Search from './Search';
  import BScroll from '@/components/BScroll';
  import FooterNav from '@/components/FooterNav';
  import { throttle } from '@/utils/tools'; // 导入节流函数
  import ajax from '@/api';

  export default {
    name: 'Home',
    components: { Banner, Category, Recommend, Floor, HotGoods, Search, BScroll, FooterNav },
    data() {
      return {
        homeData: {}, // 首页数据
        probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
        bounce: { top: true }, // 当滚动超过边缘的时候顶部会有一小段回弹动画
        searchKeyword: '', // 搜素关键字
        isSearch: false, // 是否显示搜索结果
        page: 1, // 数据页数
      };
    },
    created() {
      this._getHome();
      // 监听输入框变化做函数节流实现 搜索联想
      this.unWatch = this.$watch('searchKeyword', throttle(() => {
        if (this.searchKeyword) {
          this.page = 1;
          this._search(this.searchKeyword);
        }
      }, 1000, 1000));
      console.log('首页生命')
    },
    destroyed() {
      // 注销 watch
      this.unWatch();
      console.log(this.unWatch)
    },
    methods: {
      /**
       * 获取首页数据
       */
      async _getHome() {
        try {
          let res = await ajax.getHomeData();
          if (res.code === 200) {
            this.homeData = res.result;
          }
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * @param {String} keyWord 搜索关键字
       * @param {Boolean} isLoadMore 是否加载更多
       */
      async _search(keyWord, isLoadMore) {
        try {
          let res = await ajax.search(keyWord, this.page);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 输入框聚焦
       */
      focus() {
        this.isSearch = true;
      },
      /**
       * 取消搜索
       */
      cancelSearch() {
        this.isSearch = false;
      },
      scroll() {},
      scrollEnd() {},
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>