<template>
  <transition name="bounce">
    <div class="search-result-container">
      <!-- 搜索结果 -->
      <b-scroll class="content-scroll" v-if="searchResult.length">
        <goods-list :goodsList="searchResult" :searchKeyword="searchKeyword"></goods-list>
      </b-scroll>
      
      <article class="empty-search-result" v-show="isEmptySearchResult">暂无此搜索结果~~</article>

      <!-- 搜索历史 -->
      <div class="search-history-wrap" v-if="!searchKeyword && !isEmptySearchResult && searchHistoryList.length">
        <section class="s-h-title">
          <span>搜索历史</span>
          <span class="s-h-clear" @click="DeleteSearchHisory"><van-icon name="delete" /></span>
        </section>
        <section class="s-h-list">
          <span class="s-h-name" v-for="(item, index) in searchHistoryList" :key="index" @click="clickSearch(item)">
            {{ item }}
          </span>
        </section>
      </div>
      
      <article class="empty-search-history" v-show="!searchResult.length && !searchHistoryList.length && !isEmptySearchResult">暂无搜索历史~~</article>
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
      console.log(this.searchHistoryList)
    },
    watch: {
      // 监听搜索结果 
      searchResult(newResult) {
        if (!newResult.length) return;
        // 存在相关结果则缓存
        (this.searchKeyword) && this.setSearchHistory(this.searchKeyword);
      }
    },
    methods: {
      /**
       * 清空搜索历史
       */
      DeleteSearchHisory() {
        this.$dialog.confirm({
          title: '提示',
          message: '确认删除搜索历史?'
        }).then(() => {
          // 调用 Vuex 中的 Actions，方法在 GoodsMixin 中
          this.deleteSearchHistory();
        }).catch(() => null);
      },
      /**
       * 点击搜索关键字 | 向父组件传值
       */
      clickSearch(searchKeyword) { this.$emit('click-search', searchKeyword) }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>