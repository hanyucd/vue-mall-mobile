<template>
  <div class="comment-details">
    <top-bar title="评价详情" hasBack></top-bar>

    <article class="comment-wrap" v-if="commentDetails">
      <!-- 商品 -->
      <section class="goods">
        <div class="goods-img">
          <img :src="commentDetails.goods[0].image_path" alt="">
        </div>
        <p class="goods-name">{{ commentDetails.goods[0].name }}</p>
      </section>

      <section class="comment-box">
        <div class="title">评价内容:</div>
        <div class="comment-user">
          <!-- 图片 -->
          <section class="user-img">
            <img :src="commentDetails.user[0].avatar" alt="">
          </section>
          <!-- 评论内容 -->
          <section class="comment-content">
            <div class="top">
              <van-rate readonly v-model="commentDetails.rate" color="#b532e9" />
              <p class="time">{{ commentDetails.comment_time }}</p>
            </div>
            <div class="text">{{ commentDetails.content }}</div>
          </section>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import ajax from '@/api';

export default {
  name: 'CommentDetails',
  components: { TopBar },
  props: ['commentId'],
  data() {
    return {
      commentDetails: null // 评价详情
    };
  },
  created() {
    this._queryCommentDetails();
  },
  methods: {
    /**
     * 查询评价详情
     */
    async _queryCommentDetails() {
      const commentId = this.commentId;
      
      try {
        const res = await ajax.commentDetails(commentId);
        if (res.code === 200) this.commentDetails = res.commentDetails;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>