<template>
  <div class="collection-list">
    <top-bar title="我的收藏" hasBack outBrowse></top-bar>

    <b-scroll class="content-scroll" :data="dataList" v-on:scrollEnd="collectionScrollEnd">
      <div v-if="!dataList.length" class="empty-collection-list">
        暂无收藏商品 ~~
      </div>
      <goods-list v-else :goodsList="dataList" isCollectionList v-on:cancelOneCollection="cancelOneCollection"></goods-list>
    </b-scroll>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import GoodsList from '@/components/GoodsList';
  import { loadMixin } from '@/mixins/loadMixin';
  import ajax from '@/api';

  export default {
    name: 'Collection',
    mixins: [ loadMixin ],
    components: { TopBar, BScroll, GoodsList },
    data() {
      return {
        page: 1, // 页数
        isLoadMore: false, // 是否加载更多
      };
    },
    created() {
      this._getCollectionList(this.isLoadMore);
    },
    methods: {
      /**
       * 获取用户已收藏的商品列表
       * @param {Boolean} isLoadMore 是否加载更多
       */
      async _getCollectionList(isLoadMore) {
        // 判断上一次请求是否完成 | 必须等待上一次请求完成才继续向下执行，方法在 loadMixin 中
        if (this.isLocked()) return;
        // 上锁，方法在 loadMixin 中
        this.locked(); 
        try {
          const res = await ajax.getCollectionList(this.page);
          if (res.code === 200) {
            this.setDataTotal(res.total); // 设置数据总数，方法在 loadMixin 中
            // 判断是加载更多还是一次新的请求，方法在 loadMixin 中
            isLoadMore
              ? this.addMoreData(res.collectionList)
              : this.dataList = res.collectionList;
            // 解锁，方法在 loadMixin 中
            this.unLocked();
          }
        } catch(error) {
          // 解锁，方法在 loadMixin 中
          this.unLocked();
          console.log(error);
        }
      },
      /**
       * 取消收藏
       */
      async cancelOneCollection(item, index) {
        try {
          let res = await ajax.collectionHandle(item.goodsId, 0); // 0: 指取消收藏
          if (res.code == 200) this.dataList.splice(index, 1);
          this.$toast(res.msg);
        } catch(error) {
          console.log(error);
        }
      },
      /**
       * 滚动到底部
       */
      collectionScrollEnd() {}
    }
  }
</script>

<style lang="scss">
  .collection-list {
    .content-scroll {
      position: fixed;
      top: 11.5vw;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
    .empty-collection-list {
      text-align: center;
      margin-top: 100px;
      letter-spacing: 2px;
      color: #999 ;
    }
  }
</style>
