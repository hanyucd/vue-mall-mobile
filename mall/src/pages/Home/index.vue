<template>
  <div>
    <!-- 顶部搜素 -->
    <section class="search-bar">
      <van-row gutter="20">
        <van-col :span="3" style="text-align: center">
          <img class="location-icon" width="80%" :src="locIcon" alt="" />
        </van-col>
        <van-col :span="14">
          <input type="text" class="search-input" placeholder="搜索商品..." />
        </van-col>
        <van-col :span="7" style="text-align: center">
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
    <!-- 商品推荐 -->
    <section class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item of recommendGoods" :key="item.goodsId">
            <div class="recommend-item">
                <img :src="item.image" width="80%" />
                <div>{{ item.goodsName }}</div>
                <div>￥{{ item.price | moneyFilter }}(￥{{ item.mallPrice | moneyFilter }})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <!-- 类似于楼层的风格 -->
    <floor :floorData="floorOne" :floorTitle="floorName.floor1"></floor>
    <floor :floorData="floorTwo" :floorTitle="floorName.floor2"></floor>
    <floor :floorData="floorThree" :floorTitle="floorName.floor3"></floor>
    <!-- 热卖模块 -->
    <section class="hot-area">
       <div class="hot-title">热卖商品</div>
       <div class="hot-goods">
         <ul class="hot-lists">
           <li class="hot-item" v-for="item of hotGoods" :key="item.goodsId">
             <goods-list
              :goodsImage="item.image"
              :goodsName="item.name"
              :goodsPrice="item.price"
             >
             </goods-list>
           </li>
         </ul>
       </div>
    </section>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import Floor from '@/components/Floor';
  import GoodsList from '@/components/GoodsList';
  import { fetchHomeData } from '@/api';
  import { Url } from '@/api/url';

  export default {
    name: 'Home',
    components: {
      swiper,
      swiperSlide,
      Floor,
      GoodsList
    },
    data() {
      return {
        locIcon: require('@/assets/images/location.png'),
        bannerResource: [], // 轮播图片
        category: [], // 商品种类列表
        adBanner: '', // 广告
        recommendGoods: [], // 推荐商品列表
        swiperOption: {
          slidesPerView: 3,
          autoplay: true,
        },
        floorOne: [], // 楼层 1 数据
        floorTwo: [], // 楼层 2 数据
        floorThree: [], // 楼层 3 数据
        floorName: {}, // 楼层标题
        hotGoods: [] // 热卖商品
      };
    },
    filters: {
      // 对数据做处理
      moneyFilter(money) {
        return money.toFixed(2);
      }
    },
    created() {
      Promise.all([this._getHomeData()])
        .finally(_ => {
          this.$toast.clear();
        });
    },
    methods: {
      /**
       * 获取首页数据
       */
      async _getHomeData() {
        let method = 'get';
        let path = Url.homeDataApi;
        this.$toast.loading({
          mask: true,
          message: '数据加载中...'
        });
        try {
          let homeData = await fetchHomeData(path, method);
          this.bannerResource = homeData.data.slides;
          this.category = homeData.data.category;
          this.adBanner = homeData.data.advertesPicture.PICTURE_ADDRESS; 
          this.recommendGoods = homeData.data.recommend;
          this.floorOne = homeData.data.floor1;
          this.floorTwo = homeData.data.floor2;
          this.floorThree = homeData.data.floor3;
          this.floorName = homeData.data.floorName;
          this.hotGoods = homeData.data.hotGoods;
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
    padding-left: 1rem;
    border-radius: 20px;
    outline: none;
    border: 1px solid #fff;
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
  .recommend-area {
    background: #fff;
    margin-top: .3rem;
  }
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #b532e9;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
  .hot-goods{
    background-color: #fff;
  }
  .hot-lists {
    display: flex;
    flex-wrap: wrap;
  }
  .hot-item {
    width: calc((1 / 2) * 100%);
  }
</style>