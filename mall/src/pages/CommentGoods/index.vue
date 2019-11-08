<template>
  <div class="comment-goods">
    <top-bar title="评价商品" hasBack></top-bar>
    <section class="top-goods">
      <div class="goods-img">
        <img :src="goodsInfo.image_path" alt="">
      </div>
      <div class="goods-rate">
        <p class="rate-txt">商品评分</p>
        <van-rate v-model="rate" allow-half color="#b532e9" />
      </div>
    </section>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import ajax from '@/api';

export default {
  name: 'CommentGoods',
  components: { TopBar },
  props: [ 'goodsId', 'orderId', 'orderNum' ],
  data() {
    return {
      goodsInfo: {}, // 商品信息
      rate: 5, // 商品评分
      content: '', // 评论内容
    }
  },
  created() {
    console.log(this.goodsId, this.orderId, this.orderNum);
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
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>