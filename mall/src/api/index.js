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