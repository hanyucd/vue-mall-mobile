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
      <!-- 已评价商品 -->
      <b-scroll class="content-scroll" v-else-if="curTabIndex === 1">
        <div class="container">
          <ul class="goods-list">
            <li class="goods-item" v-for="item of alreadyCommentList" :key="item._id">
              <section class="goods-img">
                <img :src="item.goods[0].image_path" alt="">
              </section>
              <section class="goods-name">
                <p>{{ item.goods[0].name }}</p>
                <div class="comment-btn" @click="viewGoodsComment(item._id)">
                  <van-icon name="search" />
                  <span>查看评论</span>
                </div>
              </section>
            </li>
          </ul>
        </div>
      </b-scroll>
      
      <!-- 加载状态 -->
      <loading :loadingStatus="loadingStatus" type="spinner" />
    </section>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import SwitchTab from './SwitchTab';
import BScroll from '@/components/BScroll';
import { GoodsMixin } from '@/mixins/goodsMixin';
import ajax from '@/api';

export default {
  name: 'CommentCenter',
  mixins: [ GoodsMixin ],
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
    this._alreadyComment();
  },
  methods: {
    /**
     * 查询待评论商品列表
     */
    async _queryWaitComment() {
      try {
        const res = await ajax.queryWaitComment();
        if (res.code === 200) this.waitCommentList = res.waitCommentList;
        this.loadingStatus = false;
      } catch (error) {
        this.loadingStatus = false;
        console.log(error);
      }
    },
    /**
     * 查询已评论商品列表
     */
    async _alreadyComment() {
      try {
        const res = await ajax.queryAlreadyComment();
        if (res.code === 200) this.alreadyCommentList = res.alreadyCommentList;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 前往商品评论
     * @param {String} goodsId 商品 id
     * @param {String} order_id 订单 _id
     * @param {String} orderNum 订单号
     */
    goCommentGoods(goodsId, order_id, orderNum) {
      this.$router.push({ name: 'CommentGoods', query: { goodsId }, params: { order_id, orderNum } });
    },
    /**
     * 查看评论详情
     * @param {String} comment_id 评论 _id
     */
    viewGoodsComment(comment_id) {
      this.$router.push({ name: 'CommentDetails', query: { commentId: comment_id } });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>