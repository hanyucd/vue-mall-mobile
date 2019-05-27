const storage = window.localStorage;
const CATEGORY_LIST = 'category_list'; // 分类 key

// 分类缓存
let categoryCache = {
  setCache(list = []) {
    storage.setItem(CATEGORY_LIST, list);
    console.log('set：', list)
    return list;
  },
  getCache() {
    console.log('get:', storage.getItem(CATEGORY_LIST))
    return (storage.getItem(CATEGORY_LIST)) ? storage.getItem(CATEGORY_LIST) : [];
  }
};

export {
  categoryCache, // 分类缓存
};