const storage = window.localStorage;
const CATEGORY_LIST = 'category_list'; // 分类 key
const SEARCH_HISTORY = 'search_history'; // 搜素历史 key
const SEARCH_HISTORY_MAX = 20; // 搜索历史缓存最大长度
const LOCATION_CITY = 'location_city'; // 定位城市 key
const DEF_LOCATION_CITY = '北京'; // 默认定位城市

// 分类缓存
let categoryCache = {
  setCache(categoryList = []) {
    storage.setItem(CATEGORY_LIST, JSON.stringify(categoryList));
    return categoryList;
  },
  getCache() {
    return storage.getItem(CATEGORY_LIST) ? JSON.parse(storage.getItem(CATEGORY_LIST)) : [];
  }
};

// 搜索历史缓存
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

// 城市缓存
let locationCityCache = {
  setCache(cityName = '') {
    storage.setItem(LOCATION_CITY, JSON.stringify(cityName));
    return cityName;
  },
  getCache() {
    return storage.getItem(LOCATION_CITY) ? JSON.parse(storage.getItem(LOCATION_CITY)) : DEF_LOCATION_CITY;
  }
};

export {
  categoryCache, // 分类缓存
  searchHistoryCache, // 搜索历史缓存
  locationCityCache, // 定位城市缓存
};