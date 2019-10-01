import axios from 'axios';
import store from '../store';
import router from '../router';
import { locationCityCache } from '@/assets/js/cache';
import { Toast } from 'vant';
import { Dialog } from 'vant';

/**
 * 数据请求 | 封装 axios
 */

axios.defaults.timeout = 10000; // 默认超时设置 10s
axios.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/v1' : '/api'; // 相对路径设置
  
/**
 *  请求拦截器
 */
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事
  const userToken = store.getters.userToken;
  // 添加 token 到 headers 中
  (userToken) && (config.headers['Authorization'] = `Bearer ${ userToken }`);
  // 若缓存中不存在定位城市 或者 过期，则执行删除本地缓存
  (!locationCityCache.getCache()) && store.dispatch('deleteLocationCity');
  
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  return Promise.resolve(response);
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: console.log('错误请求'); break;
      case 401: 
        store.dispatch('deleteUserToken'); 
        break;
      case 403: console.log('拒绝访问'); break;
      case 404: console.log('请求错误,未找到该资源'); break;
      case 405: console.log('请求方法未允许'); break;
      case 408: console.log('请求超时'); break;
      case 500: console.log('服务器端出错'); break;
      case 501: console.log('网络未实现'); break;
      case 502: console.log('网络错误'); break;
      case 503: console.log('服务不可用'); break;
      case 504: console.log('网络超时'); break;
      case 505: console.log('http 版本不支持该请求'); break;
      default: console.log(`连接错误${ error.response.status }`);
    }
  } else {
    console.log('连接到服务器失败');
  }
  return Promise.reject(error);
});

/**
 * 封装 get 方法
 * @param {String} url
 * @param {Object} params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        if (res.status === 200) {
          if (res.data || !res.data.code) {
            // 请求成功
            resolve(res.data);
          } else {
            // 请求错误
            reject(res);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res);
        }
      })
      .catch(error => {
        // console.log('网络错误!');
        reject(error);
      });
  });
}

/** 
 * 封装 post 方法
 * @param {String} url
 * @param {Object} params
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        if (res.status === 200) {
          if (res.data || !res.data.code) {
            // 请求成功
            resolve(res.data);
          } else {
            // 请求错误
            reject(res);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res);
        }
      })
      .catch(error => {
        // console.log('网络错误!');
        reject(error);
      });
  });
}