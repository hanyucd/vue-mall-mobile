import { categoryCache, searchHistoryCache, locationCityCache } from '@/assets/js/cache';

const state = {
  goodsDetails: {}, // 商品详情
  categoryList: categoryCache.getCache(), // 大分类列表
  searchHistoryList: searchHistoryCache.getCache(), // 搜索历史
  locationCity: locationCityCache.getCache(), // 定位城市
};

export default state;
