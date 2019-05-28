const storage = window.localStorage;
const CATEGORY_LIST = 'category_list'; // 分类 key

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

export {
  categoryCache, // 分类缓存
};