<template>
  <div class="city-container">
    <van-nav-bar title="城市列表" left-arrow @click-left="back"/>
    
    <section class="city-search">
      <van-icon class="search-icon" name="search" />
      <input placeholder="请输入城市关键字" v-model="cityKeyword"/>
    </section>

    <section class="city-box">
      <b-scroll class="content-scroll">
        <div class="container">
          <!-- 当前城市 -->
          <section class="location-city">
            <p class="title">当前城市</p>
            <div class="city-list">
              <div class="city-wrapper">
                <p class="city-name">杭州</p>
              </div>
            </div>
          </section>
          <!-- 热门城市 -->
          <section class="hot-city">
            <p class="title">热门城市</p>
            <div class="city-list">
              <div class="city-wrapper" v-for="item of cities.data.hotCities" :key="item.id">
                <p class="city-name">{{ item.name }}</p>
              </div>
            </div>
          </section>
          <!-- 更多城市 -->
          <section class="more-city" v-for="(value, key) of cities.data.cities" :key="key">
            <p class="title">{{ key }}</p>
            <div class="city-list" v-for="item of value" :key="item.id">
              <p class="city-name">{{ item.name }}</p>
            </div>
          </section>
        </div>
      </b-scroll>
    </section>
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