import { categoryCache } from '@/assets/js/cache';

const state = {
  goodsDetails: {}, // 商品详情
  categoryList: categoryCache.getCache(), // 大分类列表
};

export default state;
