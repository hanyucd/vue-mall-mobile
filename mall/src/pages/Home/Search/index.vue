<template>
  <transition name="bounce">
    <div class="search-result-container">
      <!-- 搜索结果 -->
      <b-scroll class="content-scroll" :pullup="true" v-if="searchResult.length" v-on:scrollEnd="scrollEnd">
        <goods-list :goodsList="searchResult" :searchKeyword="searchKeyword" :isloadMore="isloadMore"></goods-list>
      </b-scroll>
      
      <article class="empty-search-result" v-show="isEmptySearchResult">暂无此搜索结果~~</article>

      <!-- 搜索历史 -->
      <div class="search-history-wrap" v-if="!searchKeyword && !isEmptySearchResult && searchHistoryList.length">
        <section class="s-h-title">
          <span>搜索历史</span>
          <span class="s-h-clear" @click="DeleteSearchHisory"><van-icon name="delete" /></span>
        </section>
        <section class="s-h-list">
          <span class="s-h-name" v-for="(item, index) in searchHistoryLimitList" :key="index" @click="clickSearch(item)">
            {{ item }}
          </span>
          <p class="more" v-show="searchHistoryList.length > 5" @click="clickMore">
            {{ limit === 5 ? '展开更多历史' : '收起更多历史' }}
            <van-icon v-if="limit === 5" name="arrow-down" />
            <van-icon v-else name="arrow-up" />
          </p>
        </section>
      </div>
      
      <article class="empty-search-history" v-show="!searchResult.length && !searchHistoryList.length && !isEmptySearchResult">暂无搜索历史~~</article>
      <!-- 加载状态 -->
      <loading :loadingStatus="searchStatus" type="spinner" />
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
      searchStatus: { type: Boolean, default: false }, // 搜索状态
      isEmptySearchResult: { type: Boolean, default: false }, // 是否无搜索结果
      isloadMore: { type: Boolean, default: false } // 是否加载更多
    },
    components: { GoodsList, BScroll },
    data() {
      return {
        limit: 5,
      };
    },
    computed: {
      // 搜索历史限制数组
      searchHistoryLimitList() {
        if (!this.searchHistoryList.length) return;
        
        return this.searchHistoryList.slice(0, this.limit);
      }
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
          message: '确定删除搜索历史?',
          confirmButtonText: '确定',
          confirmButtonColor: '#b532e9'
        }).then(() => {
          // 调用 Vuex 中的 Actions，方法在 GoodsMixin 中
          this.deleteSearchHistory();
        }).catch(() => null);
      },
      /**
       * 点击搜索关键字 | 派发事件向父组件传值
       */
      clickSearch(searchKeyword) { this.$emit('click-search', searchKeyword) },
      /**
       * 点击更多 | 展开 或 收起
       */
      clickMore() {
        this.limit === 5
          ? this.limit = this.searchHistoryList.length
          : this.limit = 5;
      },
      /**
       * 滚动到底部 派发事件到父组件
       */
      scrollEnd() { this.$emit('scrollEnd') }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>