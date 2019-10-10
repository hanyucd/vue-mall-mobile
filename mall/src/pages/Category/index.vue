<template>
  <div class="category">
    <top-bar title="商品分类"></top-bar>
    <!-- 内容区 -->
    <div class="content">
      <!-- 左侧导航栏 -->
      <section class="left">
        <ul>
          <li v-for="(item, index) in categoryList" :key="item.mallCategoryId" :class="{ active: sidebarIndex === index }" @click="switchSideNav(item, index)">
            {{ item.mallCategoryName }}
          </li>
          <!-- 侧边栏导航标记 -->
          <article class="sidebar-tag" ref="sideTagRef"></article>
        </ul>
      </section>
      <!-- 右侧内容 -->
      <section class="right">
        <van-tabs v-model="curTabIndex" color="#b532e9" @click="onCategorySubClick">
          <van-tab v-for="(item, index) in categorySubList" :key="index" :title="item.mallSubName"></van-tab>
        </van-tabs>
        <div class="scroll-wrapper">
          <b-scroll class="content-scroll" :data="goodsList" v-if="!isEmptyGoodsList && goodsList.length">
            <div class="container">
              <goods-list :goodsList="goodsList"></goods-list>
            </div>
          </b-scroll>
          <article class="no-data" v-show="isEmptyGoodsList">暂无数据~~</article>
          
          <!-- 加载状态 -->
          <loading :loadingStatus="loadingStatus" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import GoodsList from '@/components/GoodsList';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'Category',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll, GoodsList },
    data() {
      return {
        sidebarIndex: 0, // 侧边栏导航下标
        categorySubList: [], // 子分类列表
        curTabIndex: 0, // 当前子分类激活下标
        curTabIndexCopy: 0, // 当前子分类激活下标副本 | 对重复点击相同子分类做节流
        goodsList: [], // 商品列表
        isEmptyGoodsList: false, // 是否为空商品列表
      };
    },
    async created() {
      // 点击首页分类传递过来
      let { categorySubId, index, item } = this.$route.params;

      if (categorySubId && index && item) {
        try {
          // 获取大分类列表
          let res = await ajax.getHomeData();
          (res.code === 200) && this.setCategoryList(res.result.category);
        } catch (error) {
          console.log(error);
        }
        // 切换左侧导航下标
        this.sidebarIndex = index;
        this.$nextTick(() => {
          // 计算侧边导航标签距离顶部距离
          let top = 100 / (this.categoryList.length) * index;
          this.$refs.sideTagRef.style.top = `${ top }%`;
        });
        // 切换子分类列表
        this.categorySubList = item.bxMallSubDto;
        this._getGoodsList(categorySubId);
        
        return;
      }
      
      this._getCategoryList();
    },
    methods: {
      /**
       * 获取大分类列表 & 存到 Vuex 中
       */
      async _getCategoryList() {
        // 判断是否已存在大分类列表 | 调用 Vuex 中的 Getters，值在 GoodsMixin 中
        if (!this.categoryList.length) {
          try {
            let res = await ajax.getHomeData();
            if (res.code === 200) {
              // 设置大分类列表 | 调用 Vuex 中的 Actions，方法在 GoodsMixin 中
              this.setCategoryList(res.result.category);
              // 默认取第一个大分类的子分类列表
              this.categorySubList = res.result.category[0].bxMallSubDto;
              // 默认取第一个子分类商品数据
              this._getGoodsList(this.categorySubList[0].mallSubId);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          // 默认取第一个大分类的子分类列表
          this.categorySubList = this.categoryList[0].bxMallSubDto;
          // 默认取第一个子分类商品数据
          this._getGoodsList(this.categorySubList[0].mallSubId);
        }
      },
      /**
       * 根据子分类 Id 获取对应分类商品数据
       */
      async _getGoodsList(categorySubId) {
        this.loadingStatus = true;
        try {
          let res = await ajax.getGoodsList(categorySubId);
          if (res.code === 200) {
            this.goodsList = res.result;
            this.loadingStatus = false;
            // 判断是否为空商品列表
            this.isEmptyGoodsList = !this.goodsList.length ? true : false;
          }
        } catch (error) {
          this.loadingStatus = false;
          console.log(error);
        }
      },
      /**
       * 切换侧边导航
       */
      switchSideNav(item, index) {
        // 节流
        if (this.sidebarIndex === index) return;

        // 切换左侧导航下标
        this.sidebarIndex = index;
        // 计算侧边导航标签距离顶部距离
        let top = 100 / (this.categoryList.length) * index;
        this.$refs.sideTagRef.style.top = `${ top }%`;
        // 切换子分类列表
        this.categorySubList = item.bxMallSubDto;
        // 切换为第一个子分类下标
        this.curTabIndex = 0;
        // 恢复初始化子分类下标副本
        this.curTabIndexCopy = 0;
        // 清空商品列表
        this.goodsList = [];
        // 默认获取大分类下的第一个子分类商品数据
        this._getGoodsList(item.bxMallSubDto[0].mallSubId);
      },
      /**
       * 点击子分类
       */
      onCategorySubClick(index) {
        // 节流
        if (this.curTabIndexCopy === index) return;
        this.curTabIndexCopy = index;
        // 清空商品列表
        this.goodsList = [];
        this._getGoodsList(this.categorySubList[index].mallSubId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>