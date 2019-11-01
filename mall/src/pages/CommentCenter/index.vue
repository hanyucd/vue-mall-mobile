<template>
  <div class="comment">
    <top-bar title="评价中心" hasBack></top-bar>
    <!-- 顶部图片 -->
    <section class="top-box">
      <img :src="commentBg" alt="">
      <!-- 标签 -->
      <div class="tab-wrap">
        <switch-tab v-on:switch-evt="curTabIndex = $event"></switch-tab>
      </div>
    </section>
    <!-- 内容区域 -->
    <section class="content">
      <!-- 待评价商品 -->
      <b-scroll class="content-scroll" v-if="curTabIndex === 0 && waitCommentList.length" :data="waitCommentList">
        <div class="container">
          <ul class="goods-list">
            <li class="goods-item" v-for="item of waitCommentList" :key="item._id">
              <section class="goods-img">
                <img :src="item.image_path" alt="">
              </section>
              <section class="goods-name">
                <p>{{ item.goods_name }}</p>
                <div class="comment-btn" @click="goCommentGoods(item.goodsId, item._id, item.order_id)">
                  <van-icon name="chat" />
                  <span>评论晒单</span>
                </div>
              </section>
            </li>
          </ul>
        </div>
      </b-scroll>
      <!-- 待评价商品 -->
      <b-scroll class="content-scroll" v-else-if="curTabIndex === 1">
        <div class="container">
        </div>
      </b-scroll>
    </section>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import SwitchTab from './SwitchTab';
import BScroll from '@/components/BScroll';
import ajax from '@/api';

export default {
  name: 'CommentCenter',
  components: { TopBar, SwitchTab, BScroll },
  data() {
    return {
      commentBg: require('@/assets/imgs/comment.jpg'),
      curTabIndex: 0,
      waitCommentList: [], // 待评价 list
      alreadyCommentList: [], // 已评价 list
    }
  },
  created() {
    this._queryWaitComment();
  },
  methods: {
    /**
     * 查询待评论商品列表
     */
    async _queryWaitComment() {
      try {
        const res = await ajax.queryWaitComment();
        if (res.code === 200) this.waitCommentList = res.waitCommentList;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 前去商品评价
     * @param {String} goodsId 商品 id
     * @param {String} orderId 订单 id
     * @param {String} orderNum 订单号
     */
    goCommentGoods(goodsId, orderId, orderNum) {
      this.$router.push({ name: 'CommentGoods', query: { goodsId }, params: { orderId, orderNum } });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>