<template>
  <div class="city-container">
    <van-nav-bar title="城市列表" left-arrow @click-left="back"/>
    <section class="city-search">
      <van-icon class="search-icon" name="search" />
      <input placeholder="请输入城市关键字" v-model="cityKeyword"/>
    </section>
    <b-scroll>
    </b-scroll>
  </div>
</template>

<script>
  import BScroll from '@/components/BScroll';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import cityData from '@/assets/js/city';

  export default {
    name: 'City',
    mixins: [ GoodsMixin ],
    components: { BScroll },
    data() {
      return {
        cities: cityData, // 城市数据
        cityKeyword: '', // 搜索城市关键字
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>