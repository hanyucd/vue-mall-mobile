import { 
  categoryCache, 
  locationCityCache,
  searchHistoryCache,
  browseHistoryCache,
  tokenCache
} from '@/assets/js/cache';

const state = {
  goodsDetails: {}, // 商品详情
  categoryList: categoryCache.getCache(), // 大分类列表
  locationCity: locationCityCache.getCache(), // 定位城市
  searchHistoryList: searchHistoryCache.getCache(), // 搜索历史
  browseHistoryList: browseHistoryCache.getCache(), // 浏览历史
  userToken: tokenCache.getCache(), // 用户 token
  orderPaymentList: [], // 订单支付列表 
};

export default state;
