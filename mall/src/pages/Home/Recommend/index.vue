<template>
  <div id="swiper-wrapper">
    <p class="title">商品推荐</p>
    <swiper :options="swiperOption">
      <swiper-slide class="recommend-item" v-for="item of recommend" :key="item.goodsId">
        <img v-lazy="item.image" class="recommend-img" />
        <p class="name">{{ item.goodsName }}</p>
        <p class="price">
          <span class="code">￥</span>
          <span class="mall-price">{{ item.mallPrice }}</span>
          <span class="min-price">￥{{ item.price }}</span>
        </p>
        <div class="bottom-btn">
          <section class="left">
            <van-icon name="shopping-cart" />
          </section>
          <section class="right">查看详情</section>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  export default {
    name: 'Recommend',
    components: {
      swiper,
      swiperSlide,
    },
    props: {
      recommend: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          autoplay: true,
           pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color:#b532e9;

  #swiper-wrapper {
    .title {
      height: 35px;
      line-height: 35px;
      padding-left: 15px;
      font-size: 15px;
      color: $color;
      border-bottom: 1px solid #eee;
    }
    & .recommend-item {
      width: 33% !important;
      margin-right: 0 !important;
      overflow: hidden;
      text-align: center;
      padding-bottom: 5px;
      border-right: 1px solid #eee;
      &:last-child { border: none }
      .recommend-img {
        width: 80%;
      }
      .name {
        padding: 5px 0 0 7.5px;
        text-align: left;
        overflow: hidden;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        padding: 5px 0 0 7.5px;
        .code { font-size: 14px; }
        .mall-price { font-size: 15px; }
        .min-price {
          font-size: 12px;
          text-decoration: line-through;
          color: #999;
          display: inline-block;
          margin-left: 5px;
        }
      }
      .bottom-btn {
        margin-top: 10px;
        padding: 0 7.5px 0 7.5px;
        display: flex;
        .left {
          width: 30%;
          padding: 7.5px 2px;
          background: #FECA3A;
          border-radius: 5px 0 0 4px;
          color: #fff;
        }
        .right {
          flex: 1;
          text-align: center;
          box-sizing: border-box;
          padding: 10px 0;
          font-size: 12px;
          color: #fff;
          background: $color;
          border-radius: 0 5px 5px 0;
        }
      }
    }
  }
</style>