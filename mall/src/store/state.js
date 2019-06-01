import { categoryCache, searchHistoryCache } from '@/assets/js/cache';

const state = {
  goodsDetails: {}, // 商品详情
  categoryList: categoryCache.getCache(), // 大分类列表
  searchHistoryList: searchHistoryCache.getCache(), // 搜索历史
};

export default state;
