import { mapMutations, mapGetters, mapActions } from 'vuex';

export const GoodsMixin = {
  computed: {
    ...mapGetters(['goodsDetails', 'categoryList'])
  },
  methods: {
    ...mapMutations({ setGoodsDetails: 'GOODS_DETAILS' }),
    ...mapActions(['setCategoryList']),
    // 跳转商品详情页
    goGoodsDetails(item) {
      this.setGoodsDetails(item); // 调取 vuex 中 mutations 设置 state
      this.$router.push({ name: 'GoodsDetails', query: { goodsId: item.goodsId || item.id } });
    },
    // 退回到上一页
    back() {
      this.$router.animateFlag = 1;
      this.$router.go(-1);
    }
  }
}