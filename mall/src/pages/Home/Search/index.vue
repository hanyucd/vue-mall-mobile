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
  import { GoodsMixin } from '@/mixins/goodsMixin';

  export default {
    name: "Search",
    mixins: [ GoodsMixin ],
    props: {
      searchResult: { type: Array, default: () => [] },
      searchKeyword: { type: String, default: '' }, // 搜索关键字
      isEmptySearchResult: { type: Boolean, default: false }, // 是否无搜索结果
    },
    components: { GoodsList, BScroll },
    data() {
      return {};
    },
    created() {
      this.setSearchHistory(['Node', 'vue', 'react']);
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>