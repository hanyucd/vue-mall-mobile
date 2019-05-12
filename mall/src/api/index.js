import ajax from '@/utils/ajax';

/**
 * 获取首页数据 | GET
 */
export const fetchHomeData = (path, method = 'get') => {
  return ajax(path, method);
};

/**
 * 用户注册 | POST
 */
export const registerUser = (path, method = 'post', data) => {
  return ajax(path, method, data);
};

/**
 * 用户登录 | POST
 */
export const loginUser = (path, method = 'post', data) => {
  return ajax(path, method, data);
};

/**
 * 获取商品详情数据 | Post
 */
export const fetchGoodsInfoData = (path, method = 'get', data) => {
  return ajax(path, method, data);
};

/**
 * 获取大类数据 | GET
 */
export const fetchCategoryList = (path, method = 'get') => {
  return ajax(path, method);
}

/**
 * 获取所有商品分类子类 | POST
 */

export const fetchCategorySubList = (path, method = 'post', data) => {
  return ajax(path, method, data);
}

/**
 * 根据商品子类获取商品列表 | POST
 */
export const fetchGoodsList = (path, method = 'post', data) => {
  return ajax(path, method, data);
}

/**
 * 添加至购物车 | POST
 */
export const addToCart = (path, method = 'post', data) => {
  return ajax(path, method, data);
}

/**
 * 购物车商品数据 | GET
 */
export const fetchCartInfo = (path, method = 'get') => {
  return ajax(path, method);
}

/**
 * 添加至购物车 | POST
 */
export const editGoodsNum = (path, method = 'post', data) => {
  return ajax(path, method, data);
}

/**
 * 清空购物车 | POST
 */
export const clearCart = (path, method = 'post', data) => {
  return ajax(path, method, data);
}