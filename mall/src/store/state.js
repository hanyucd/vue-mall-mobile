import { categoryCache } from '@/assets/js/cache';

const state = {
  goodsDetails: {}, // 商品详情
  categoryList: categoryCache.getCache(), // 分类
};

export default state;
