import * as types from './mutations-type';

const mutations = {
  // 设置 state 中 goodsDetails
  [types.GOODS_DETAILS](state, goodsDetails) {
    state.goodsDetails = goodsDetails;
  },
  // 设置 state 中 categoryList
  [types.CATEGORY_LIST](state, categoryList) {
    state.categoryList = categoryList;
  }
};

export default mutations;
