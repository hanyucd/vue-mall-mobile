<template>
  <div class="browse-history">
    <top-bar title="浏览历史" hasBack outBrowse></top-bar>

    <b-scroll class="content-scroll" :data="browseHistoryList">
      <div v-if="!browseHistoryList.length" class="empty-browse-history">
        暂无浏览历史 ~~
      </div>
      <goods-list v-else :goodsList="browseHistoryList" isBrowseHistory v-on:deleteOneHistory="removeOneHistory"></goods-list>
    </b-scroll>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import GoodsList from '@/components/GoodsList';
  import { GoodsMixin } from '@/mixins/goodsMixin';

  export default {
    name: "BrowseHistory",
    mixins: [ GoodsMixin ],
    components: { TopBar, BScroll, GoodsList },
    methods: {
      /**
       * 删除一条浏览历史 | 方法在 GoodsMixin 中
       */
      removeOneHistory(item) { this.deleteOneBrowseHistory(item.id) }
    }
  }
</script>

<style lang="scss" scoped>
  .browse-history {
    .content-scroll {
      position: fixed;
      top: 11.5vw;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      .empty-browse-history {
        text-align: center;
        margin-top: 100px;
        letter-spacing: 2px;
        color: #999 ;
      }
    }
  }
</style>