<template>
  <div class="goods">
    <b-scroll class="content-scroll" ref="scrollRef">
      <div class="container">
        <!-- 商品图片轮播图 -->
        <van-swipe class="goods-swipe" :autoplay="3000" :duration="1500" :touchable="false" @change="onChangeSwipe">
          <van-swipe-item v-for="n in 4" :key="n">
            <img v-lazy="goodsInfo.image" @click="previewImg" />
          </van-swipe-item>
          <!-- 自定义指示器 -->
          <article class="custom-indicator" slot="indicator">{{ currentImg + 1 }}/4</article>
        </van-swipe>
        <!-- 商品信息 -->
        <section class="goods-info">
          <p class="goods-name">{{ goodsInfo.name }}</p>
          <span class="goods-price">￥{{ goodsInfo.present_price }}</span>
        </section>
        <!-- 商品运费 -->
        <section class="goods-express">
          <span class="goods-ex">运费：{{ goodsInfo.express || 0  }}</span>
          <span class="goods-amount">剩余：{{ goodsInfo.amount }}</span>
          <span class="goods-collection">
            收藏：
            <van-icon 
              :name="isCollection ? 'like' : 'like-o'" 
              class="goods-like"
              @click="collectionHandle" 
            />
          </span>
        </section>
        <!-- 商品店铺 -->
        <section class="goods-store">
          <div class="store-left">
            <van-icon name="shop-o" />
            <span class="store-name">有赞店铺</span>
            <van-tag class="store-tag" type="danger">官方</van-tag>
          </div>
          <div class="store-right">
            <span class="store-enter">进入店铺</span>
            <van-icon name="arrow" />
          </div>
        </section>
        <!-- 商品详情 -->
        <section class="goods-tabs">
          <van-tabs v-model="currentTab">
            <van-tab v-for="item of tabs" :key="item.id" :title="item.title">
              <!-- 图片 -->
              <div v-show="currentTab == 0" v-html="goodsInfo.detail"></div>
              <!-- 评论 -->
              <div v-show="currentTab == 1" class="comment-wrapper">
                <div v-if="!commentList.length" class="no-comment">该商品暂无评论噢~~</div>
                <div></div>
              </div>
            </van-tab>
          </van-tabs>
        </section>
      </div>
    </b-scroll>

    <!-- 立即购买弹出层 -->
    <transition name="bounce-drawer">
      <div v-show="showBuyDrawer" class="drawer-buy">
        <!-- 商品信息 -->
        <section class="drawer-goods-info">
          <img v-lazy="goodsInfo.image_path" />
          <div class="goods-info">
            <p class="goods-name">{{ goodsInfo.name }}</p>
            <p class="goods-pic">
              <span>￥</span>
              <span>{{ (goodsInfo.present_price * buyTotal) | toFixed }}</span>
            </p>
          </div>
        </section>
        <!-- 购买数量 -->
        <section class="drawer-goods-count">
          <div class="buy-total">
            <p>购买数量：<span>{{ buyTotal }}</span></p>
            <span>剩余 {{ goodsInfo.amount }} 件</span>
          </div>
          <div class="change-total">
            <van-stepper v-model="buyTotal" disable-input />
          </div>
        </section>
        <!-- 立即购买 -->
        <section class="drawer-buy-now">立即购买</section>
      </div>
    </transition>
    <!-- 蒙层 -->
    <transition name="fade">
      <article class="mask" v-show="showBuyDrawer" @click="showBuyDrawer = false"></article>
    </transition>

    <!-- 底部购买 -->
    <article class="goods-buy">
      <!-- 首页 -->
      <section class="com-icon home" @click="$router.push({ name: 'Home' })">
        <van-icon name="wap-home" />
        <span>首页</span>
      </section>
      <!-- 购物车 -->
      <section class="com-icon cart" @click="$router.push({ name: 'Cart' })">
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </section>
      <!-- 加入购物车 -->
      <section class="com-text add-cart" @click="addCart">加入购物车</section>
      <!-- 立即购买 -->
      <section class="com-text buy-now" @click="popupBuyDrawer">立即购买</section>
    </article>

    <!-- 后退 -->
    <back @backEvt="back"></back>
  </div>
</template>

<script>
  import Back from './Back';
  import BScroll from '@/components/BScroll';
  import { ImagePreview } from 'vant'; // 图片预览
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import ajax from '@/api';

  export default {
    name: "GoodsDetails",
    mixins: [ GoodsMixin ],
    components: { Back, BScroll },
    props: [ 'goodsId' ],
    data() {
      return {
        goodsInfo: {}, // 商品信息
        currentImg: 0, // 当前显示图片索引
        isCollection: false, // 是否收藏 | ture: 收藏  false: 未收藏
        tabs: [{ id: 0, title: '商品详情' }, { id: 1, title: '商品评论' }], // 标签页
        currentTab: 0, // 当前标签页索引
        commentList: [], // 评论
        showBuyDrawer: false, // 是否显示购买抽屉
        buyTotal: 1, // 购买数量
      }
    },
    watch: {
      $route(to, from) {
        (to.name === 'GoodsDetails') && this._goodsDetails(this.goodsId);
      }
    },
    created() {
      this._goodsDetails(this.goodsId);
    },
    deactivated() {
      // keep-alive 组件停用时商品详情数据
      setTimeout(() => {
        this.goodsInfo = {};
      }, 500);
    },
    methods: {
      /**
       * 商品详情
       */
      async _goodsDetails(goodsId) {
        // console.log('id:', goodsId)

        try {
          let res = await ajax.getGoodsDetails(goodsId);
          this.goodsInfo = res.result;
          console.log(res);
          if (this.goodsInfo) {
            document.title = this.goodsInfo.name;
          }
        } catch (error) {
          (error.code === 404) && this.$toast(error.message);
          console.log(error);
        }
      },
      /**
       * 监听一页轮播结束事件
       */
      onChangeSwipe(index) { this.currentImg = index },
      /**
       * 预览图片
       */
      previewImg() {
        ImagePreview({
          images: new Array(4).fill(this.goodsInfo.image),
          showIndicators: true,
        })
      },
      /**
       * 收藏处理
       */
      collectionHandle() {
        this.isCollection = !this.isCollection;
      },
      /**
       * 加入购物车
       */
      addCart() {},
      /**
       * 弹出立即购买抽屉
       */
      popupBuyDrawer() { this.showBuyDrawer = true; }
    }
  }
</script>

<style lang="scss" scoped>
  $color:#b532e9;
  $borderColor: #F6F7F8;

  // 立即购买弹跳
  @keyframes bounceAnim {
    0% { transform: translate3d(0, 100%, 0); }
    80% { transform: translate3d(0, -8%, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  .bounce-drawer-enter-active { animation: bounceAnim .3s }
  .bounce-drawer-leave-active { animation: bounceAnim .3s reverse }

  // 蒙层动画
  .fade-enter, .fade-leave-to { opacity: 0 }
  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }

  .goods {
    .content-scroll {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 13.5vw;
      overflow: hidden; 
      .goods-swipe {
        img { width: 100%; height: 100vw; }
      }
      .goods-info {
        padding: 2.5vw 4vw;
        font-size: 16px;
        .goods-name { margin-bottom: 2vw; }
        .goods-price { color: $color; }
      }
      .goods-express {
        padding: 2.5vw 4vw;
        border: 1px solid $borderColor;
        border-right: none;
        border-left: none;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-collection {
          display: flex;
          align-items: center;
          .goods-like { color: $color; }
        }
      }
      .goods-store {
        margin: 4vw 0;
        padding: 2.5vw 4vw;
        border: 1px solid $borderColor;
        border-right: none;
        border-left: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .store-left {
          display: flex;
          align-items: center;
          .store-name { margin: 0 1.5vw; }
        }
        .store-right {
          display: flex;
          align-items: center;
          color: #999;
        }
      }
      .goods-tabs {
        .comment-wrapper { 
          min-height: 300px;
          .no-comment {
            text-align: center;
            color: #333;
            margin-top: 50px;
          }
        }
      }
    }
    .drawer-buy {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      height: 40vh;
      border-radius: 5px 5px 0 0;
      display: flex;
      flex-direction: column;
      background: #fff;
      section { flex: 1 }
      .drawer-goods-info {
        flex-basis: 40%; 
        display: flex;
        margin: 0 16px;
        border-bottom: 1px solid $borderColor;
        img { 
          width: 80px; 
          height: 80%; 
          transform: translate3d(0, -10px, 0);
          border: 1px solid #eee;
        }
        .goods-info {
          padding-left: 30px;
          flex: 1;
          font-size: 14px;
          .goods-name { margin-top: 10px; line-height: 1.4; }
          .goods-pic { margin-top: 10px; color: $color; }
        }
      }
      .drawer-goods-count { 
        flex-basis: 40%;
        padding: 10px 0;
        margin: 0 16px;
        display: flex;
        justify-content: space-between;
        .buy-total {
          p { 
            font-size: 12px; 
            margin-bottom: 15px; 
            span { color: $color; }
          }
          span { font-size: 14px; color: #999; }
        }
      }
      .drawer-buy-now { 
        flex-basis: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #f44;
        letter-spacing: 2px;
      }
    }
    .mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 100;
    }
    .goods-buy {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 13.5vw;
      display: flex;
      section { flex: 1 }
      .com-icon {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
      }
      .home { border-right: 1px solid $borderColor;  }
      .com-text {
        flex-basis: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      .add-cart { background: #ff976a; }
      .buy-now { background: #f44; }
    }
  }
</style>