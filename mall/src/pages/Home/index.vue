<template>
  <div>
    <!-- 顶部搜素 -->
    <header class="header">
      <section class="city">杭州 ▼</section>
      <section class="search-box">
        <van-icon name="search" class="search-icon"/>
        <input class="box" type="text" @focus="focus" placeholder="请输入搜索关键词" v-model="inputValue" />
        <van-icon name="clear" class="clear" @click="inputValue = ''" v-show="inputValue" />
      </section>
      <!-- 取消 -->
      <transition name="cancel-anim">
        <div class="cancel" v-show="query" @click="closeSearch">取消</div>
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
  import BScroll from '@/components/BScroll';
  import FooterNav from '@/components/FooterNav';
  import ajax from '@/api';

  export default {
    name: 'Home',
    components: {
      Banner,
      Category,
      Recommend,
      Floor,
      HotGoods,
      BScroll,
      FooterNav
    },
    data() {
      return {
        inputValue: '', // 搜素框
        homeData: {}, // 首页数据
        probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
        bounce: { top: true }, // 当滚动超过边缘的时候会有一小段回弹动画
        query: false, // 显示搜索
      };
    },
    created() {
      this._getHome();
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
            console.log(res)
          }
        } catch (error) {
          console.log(error);
        }
      },
      focus() {
        this.query = true;
      },
      scroll() {},
      scrollEnd() {},
      closeSearch() {
        this.query = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 定义取消动画
  @keyframes cancel-anim {
    0% { transform: translate3d(100%, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  // 取消动画进入
  .cancel-anim-enter-active {
    animation: cancel-anim .3s;
  }
  // 取消动画离开
  .cancel-anim-leave-active {
    animation: cancel-anim .1s reverse;
  }

  .header {
    height: 44px;
    line-height: 44px;
    background: #eee;
    display: flex;
    // position: relative;
    // z-index: 10;
    .city {
      flex-basis: 20%;
      font-size: 12px;
      text-align: center;
    }
    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      .search-icon {
        color: #222;
        font-size: 12px;
        position: absolute;
        left: 10px;
      }
      .box {
        flex: 1;
        box-sizing: border-box;
        line-height: 18px;
        background: #fff;
        color: #333;
        font-size: 14px;
        outline: 0;
        padding: 7px;
        padding-left: 32px;
        margin-right: 5px;
        border-radius: 5px;
      }
      .clear {
        position: absolute;
        right: 12px;
        color: #999;
      }
    }
    .cancel {
      // position: absolute;
      // top: 0;
      // right: 12px;
      margin: 0 8px;
      font-size: 16px;
    }
  }

  .content {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 13.5vw;
    .content-scroll {
      height: 100%;
      overflow: hidden;
    }
  }
</style>