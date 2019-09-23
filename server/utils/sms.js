let request = require('request');
let querystring = require('querystring');

/**
 * 当前选用聚合数据 https://www.juhe.cn SMS API （有免费使用短信条数）
 * 当然也可以选择其他第三方云服务提供商： 阿里云 | 腾讯云 | 网易云 | ... 
 * 
 * 发送手机短信验证码
 * @param {String} mobilePhone 接受短信的用户手机号码
 * @param {Number} randomNum 随机验证码
 */
function sendSMSCode(mobilePhone, randomNum) {
  let queryData = querystring.stringify({
    "mobile": mobilePhone,  // 接受短信的用户手机号码
    "tpl_id": "187915",  // 您申请的短信模板 ID，根据实际情况修改
    "tpl_value": `#code#=${ randomNum }`,  // 您设置的模板变量，根据实际情况修改
    "key": "d52256474eb6d73350e47eb52adbca67",  // 应用 APPKEY (应用详细页查询)
  });
  
  let queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;

  return new Promise((resolve, reject) => {
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // 解析接口返回的JSON内容
        let newBody = JSON.parse(body);
        resolve(newBody);
      } else {
        reject('请求异常');
      }
    });
  });
}

module.exports = sendSMSCode;