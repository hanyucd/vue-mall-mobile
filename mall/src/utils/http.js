import axios from 'axios';
import store from '../store';
import router from '../router';
import { Toast } from 'vant';
import { Dialog } from 'vant';

/**
 * 数据请求 | 封装 axios
 */

axios.defaults.timeout = 3000; // 默认超时设置
axios.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/v1' : '/api'; // 相对路径设置
  
/**
 *  请求拦截器
 */
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事
  let token = store.getters.token;
  // 添加 token 到 headers 中
  (token) && (config.headers['Authorization'] = `Bearer ${ token }`);
  
  console.log("config", config)
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 响应拦截器
 */
// axios.interceptors.response.use(response => {
//   // 对响应数据做些事
//   return Promise.resolve(response);
// }, error => {
//   if (error.response.status && error.response.status === 401) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userName');
//     Dialog.confirm({ message: '用户认证信息过期', confirmButtonText: '前往登录' })
//       .then(() => {
//         router.push({ name: 'Login' });
//       }).catch(() => null);
//   }
//   return Promise.reject(error);
// });

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
            reject(res.data);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res.data);
        }
      })
      .catch(error => {
        console.log('网络错误!');
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
            reject(res.data);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res.data);
        }
      })
      .catch(error => {
        console.log('网络错误!');
        reject(error);
      });
  });
}

// export default function ajax(path, method, data = {}) {
//   let options = {};
//   options.url = path;
  
//   if (method.toLowerCase() === 'get') {
//     options.method = 'get';
//     (Object.keys(data).length !== 0) && (options.params = data);
//   } else {
//     options.method = method;
//     options.data = data;
//   }

//   return new Promise((resolve, reject) => {
//     axios(options)
//       .then(response => {
//         if (response.status === 200) {
//           if (response.data.code === 200 || !response.data.code) {
//             // 请求成功
//             resolve(response.data);
//           } else {
//             // 请求错误
//             reject(response.data);
//           }
//         } else {
//           // 服务器错误
//           Toast.fail('服务器错误!');
//           reject(response.data);
//         }
//       })
//       .catch(error => {
//         // console.log(error)
//         // 网络错误
//         // Toast.fail('网络错误!');
//         reject(error);
//       });
//   });
// }