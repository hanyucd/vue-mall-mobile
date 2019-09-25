import { mapMutations, mapGetters, mapActions } from 'vuex';

export const GoodsMixin = {
  computed: {
    ...mapGetters([
      'goodsDetails', // 商品详情
      'categoryList', // 大分类列表
      'locationCity', // 定位城市
      'searchHistoryList', // 搜索历史列表
      'browseHistoryList', // 浏览历史列表
      'token', // token
    ])
  },
  methods: {
    ...mapMutations({ setGoodsDetails: 'GOODS_DETAILS' }),
    ...mapActions([
      'setCategoryList', // 设置大分类列表
      'setLocationCity', // 设置定位城市
      'setSearchHistory', // 设置搜索历史列表
      'deleteSearchHistory', // 删除搜索历史列表
      'setBrowseHistory', // 设置浏览历史列表
      'deleteOneBrowseHistory', // 删除一条浏览历史
      'setToken', // 设置 token
      'deleteToken' // 删除 token
    ]),
    // 跳转商品详情页
    goGoodsDetails(item) {
      this.setGoodsDetails(item); // 调取 vuex 中 mutations 设置 state
      this.$router.push({ name: 'GoodsDetails', query: { goodsId: item.goodsId || item.id } });
    },
    // 退回到上一页
    back() {
      this.$router.go(-1);
    }
  }
}