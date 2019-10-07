<template>
  <div class="collection-list">
    <top-bar title="我的收藏" hasBack outBrowse></top-bar>

    <section class="collection-list-conatiner">
      <b-scroll class="content-scroll" v-if="dataList.length" :data="dataList" pullup v-on:scrollEnd="collectionScrollEnd">
        <goods-list :goodsList="dataList" isCollectionList :isLoadMore="isLoadMore" v-on:cancelOneCollection="cancelOneCollection"></goods-list>
      </b-scroll>
      
      <div v-if="!loadingStatus && !dataList.length" class="empty-collection-list">
        暂无收藏商品 ~~
      </div>
      <!-- 加载状态 -->
      <loading :loadingStatus="loadingStatus" type="spinner" />
    </section>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar';
  import BScroll from '@/components/BScroll';
  import GoodsList from '@/components/GoodsList';
  import { GoodsMixin } from '@/mixins/goodsMixin';
  import { loadMixin } from '@/mixins/loadMixin';
  import ajax from '@/api';

  export default {
    name: 'Collection',
    mixins: [ GoodsMixin, loadMixin ],
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
            this.loadingStatus = false;
            // 解锁，方法在 loadMixin 中
            this.unLocked();
          }
        } catch(error) {
          this.loadingStatus = false;
          this.unLocked(); // 解锁，方法在 loadMixin 中
          if (error.response && error.response.status === 401 || 403) this.$toast(error.response.data.msg);
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
       * 监听 better-scroll 滚动到底部事件，加载更多数据
       */
      collectionScrollEnd() {
        if (this.dataList.length >= 10) {
          if (this.hasMoreData()) {
            this.isLoadMore = true;
            this.page++;
            this._getCollectionList(this.isLoadMore);
          } else {
            this.isLoadMore = false;
            this.$toast('没有更多数据了~~');
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .collection-list {
    .collection-list-conatiner {
      position: fixed;
      top: 11.5vw;
      left: 0;
      right: 0;
      bottom: 0;
      .content-scroll {
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .empty-collection-list {
        text-align: center;
        margin-top: 100px;
        letter-spacing: 2px;
        color: #999 ;
      }
    }
  }
</style>
