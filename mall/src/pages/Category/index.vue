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
        <van-tabs v-model="currentTabIndex" @click="onCategorySubClick">
          <!-- <b-scroll> -->
            <div class="container">
              <van-tab v-for="(item, index) in categorySubList" :key="index" :title="item.mallSubName">
                h
              </van-tab>
            </div>
          <!-- </b-scroll> -->
        </van-tabs>
      </section>
    </div>
    <!-- 底部导航 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import FooterNav from '@/components/FooterNav';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: 'Category',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll, FooterNav },
    data() {
      return {
        sidebarIndex: 0, // 侧边栏导航下标
        categorySubList: [], // 子分类列表
        currentTabIndex: 0, // 当前子分类激活下标
        goodsList: [], // 商品列表
      };
    },
    created() {
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
        console.log(categorySubId);

        try {
          let res = await ajax.getGoodsList(categorySubId);
          console.log(res)
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 切换侧边导航
       */
      switchSideNav(item, index) {
        if (this.sidebarIndex === index) return;

        // 切换左侧导航下标
        this.sidebarIndex = index;
        // 计算侧边导航标签距离顶部距离
        let top = 100 / (this.categoryList.length) * index;
        this.$refs.sideTagRef.style.top = `${ top }%`;
        // 切换子分类列表
        this.categorySubList = item.bxMallSubDto;
        // 切换子分类下标为第一个
        this.currentTabIndex = 0;
        // 默认获取大分类下的第一个子分类商品数据
        this._getGoodsList(item.bxMallSubDto[0].mallSubId);
      },
      /**
       * 点击子分类
       */
      onCategorySubClick(index) {
        this._getGoodsList(this.categorySubList[index].mallSubId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>