<template>
  <div id="goods-list-container">
    <van-nav-bar title="商品列表" />
    <div class="main">
      <!-- 左侧大类导航区域 -->
      <section class="left-nav">
        <ul>
          <li class="category-item" v-for="(item, index) of categoryList" :key="item.ID" 
              :class="{ categoryActive: currentIndex == index }"
              @click="clickCategory(index, item.ID)"
          >
            {{ item.MALL_CATEGORY_NAME }}
          </li>
        </ul>
      </section>
      <!-- 右侧商品信息区域 -->
      <section class="right-list">
        <!-- 顶部子类导航 -->
        <div>
          <van-tabs v-model="active" animated swipeable @click="clickCategorySub">
            <van-tab
              v-for="(item) in categorySubList"
              :key="item.ID"
              :title="item.MALL_SUB_NAME"
            >
            </van-tab>
          </van-tabs>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list-wrapper">
          <div class="goods-list"> 
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :offset="100" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="list-item" v-for="item of goodsList" :key="item.ID" @click="goGoodsInfo(item.ID)">
                  <section class="list-item-img"><img :src="item.IMAGE1" width="100%" height="100%" :onerror="errorImg" /></section>
                  <section class="list-item-text">
                    <p>{{ item.NAME }}</p>
                    <p>￥{{ item.ORI_PRICE }}</p>
                  </section>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
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
        loading: false, // 是否处于加载状态，加载过程中不触发 load 事件
        finished: false, // 是否已加载完成，加载完成后不再触发 load 事件
        isRefresh: false, // 下拉刷新
        goodsList: [], // 商品列表
        page: 1, // 默认页数
        categorySubId: '', // 商品子类别id
        errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
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
          this._getCategorySubList(this.categoryList[0].ID); // 默认取第一个子类列表
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
          this.categorySubId = this.categorySubList[0].ID; // 默认子类 ID 取第一个
          this.onLoad();
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 获取商品数据
       */
      async _getGoodsList() {
        let method = 'post';
        let path = Url.goodsListApi;
        let data = {
           page: this.page,
           categorySubId: this.categorySubId
        };
        try {
          let res = await fetchGoodsList(path, method, data);
          this.goodsList = [...this.goodsList, ...res.result];
          this.page++; // 数据获取完成 page + 1
          this.loading = false;
         } catch (error) {
           if (error.code === 404) {
             this.loading = false;
           }
           this.finished = true; // 没有数据 上拉加载禁止
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
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.goodsList = [];
        this._getCategorySubList(categoryId); // 切换子类信息
      },
      /**
       * 点击子类
       */
      clickCategorySub(index) {
        this.categorySubId = this.categorySubList[index].ID;
        this.goodsList = []
        this.finished = false;
        this.page = 1;
        this.onLoad(); // 调取该子类下的商品数据
      },
      /**
       * 上拉加载
       */
      onLoad() {
        setTimeout(() => {
          this._getGoodsList(); // 获取商品列表
        }, 3000)
      },
      /**
       * 下拉刷新
       */
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodsList = [];
          this.page = 1;
          this.onLoad();
        }, 2000);
      },
      /**
       * 跳转到商品信息页
       */
      goGoodsInfo(goodsId) {
         this.$router.push({
          name: 'GoodsInfo',
          params: {
            goodsId
          }
        });
      }
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
    /* padding-bottom: 50px; */
    padding-bottom: 13.5vw;
  }
  .left-nav {
    background: aliceblue;
    flex: 0 0 5rem;
  }
  .right-list {
    flex: 1;
    display: flex;
    flex-direction: column;
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
  .goods-list-wrapper {
    flex: 1;
    position: relative;
  }
  .goods-list { 
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
  }
  .list-item {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
    padding: 2.667vw 4vw;
    font-size: .8rem;
  }
  .list-item-img {
    flex: 0 0 30%;
    border: 1px solid #eaeaea;
    box-shadow: 0 0.533vw 2.133vw #f0f1f2;
  }
  .list-item-text {
    flex: 1;
    padding-left: 5.333vw;
  }
  .list-item-text :last-child {
    color: red;
    font-weight: 700;
  }
</style>