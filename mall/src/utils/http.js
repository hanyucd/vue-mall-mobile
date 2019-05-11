import axios from 'axios';
import router from '@/router';

/**
 *  请求拦截器
 */
// axios.interceptors.request.use(config => {
//   console.log(config)
//   // 在发送请求之前做某事
//   if (window.localStorage.getItem('token')) {
//     config.headers['Authorization'] = `Bearer ${ window.localStorage.getItem('token') }`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// /**
//  * 添加响应拦截器
//  */
// axios.interceptors.response.use(response => {
//   // 对响应数据做些事
//   return Promise.resolve(response);
// }, error => {
//   if (error.response.status && error.response.status === 401) {
//     window.localStorage.removeItem('token');
//     router.replace('/login');
//   }
// });

export default axios;