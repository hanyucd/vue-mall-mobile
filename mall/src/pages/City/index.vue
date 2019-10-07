<template>
  <div class="city-container">
    <top-bar title="城市列表" hasBack></top-bar>
    
    <section class="city-search">
      <van-icon class="search-icon" name="search" />
      <input placeholder="请输入城市关键字" v-model="cityKeyword" />
      <van-icon class="clear-icon" name="clear" v-show="cityKeyword" @click="clearSearchInput" />
    </section>

    <section class="city-box">
      <!-- 城市列表 -->
      <b-scroll
        class="content-scroll"
        v-show="!cityKeyword"
        ref="cityScrollRef"
        :listenScroll="listenScroll"
        :probeType="probeType"
        v-on:scroll="cityScroll"
      >
        <div class="container">
          <!-- 当前城市 -->
          <section class="location-city" ref="locCityRef">
            <p class="title">当前城市</p>
            <div class="city-list">
              <div class="city-wrapper">
                <p class="city-name loc-city">{{ locationCity ? locationCity.data : '北京' }}</p>
              </div>
            </div>
          </section>
          <!-- 热门城市 -->
          <section class="hot-city" ref="hotCityRef">
            <p class="title">热门城市</p>
            <div class="city-list">
              <div class="city-wrapper" v-for="item of cities.data.hotCities" :key="item.id">
                <p class="city-name" @click="setLocCity(item.name)">{{ item.name }}</p>
              </div>
            </div>
          </section>
          <!-- 更多城市 -->
          <section class="more-city" v-for="(value, key) of cities.data.cities" :key="key" ref="cityGroupRef">
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

      <!-- 固定顶部字母标题 -->
      <article class="fixed-top" v-show="topFixedTitle && !isSearchCity" ref="topTitleRef">
        <h1 class="fixed-title">{{ topFixedTitle }}</h1>
      </article>
    </section>

    <!-- 右侧字母导航列表 -->
    <letter-nav v-show="!cityKeyword" :letterList="letterList" :activeIndex="activeIndex" v-on:letter-evt="onLetterEvt"></letter-nav>
  </div>
</template>

<script>
  import cityData from '@/assets/js/city';
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import LetterNav from './LetterNav';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import { throttle } from '@/utils/tools'; // 导入节流函数

  export default {
    name: 'City',
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll, LetterNav },
    data() {
      return {
        cities: cityData, // 城市数据
        cityKeyword: '', // 搜索城市关键字
        isSearchCity: false, // 是否在搜索城市
        searchCityList: [], // 搜索城市列表
        listenScroll: true, // 监听滚动位置
        probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
        scrollY: 0, // 实时滚动的 Y 坐标
        topFixedTitle: '', // 顶部固定字母标题
        cityHeightList: [], // 城市区间列表列表高度
        activeIndex: -1, // 当前激活字母下标 | 传向子组件
        betweenDiff: 0 // 差距 | 用于顶部标题上移距离
      };
    },
    computed: {
      // 提取字母列表
      letterList() {
        return Object.keys(this.cities.data.cities);
      }
    },
    watch: {
      // 监听输入框变化，做函数节流 实现 搜索联想
      cityKeyword(newValue) {
        this.isSearchCity = newValue ? true : false;

        throttle(this._searchCity(), 300, 500);
      },
      // 监听 Y 轴滚动
      scrollY(newY) {
        (newY > 0 || -newY < this.cityHeightList[0]) && (this.topFixedTitle = '');

        for (let i = 0; i < this.cityHeightList.length; i++) {
          let height_1 = this.cityHeightList[i];
          let height_2 = this.cityHeightList[i + 1];

         if (-newY >= height_1 && -newY < height_2) {
           this.topFixedTitle = this.letterList[i]; // 设置顶部固定标题
           this.betweenDiff = newY + height_2; // 计算到顶部差距
         }
        }
      },
      // 监听差距
      betweenDiff(newDiff) {
        let diff = (newDiff > 0 && newDiff < 30) ? newDiff - 30 : 0;
        this.$refs.topTitleRef.style.transform = `translate3d(0, ${ diff }px, 0)`;
      },
      // 监听顶部固定标题变化
      topFixedTitle(newTitle) {
        if (!newTitle) {
          this.activeIndex = -1;
          return;
        }
        let index = this.letterList.indexOf(newTitle);
        this.activeIndex = index;
      }
    },
    mounted() {
      this._caclHeight();
    },
    activated() {
      // keep-alive 组件激活 cityScrollRef 滚动到顶部
      this.$refs.cityScrollRef.scrollTo(0, 0); 
    },
    methods: {
      /**
       * 选择定位城市
       */
      setLocCity(cityName) {
        this.setLocationCity(cityName);
        // 返回到上一页，方法在 loadMixin 中
        this.back();
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
      clearSearchInput() { this.cityKeyword = ''; },
      /**
       * 监听子组件派发的 scroll 事件 | 实时获取滚动的 Y 坐标
       */
      cityScroll(pos) { this.scrollY = pos.y; },
      /**
       * 计算每组城市区间高度
       */
      _caclHeight() {
        // 当前城市 + 热门城市高度
        let height = this.$refs.locCityRef.clientHeight + this.$refs.hotCityRef.clientHeight;
        this.cityHeightList.push(height);

        let cityGroup = this.$refs.cityGroupRef;
        for (let item of cityGroup) {
          height += item.clientHeight;
          this.cityHeightList.push(height);
        }
      },
      /**
       * 监听子组件派发事件，实现滚动元素到目标位置
       */
      onLetterEvt(index) {
        this.activeIndex = index;
        this.$refs.cityScrollRef.scrollToElement(this.$refs.cityGroupRef[index], 200);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>