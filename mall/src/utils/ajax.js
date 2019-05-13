import axios from './http';
import { Toast } from 'vant';

/**
 * 数据请求 | 封装 axios
 */
export default function ajax(path, method, data = {}) {
  let options = {};
  options.url = path;
  
  if (method.toLowerCase() === 'get') {
    options.method = 'get';
    (Object.keys(data).length !== 0) && (options.params = data);
  } else {
    options.method = method;
    options.data = data;
  }

  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => {
        if (response.status === 200) {
          if (response.data.code === 200 || !response.data.code) {
            // 请求成功
            resolve(response.data);
          } else {
            // 请求错误
            reject(response.data);
          }
        } else {
          // 服务器错误
          Toast.fail('服务器错误!');
          reject(response.data);
        }
      })
      .catch(error => {
        // console.log(error)
        // 网络错误
        // Toast.fail('网络错误!');
        reject(error);
      });
  });
}