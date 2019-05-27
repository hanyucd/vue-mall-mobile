import { categoryCache } from '@/assets/js/cache';
import * as types from './mutations-type';

// 设置分类列表
const setCategoryList = ({ commit }, categoryList) => {
  commit(types.CATEGORY_LIST, categoryCache.setCache(categoryList));
}

export default {
  setCategoryList, // 设置分类列表
}