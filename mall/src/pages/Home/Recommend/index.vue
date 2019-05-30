<template>
  <div id="swiper-wrapper">
    <p class="title">商品推荐</p>
    <swiper :options="swiperOption">
      <swiper-slide class="recommend-item" v-for="item of recommend" :key="item.goodsId">
        <img v-lazy="item.image" class="recommend-img" @click="goGoodsDetails(item)" />
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
          <section class="right" @click="goGoodsDetails(item)">查看详情</section>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  export default {
    name: 'Recommend',
    mixins: [ GoodsMixin ],
    components: { swiper, swiperSlide },
    props: {
      recommend: { type: Array, default: () => [] }
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
  @import './style.scss';
</style>