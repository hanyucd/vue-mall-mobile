import { mapMutations, mapGetters, mapActions } from 'vuex';
import Loading from '@/components/Loading';

export const GoodsMixin = {
  components: { Loading },
  data() {
    return {
      loadingStatus: true // 是否显示加载状态
    }
  },
  computed: {
    ...mapGetters([
      'goodsDetails', // 商品详情
      'categoryList', // 大分类列表
      'locationCity', // 定位城市
      'searchHistoryList', // 搜索历史列表
      'browseHistoryList', // 浏览历史列表
      'userToken', // 用户 token
      'orderPaymentList', // 订单支付列表
    ])
  },
  methods: {
    ...mapMutations({ 
      setGoodsDetails: 'GOODS_DETAILS',
      setOrderPaymentList: 'ORDER_PAYMENT_LIST', // 设置订单支付列表
    }),
    ...mapActions([
      'setCategoryList', // 设置大分类列表
      'setLocationCity', // 设置定位城市
      'setSearchHistory', // 设置搜索历史列表
      'deleteSearchHistory', // 删除搜索历史列表
      'setBrowseHistory', // 设置浏览历史列表
      'deleteOneBrowseHistory', // 删除一条浏览历史
      'setUserToken', // 设置用户 token
      'deleteUserToken' // 删除用户 token
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