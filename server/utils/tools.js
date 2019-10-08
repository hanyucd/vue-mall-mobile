let sd = require('silly-datetime');
let svgCaptcha = require('svg-captcha'); // 生成 svg 格式的验证码
let request = require('request');
let querystring = require('querystring');

/**
 * 工具封装
 */
class Tools {
  // 格式化当前日期
  getCurDate(format = 'YYYYMMDD') {
    // 默认返回格式：20190925
    return sd.format(new Date(), format);
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

  // ip 定位城市 | 使用百度地图 API
  ipLocation(clientIp) {
    let basicuri = 'http://api.map.baidu.com/location/ip?';
    
    const baiduMapParams = {
      ip: clientIp,
      ak: 'aTETpT7NGwDnUrTf7bROng6SttoQEv6O'
    };
    let queryData = querystring.stringify(baiduMapParams);

    let queryUrl = basicuri + queryData;

    return new Promise((resolve, reject) => {
      request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          // 解析接口返回的JSON内容
          let newBody = JSON.parse(body);
          resolve(newBody);
        } else {
          reject({ code: -1, err_msg: 'ip 定位请求异常' });
        }
      });
    });
  }
}

module.exports = new Tools();