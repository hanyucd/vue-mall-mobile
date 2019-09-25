import { 
  categoryCache, 
  locationCityCache,
  searchHistoryCache, 
  browseHistoryCache,
  tokenCache
} from '@/assets/js/cache';
import * as types from './mutations-type';

// 设置大分类列表
const setCategoryList = ({ commit }, categoryList) => {
  commit(types.CATEGORY_LIST, categoryCache.setCache(categoryList));
};

// 设置定位城市
const setLocationCity = ({ commit }, cityName) => {
  commit(types.LOCATION_CITY, locationCityCache.setCache(cityName));
};

// 设置搜索历史列表
const setSearchHistory = ({ commit }, searchKeyword) => {
  commit(types.SEARCH_HISTORY_LIST, searchHistoryCache.setCache(searchKeyword));
};
// 删除搜索历史列表
const deleteSearchHistory = ({ commit }) => {
  commit(types.SEARCH_HISTORY_LIST, searchHistoryCache.deleteCache());
};

// 设置浏览历史列表
const setBrowseHistory = ({ commit }, browseHistory) => {
  commit(types.BROWSE_HISTORY_LIST, browseHistoryCache.setCache(browseHistory));
};
// 删除一条浏览历史
const deleteOneBrowseHistory = ({ commit }, goodsId) => {
  commit(types.BROWSE_HISTORY_LIST, browseHistoryCache.deleteOneCache(goodsId));
};

// 设置 token
const setToken = ({ commit }, token) => {
  commit(types.TOKEN, tokenCache.setCache(token));
};
// 删除 token
const deleteToken = ({ commit }) => {
  commit(types.TOKEN, tokenCache.deleteCache());
};


export default {
  setCategoryList, // 设置大分类列表
  setLocationCity, // 设置定位城市
  setSearchHistory, // 设置搜索历史列表
  deleteSearchHistory, // 删除搜索历史列表
  setBrowseHistory, // 设置浏览历史列表
  deleteOneBrowseHistory, // 删除一条浏览历史
  setToken, // 设置 token
  deleteToken, // 删除 token
};