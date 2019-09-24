let sd = require('silly-datetime');
let svgCaptcha = require('svg-captcha'); // 生成 svg 格式的验证码

/**
 * 工具封装
 */
class Tools {
  // 格式化当前日期
  getCurDate() {
    // 返回格式：20190925
    return sd.format(new Date(), 'YYYYMMDD');
  }

  // 生成 svg 格式的验证码
  createCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 1,
      fontSize: 35,
      width: 100,
      height: 35,
      background: '#bc51e6'
    });

    return captcha;
  }
}

module.exports = new Tools();