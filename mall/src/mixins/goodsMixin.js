import { mapMutations, mapGetters, mapActions } from 'vuex';

export const GoodsMixin = {
  computed: {
    ...mapGetters([ 'goodsDetails' ])
  },
  methods: {
    ...mapMutations({ setGoodsDetails: 'GOODS_DETAILS' }),
    ...mapActions([]),
    // 跳转商品详情页
    goGoodsDetails(item) {
      this.setGoodsDetails(item); // 调取 vuex 中 mutations 设置 state
      this.$router.push({ name: 'GoodsDetails', query: { goodsId: item.goodsId } });
    }
  }
}