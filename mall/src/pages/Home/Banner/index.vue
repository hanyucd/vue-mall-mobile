<template>
  <!-- 轮播图 -->
  <div id="banner">
    <van-swipe :autoplay="3000" :duration="1500">
      <van-swipe-item v-for="item of slides" :key="item.goodsId">
        <img v-lazy="item.image" class="banner-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
    props: {
      slides: { type: Array, default: () => [] }
    }
  }
</script>

<style lang="scss" scoped>
  #banner {
    height: 0;
    padding-bottom: 53%;
    overflow: hidden;
    .banner-img {
      width: 100%;
      height: 200px;
    }
  }
</style>