import { addLocCacheTime, getLocCacheDate } from '@/utils/tools';

const storage = window.localStorage;

const CATEGORY_LIST = 'category_list'; // 分类 key
const LOCATION_CITY = 'location_city'; // 定位城市 key

const SEARCH_HISTORY = 'search_history'; // 搜素历史 key
const SEARCH_HISTORY_MAX = 20; // 搜索历史缓存最大长度

const BROWSE_HISTORY = 'browse_history'; // 浏览历史 key
const BROWSE_HISTORY_MAX = 20; // 浏览历史缓存最大长度

const USER_TOKEN = 'user_token'; // token key
const ADDRESS_INFO = 'address_info'; // 地址信息 key

/**
 * 商品大分类缓存
 */
let categoryCache = {
  setCache(categoryList = []) {
    storage.setItem(CATEGORY_LIST, JSON.stringify(categoryList));
    return categoryList;
  },
  getCache() {
    return storage.getItem(CATEGORY_LIST) ? JSON.parse(storage.getItem(CATEGORY_LIST)) : [];
  }
};

/**
 * 定位城市缓存
 */
let locationCityCache = {
  setCache(cityName = '') {
    const locCityData = addLocCacheTime(cityName);
    storage.setItem(LOCATION_CITY, JSON.stringify(locCityData));
    return locCityData;
  },
  getCache() {
    return getLocCacheDate(LOCATION_CITY);
  },
  deleteCache() {
    storage.removeItem(LOCATION_CITY);
    return null;
  }
};

/**
 * 搜索历史缓存
 */
let searchHistoryCache = {
  setCache(searchKeyword = '') {
    let searchHistoryList = this.getCache();

    if (searchHistoryList.length) {
      searchHistoryList.forEach((item, index) => {
        // 判断新的搜索关键字是否存在缓存中 | 存在则删除该项
        (item === searchKeyword) && searchHistoryList.splice(index, 1);
      });
    }
    // 添加元素到数组的头部
    searchHistoryList.unshift(searchKeyword);
    // 最多缓存 20 条数据 | 删除数组末尾的一个元素
    (searchHistoryList.length > SEARCH_HISTORY_MAX) && searchHistoryList.pop();

    storage.setItem(SEARCH_HISTORY, JSON.stringify(searchHistoryList));

    return searchHistoryList;
  },
  getCache() {
    return storage.getItem(SEARCH_HISTORY) ? JSON.parse(storage.getItem(SEARCH_HISTORY)) : [];
  },
  deleteCache() {
    storage.removeItem(SEARCH_HISTORY);
    return [];
  }
};

/**
 * 浏览历史缓存
 */
let browseHistoryCache = {
  setCache(browseHistory = null) {
    let browseHistoryList = this.getCache();

    if (browseHistoryList.length) {
      browseHistoryList.forEach((item, index) => {
        // 判断新的浏览历史是否存在缓存中 | 存在则删除该项
        (item.id === browseHistory.id) && browseHistoryList.splice(index, 1);
      });
    }
    // 添加元素到数组的头部
    browseHistoryList.unshift(browseHistory);
    // 最多缓存 20 条数据 | 删除数组末尾的一个元素
    (browseHistoryList.length > BROWSE_HISTORY_MAX) && browseHistoryList.pop();

    storage.setItem(BROWSE_HISTORY, JSON.stringify(browseHistoryList));

    return browseHistoryList;
  },
  getCache() {
    return storage.getItem(BROWSE_HISTORY) ? JSON.parse(storage.getItem(BROWSE_HISTORY)) : [];
  },
  deleteOneCache(goodsId = "") {
    let browseHistoryList = this.getCache();
    // 找到满足条件元素的下标
    let index = browseHistoryList.findIndex(item => item.id === goodsId);
    // 删除它
    browseHistoryList.splice(index, 1);
    
    storage.setItem(BROWSE_HISTORY, JSON.stringify(browseHistoryList));
    
    return browseHistoryList;
  }
};

/**
 * token 缓存
 */
let tokenCache = {
  setCache(userToken = '') {
    storage.setItem(USER_TOKEN, JSON.stringify(userToken));
    return userToken;
  },
  getCache() {
    return storage.getItem(USER_TOKEN) ? JSON.parse(storage.getItem(USER_TOKEN)) : '';
  },
  deleteCache() {
    storage.removeItem(USER_TOKEN);
    return '';
  }
}

/**
 * 地址信息 缓存
 */
let addressInfoCache = {
  setCache(addressInfo = {}) {
    storage.setItem(ADDRESS_INFO, JSON.stringify(addressInfo));
    return addressInfo;
  },
  getCache() {
    return storage.getItem(ADDRESS_INFO) ? JSON.parse(storage.getItem(ADDRESS_INFO)) : {};
  },
  deleteCache() {
    storage.removeItem(ADDRESS_INFO);
    return {};
  }
}

export {
  categoryCache, // 分类缓存
  locationCityCache, // 定位城市缓存
  searchHistoryCache, // 搜索历史缓存
  browseHistoryCache, // 浏览历史缓存
  tokenCache, // token 缓存
  addressInfoCache // 地址信息 缓存
};