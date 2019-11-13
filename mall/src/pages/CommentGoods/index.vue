<template>
  <div class="comment-goods">
    <top-bar title="评价商品" hasBack></top-bar>
    <!-- 商品评分 -->
    <section class="top-goods">
      <div class="goods-img">
        <img :src="goodsInfo.image_path" alt="">
      </div>
      <div class="goods-rate">
        <p class="rate-txt">商品评分</p>
        <van-rate v-model="rate" allow-half color="#b532e9" />
      </div>
    </section>
    <!-- 评论框 -->
    <section class="comment-text">
      <van-field class="def-sty" v-model="content" type="textarea" rows="6" maxlength="120" placeholder="说说你的购买感受吧~~" />
      <van-uploader v-model="imgList" :max-count="5" :after-read="afterRead" />
    </section>
    <!-- 匿名评价 -->
    <section class="check-box">
      <van-checkbox v-model="checked" checked-color="#b532e9">匿名评价</van-checkbox>
    </section>
    <!-- 提交评论 -->
    <section class="submit-btn" @click="submit">提交评论</section>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import ajax from '@/api';

export default {
  name: 'CommentGoods',
  components: { TopBar },
  props: [ 'goodsId', 'order_id', 'orderNum' ],
  data() {
    return {
      goodsInfo: {}, // 商品信息
      rate: 5, // 商品评分
      content: '', // 评论内容
      imgList: [], // 图片
      checked: false, // 是否匿名
    }
  },
  created() {
    this._getGoodsDetails();
  },
  methods: {
    /**
     * 商品详情
     */
    async _getGoodsDetails() {
      const goodsId = this.goodsId;
      try {
        const res = await ajax.getGoodsDetails(goodsId);
        if (res.code === 200) this.goodsInfo = res.result;
      } catch (error) {
        console.log(error);
      }
    },
    afterRead(file, detail) {
      // TO DO
    },
    /**
     * 提交评论
     */
    async submit() {
      if (!this.content) return this.$toast("请输入评论的内容~~");

      const args = {
        goodsId: this.goodsId,
        rate: this.rate,
        content: this.content,
        anonymous: this.checked,
        images: this.imgList,
        order_id: this.order_id,
        orderNum: this.orderNum
      };
      try {
        const res = await ajax.commentGoods(args);
        if (res.code === 200) {
          this.$toast(res.msg);

          setTimeout(() => {
            this.$router.back();
          }, 1500);
        }
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