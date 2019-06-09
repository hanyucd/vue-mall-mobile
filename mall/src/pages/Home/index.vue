<template>
  <div>
    <!-- 顶部搜素 -->
    <header class="header">
      <section class="city" @click="changeCity">{{ locationCity }} ▼</section>
      <section class="search-box">
        <van-icon name="search" class="search-icon"/>
        <input class="box" type="text" @focus="showSearch" placeholder="请输入搜索关键词" v-model="searchKeyword" />
        <van-icon name="clear" class="clear" @click="clearSearchInput" v-show="searchKeyword" />
      </section>
      <!-- 取消 -->
      <transition name="cancel-bounce">
        <section class="cancel" v-show="isShowSearch" @click="cancelSearch">取消</section>
      </transition>
    </header>
    <!-- 内容区 -->
    <section class="content" v-if="homeData">
      <b-scroll 
        class="content-scroll"
        ref="homeScrollRef"
        v-if="homeData"
        :data="homeData.hotGoods"
        :probeType="probeType"
        :pullup="true"
        :bounce="bounce"
        :listenScroll="true"
        @scroll="scroll"
        v-on:scrollEnd="homeScrollEnd"
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
    <search 
      v-show="isShowSearch" 
      :searchResult="dataList" 
      :searchKeyword="searchKeyword" 
      :isEmptySearchResult="isEmptySearchResult"
      :isloadMore="isloadMore"
      v-on:click-search="clickSearch"
      v-on:scrollEnd="searchScrollEnd"
      >
    </search>
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
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import { loadMixin } from '@/mixins/loadMixin';
  import { throttle } from '@/utils/tools'; // 导入节流函数
  import ajax from '@/api';

  export default {
    name: 'Home',
    mixins: [ GoodsMixin, loadMixin ],
    components: { Banner, Category, Recommend, Floor, HotGoods, Search, BScroll, FooterNav },
    data() {
      return {
        homeData: {}, // 首页数据
        probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
        bounce: { top: true }, // 当滚动超过边缘的时候顶部会有一小段回弹动画
        page: 1, // 数据页数
        searchKeyword: '', // 搜素关键字
        isShowSearch: false, // 是否显示搜索区
        isEmptySearchResult: false, // 是否无搜索结果
        isloadMore: false, // 是否加载更多
      };
    },
    watch: {
      searchKeyword(newCity, old) {
        console.log('new:', newCity, old)
      }
    },
    created() {
      this._getHome();
      // 监听输入框变化做函数节流 实现 搜索联想
      this.unWatch = this.$watch('searchKeyword', throttle(() => {
        this.dataList = []; // 发送搜索请求前先清空上一次搜索结果数组
        this.isEmptySearchResult = false; // 发送搜索请求之前设为 false
        this.isloadMore = false;
        if (this.searchKeyword) {
          this.page = 1;
          this._search(this.searchKeyword, false);
        }
      }, 1000, 1000));
      // console.log('首页生命')
    },
    destroyed() {
      // 注销 watch
      this.unWatch();
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
        // 判断上一次请求是否完成 | 必须等待上一次请求完成才继续向下执行，方法在 loadMixin 中
        if (this.isLocked()) return;
        // 上锁，方法在 loadMixin 中
        this.locked();

        try {
          let res = await ajax.search(keyWord, this.page);
          if (res.code === 200) {
            this.setDataTotal(res.result.total); // 设置数据总数，方法在 loadMixin 中
            // 判断是加载更多还是一次新的请求，方法在 loadMixin 中
            isLoadMore
              ? this.addMoreData(res.result.goodsList)
              : this.dataList = res.result.goodsList;
            // 解锁，方法在 loadMixin 中
            this.unLocked();
            // 判断是否无搜索结果 | 无结果则赋于 true
            (!this.dataList.length) && (this.isEmptySearchResult = true);
          }
        } catch (error) {
          // 解锁，方法在 loadMixin 中
          this.unLocked();
          console.log(error);
        }
      },
      /**
       * 输入框聚焦展示搜索区
       */
      showSearch() { this.isShowSearch = true; },
      /**
       * 清空搜索框关键字
       */
      clearSearchInput() { this.searchKeyword = ''; },
      /**
       * 取消搜索
       */
      cancelSearch() {
        // 关闭搜索区
        this.isShowSearch = false;
        // 300 ms后搜索关键字设为空字符串
        setTimeout(() => {
          this.searchKeyword = '';
        }, 300);
      },
      /**
       * 监听子组件派发的事件
       */
      clickSearch(searchKeyword) { this.searchKeyword = searchKeyword },
      scroll() {},
      /**
       * 首页滚动到底部 | 处理子组件派发的事件 | 重新计算 better-scroll
       */
      homeScrollEnd() { this.$refs.homeScrollRef.refresh() },
      /**
       * 搜索滚动到底部 | 处理子组件派发的事件 | 加载更多
       */
      searchScrollEnd() {
        // 判断是否还有更多数据，方法在 loadMixin 中
        if (!this.hasMoreData()) {
          this.isloadMore = false;
          return;
        } else {
          this.isloadMore = true;
          this.page++;
          this._search(this.searchKeyword, true);
        }
      },
      /**
       * 切换城市
       */
      changeCity() { this.$router.push({ name: 'City' }) }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>