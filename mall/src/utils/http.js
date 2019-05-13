import axios from 'axios';
import router from '../router';
import { Dialog } from 'vant';

/**
 *  请求拦截器
 */
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事
  let token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${ token }`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  return Promise.resolve(response);
}, error => {
  if (error.response.status && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    Dialog.confirm({ message: '用户认证信息过期', confirmButtonText: '前往登录' })
      .then(() => {
        router.push({ name: 'Login' });
      }).catch(() => null);
  }

  return Promise.reject(error);
});

export default axios;