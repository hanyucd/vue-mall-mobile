<template>
  <div id="goods-list-container">
    <van-nav-bar title="商品列表" />
    <div class="main">
      <!-- 左侧大类导航区域 -->
      <section class="left-nav">
        <ul>
          <li
            class="category-item"
            v-for="(item, index) of categoryList"
            :key="item.ID"
            :class="{ categoryActive: currentIndex == index }"
            @click="clickCategory(index, item.ID)"
          >
            {{ item.MALL_CATEGORY_NAME }}
          </li>
        </ul>
      </section>
      <!-- 右侧商品信息区域 -->
      <section class="right-list">
        <div>
          <van-tabs v-model="active" animated swipeable>
            <van-tab
              v-for="(item) in categorySubList"
              :key="item.ID"
              :title="item.MALL_SUB_NAME">
            </van-tab>
          </van-tabs>
        </div>
        <div>商品列表</div>
      </section>
    </div>
  </div>
</template>

<script>
  import { fetchCategoryList, fetchCategorySubList, fetchGoodsList } from '@/api';
  import { Url } from '@/api/url';

  export default {
    name: 'CategoryList',
    data() {
      return {
        categoryList: [], // 大类列表
        categorySubList: [], // 子类列表
        currentIndex: 0, // 当前点击的分类ID
        active: 0,
      };
    },
    created() {
      this._getCategoryList();
    },
    methods: {
      /**
       * 获取大类数据
       */
      async _getCategoryList() {
        let method = 'get';
        let path = Url.categoryListApi;

        try {
          let res = await fetchCategoryList(path, method);
          this.categoryList = res.result;
          this._getCategorySubList(this.categoryList[0].ID);
        } catch (error) {
          console.log(error)
        }
      },
      /**
       * 获取子类数据
       */
      async _getCategorySubList(categoryId) {
        let method = 'post';
        let path = Url.categorySubListApi;
        try {
          let res = await fetchCategorySubList(path, method, { categoryId });
          this.categorySubList = res.result;
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 点击大类，切换子类
       */
      clickCategory(index, categoryId) {
        if (index === this.currentIndex) return;
        this.currentIndex = index;
        this.active = 0;
        this._getCategorySubList(categoryId);
      },
    }
  }
</script>

<style scoped>
  #goods-list-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .main {
    flex: 1;
    display: flex;
    padding-bottom: 50px;
  }
  .left-nav {
    background: aliceblue;
    flex: 0 0 5rem;
  }
  .right-list {
    flex: 1;
  }
  .category-item {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: .8rem;
    text-align: center;
  }
  .categoryActive {
    background-color: #fff;
  }
</style>