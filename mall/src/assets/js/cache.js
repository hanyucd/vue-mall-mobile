const storage = window.localStorage;
const CATEGORY_LIST = 'category_list'; // 分类 key
const SEARCH_HISTORY = 'search_history'; // 搜素历史 key

// 分类缓存
let categoryCache = {
  setCache(list = []) {
    storage.setItem(CATEGORY_LIST, JSON.stringify(list));
    return list;
  },
  getCache() {
    return storage.getItem(CATEGORY_LIST) ? JSON.parse(storage.getItem(CATEGORY_LIST)) : [];
  }
};

// 搜索历史缓存
let searchHistoryCache = {
  setCache(searchHistoryList = []) {
    storage.setItem(SEARCH_HISTORY, JSON.stringify(searchHistoryList));
    return searchHistoryList;
  },
  getCache() {
    return storage.getItem(SEARCH_HISTORY);
  }
};

export {
  categoryCache, // 分类缓存
  searchHistoryCache, // 搜索历史缓存
};