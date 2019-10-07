import { 
  categoryCache, 
  locationCityCache,
  searchHistoryCache,
  browseHistoryCache,
  tokenCache,
  addressInfoCache
} from '@/assets/js/cache';

const state = {
  categoryList: categoryCache.getCache(), // 大分类列表
  locationCity: locationCityCache.getCache(), // 定位城市
  searchHistoryList: searchHistoryCache.getCache(), // 搜索历史
  browseHistoryList: browseHistoryCache.getCache(), // 浏览历史
  userToken: tokenCache.getCache(), // 用户 token
  orderPaymentList: [], // 订单支付列表 
  addressInfo: addressInfoCache.getCache(), // 地址信息
  tempAddress: {}, // 临时地址
};

export default state;
