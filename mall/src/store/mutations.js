import * as types from './mutations-type';

const mutations = {
  // 设置 goodsDetails
  [types.GOODS_DETAILS](state, goodsDetails) {
    state.goodsDetails = goodsDetails;
  }
};

export default mutations;
