import ajax from '@/utils/ajax';

/**
 * 获取首页数据 | GET
 */
export const fetchHomeData = (path, method = 'get') => {
  return ajax(path, method);
};