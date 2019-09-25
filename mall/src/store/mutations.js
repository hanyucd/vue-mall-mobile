import * as types from './mutations-type';

const mutations = {
  // 设置 state 中 goodsDetails
  [types.GOODS_DETAILS](state, goodsDetails) {
    state.goodsDetails = goodsDetails;
  },
  // 设置 state 中 categoryList
  [types.CATEGORY_LIST](state, categoryList) {
    state.categoryList = categoryList;
  },
  // 设置 state 中 locationCity
  [types.LOCATION_CITY](state, cityName) {
    state.locationCity = cityName;
  },
  // 设置 state 中 searchHistoryList
  [types.SEARCH_HISTORY_LIST](state, searchHistoryList) {
    state.searchHistoryList = searchHistoryList;
  },
  // 设置 state 中 browseHistoryList
  [types.BROWSE_HISTORY_LIST](state, browseHistoryList) {
    state.browseHistoryList = browseHistoryList;
  },
  // 设置 state 中 token
  [types.TOKEN](state, token) {
    state.token = token;
  },
};

export default mutations;
