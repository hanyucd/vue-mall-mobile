
/**
 * 给本地缓存添加个时间
 * @param {String} value 值
 * @param {Number} expires 过期时间 默认 1天
 */
function addLocCacheTime(value, expires = 86400000) {
  return { expires, data: value, createTime: new Date().getTime() };
}

/**
 * 获取本地缓存数据
 * @param {String} key 缓存的键
 * @param {Number} expires 过期时间 默认 1天n
 */
function getLocCacheDate(key, expires = 86400000) {
  // 获取数据
  const data = window.localStorage.getItem(key);
  if (!data) return null;

  const dataObj = JSON.parse(data);
  // 与过期时间比较，过期返回 null，否则返回数据
  return (new Date().getTime() - dataObj.createTime > expires) ? null : dataObj;
}

/**
 * 函数节流方法
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
function throttle(fn, delay, atleast = 0) {
  let timer = null; // 记录定时器
  let previous = 0; // 记录上一次执行时间

  return (...args) => {
    let now = +new Date(); // 当前时间戳
    if (!previous) previous = now; // 赋值开始时间

    if (atleast && (now - previous) > atleast) {
      fn.apply(this, args);
      // 重置上一次开始时间为本次结束时间
      previous = now;
      timer && clearTimeout(timer);
    } else {
      timer && clearTimeout(timer); // 清除上次定时器
      timer = setTimeout(() => {
        fn.apply(this, args);
        console.log('else')
        previous = 0;
      }, delay);
    }
  }
}


export {
  addLocCacheTime, // 给本地缓存添加个时间
  getLocCacheDate, // 获取本地缓存数据
  throttle, // 函数节流
};