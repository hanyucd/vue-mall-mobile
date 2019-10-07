import { 
  categoryCache, 
  locationCityCache,
  searchHistoryCache, 
  browseHistoryCache,
  tokenCache,
  addressInfoCache
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
// 删除定位城市
const deleteLocationCity = ({ commit }) => {
  commit(types.LOCATION_CITY, locationCityCache.deleteCache());
}

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

// 设置用户 token
const setUserToken = ({ commit }, userToken) => {
  commit(types.USER_TOKEN, tokenCache.setCache(userToken));
};
// 删除用户 token
const deleteUserToken = ({ commit }) => {
  commit(types.USER_TOKEN, tokenCache.deleteCache());
};

// 设置地址信息
const setAddressInfo = ({ commit }, addressInfo) => {
  commit(types.ADDRESS_INFO, addressInfoCache.setCache(addressInfo));
};
// 删除地址信息
const deleteAddressInfo = ({ commit }) => {
  commit(types.ADDRESS_INFO, addressInfoCache.deleteCache());
};

export default {
  setCategoryList, // 设置大分类列表
  setLocationCity, // 设置定位城市
  deleteLocationCity, // 删除定位城市
  setSearchHistory, // 设置搜索历史列表
  deleteSearchHistory, // 删除搜索历史列表
  setBrowseHistory, // 设置浏览历史列表
  deleteOneBrowseHistory, // 删除一条浏览历史
  setUserToken, // 设置用户 token
  deleteUserToken, // 删除用户 token
  setAddressInfo, // 设置地址信息
  deleteAddressInfo // 删除地址信息
};