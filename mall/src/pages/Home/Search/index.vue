<template>
  <transition name="bounce">
    <div class="search-result">
      <b-scroll class="content-scroll">
        <goods-list :goodsList="searchResult" :searchKeyword="searchKeyword"></goods-list>
        <article class="empty-search-result" v-show="isEmptySearchResult">暂无此搜索结果~~</article>
      </b-scroll>
    </div>
  </transition>
</template>

<script>
  import GoodsList from '@/components/GoodsList';
  import BScroll from '@/components/BScroll';

  export default {
    name: "Search",
    props: {
      searchResult: { type: Array, default: () => [] },
      searchKeyword: { type: String, default: '' }, // 搜索关键字
      isEmptySearchResult: { type: Boolean, default: false }, // 是否无搜索结果
    },
    components: { GoodsList, BScroll },
    data() {
      return {};
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>