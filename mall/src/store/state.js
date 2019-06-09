import { categoryCache, searchHistoryCache, cityCache } from '@/assets/js/cache';

const state = {
  goodsDetails: {}, // 商品详情
  categoryList: categoryCache.getCache(), // 大分类列表
  searchHistoryList: searchHistoryCache.getCache(), // 搜索历史
  city: cityCache.getCache(), // 城市
};

export default state;
