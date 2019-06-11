<template>
  <div class="city-container">
    <van-nav-bar title="城市列表" left-arrow @click-left="back"/>
    
    <section class="city-search">
      <van-icon class="search-icon" name="search" />
      <input placeholder="请输入城市关键字" v-model="cityKeyword" />
      <van-icon class="clear-icon" name="clear" v-show="cityKeyword" @click="clearSearchInput" />
    </section>

    <section class="city-box">
      <!-- 城市列表 -->
      <b-scroll class="content-scroll" v-show="!cityKeyword">
        <div class="container">
          <!-- 当前城市 -->
          <section class="location-city">
            <p class="title">当前城市</p>
            <div class="city-list">
              <div class="city-wrapper">
                <p class="city-name">{{ locationCity }}</p>
              </div>
            </div>
          </section>
          <!-- 热门城市 -->
          <section class="hot-city">
            <p class="title">热门城市</p>
            <div class="city-list">
              <div class="city-wrapper" v-for="item of cities.data.hotCities" :key="item.id">
                <p class="city-name" @click="setLocCity(item.name)">{{ item.name }}</p>
              </div>
            </div>
          </section>
          <!-- 更多城市 -->
          <section class="more-city" v-for="(value, key) of cities.data.cities" :key="key">
            <p class="title">{{ key }}</p>
            <div class="city-list" v-for="item of value" :key="item.id">
              <p class="city-name" @click="setLocCity(item.name)">{{ item.name }}</p>
            </div>
          </section>
        </div>
      </b-scroll>

      <!-- 搜索相关城市结果 -->
      <b-scroll class="content-scroll" v-show="cityKeyword" :data="searchCityList">
        <ul class="search-list">
          <li class="search-item" v-for="item of searchCityList" :key="item.id" @click="setLocCity(item.name)">
            {{ item.name }}
          </li>
        </ul>
        <!-- 无相关搜索结果 -->
        <article class="null-search" v-show="!searchCityList.length">暂时没有相关数据~~</article>
      </b-scroll>
    </section>
  </div>
</template>

<script>
  import cityData from '@/assets/js/city';
  import BScroll from '@/components/BScroll';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import { throttle } from '@/utils/tools'; // 导入节流函数

  export default {
    name: 'City',
    mixins: [ GoodsMixin ],
    components: { BScroll },
    data() {
      return {
        cities: cityData, // 城市数据
        cityKeyword: '', // 搜索城市关键字
        searchCityList: [], // 搜索城市列表
      };
    },
    watch: {
      // 监听输入框变化做函数节流 实现 搜索联想
      cityKeyword() {
        throttle(this._searchCity(), 300, 500);
      }
    },
    methods: {
      /**
       * 选择定位城市
       */
      setLocCity(cityName) {
        this.setLocationCity(cityName);
        // this.back();
      },
      /**
       * 搜索相关城市
       */
      _searchCity() {
        let result = [];
        let cities = this.cities;

        for (let key in cities.data.cities) {
          cities.data.cities[key].forEach(item => {
            // includes()：返回布尔值，表示是否找到了参数字符串。
            (item.spell.includes(this.cityKeyword) || item.name.includes(this.cityKeyword)) && result.push(item);
          });
        }

        this.searchCityList = result;
      },
      /**
       * 清空搜索框关键字
       */
      clearSearchInput() { this.cityKeyword = ''; }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>