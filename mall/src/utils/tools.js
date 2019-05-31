
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
    previous = !previous ? now : previous; // 记录开始时间

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
  throttle, // 函数节流
};