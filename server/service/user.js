const MobilePhoneModel = require('../models/mobilePhone');
const UserModel = require('../models/user');
const sendSMSCode = require('../utils/sms');

class userService {
  /**
   * 发送短信验证码
   * 
   * 同一个 ip，一天只能向手机号码发送 10 次
   */
  async dispatchSMSCode({ mobilePhone, clientIp, curDate }) {
    // console.log('服务:', mobilePhone, clientIp, curDate)
    let smsSendMax = 6; // 设定短信发送限制数
    let ipCountMax = 10; // 设定 ip 数限制数
    let randomNum = ''; // 随机数字字符串
    let randomNumLen = 6; // 随机数字字符串长度
    for (let i = 0; i < randomNumLen; i++) {
      randomNum += Math.floor(Math.random() * 10);
    }
    console.log('random:', randomNum)

    try {
      // 根据当前日期查询到相应文档
      let mobilePhoneDoc = await MobilePhoneModel.findOne({ curDate });
      // 同一天，同一个 ip 文档条数
      let clientIpCount = await MobilePhoneModel.find({ clientIp, curDate }).countDocuments();

      if (mobilePhoneDoc) {
        // 60 秒之后可再次发送 | 限制 60 秒内无法再发送 sms APi
        if (((+new Date() / 1000) - mobilePhoneDoc.sendTimestamp / 1000) < 60) {
          return {
            code: 4010,
            time: 60 - Math.floor(((+new Date() / 1000) - mobilePhoneDoc.sendTimestamp / 1000)),
            msg: '限制 60 秒内无法再发送短信验证码'
          }
        }

        // 说明次数未到到限制，可继续发送
        if (mobilePhoneDoc.sendCount < smsSendMax && clientIpCount < ipCountMax) {
          let sendCount = mobilePhoneDoc.sendCount + 1;
          // 更新单个文档
          await mobilePhoneDoc.updateOne({ _id: mobilePhoneDoc._id }, { sendCount, sendTimestamp: +new Date() });
          // 执行发送短信验证码
          // const data = sendSMSCode(mobilePhone, randomNum);
          switch (data.error_code) {
            case 0:
              return { randomNum, code: 200, msg: '验证码发送成功' };
            case 10012:
              return { randomNum, code: 5000, msg: '没有免费短信了' };
            default:
              return { randomNum, code: 4000, msg: '未知错误' };
          }
        } else {
          return { code: 4020, msg: '当前手机号码发送次数达到上限，明天重试' };
        }

      } else {
        return { randomNum, code: 200, msg: '验证码发送成功' };
        // 执行发送短信验证码
        // const data = sendSMSCode(mobilePhone, randomNum);
        switch (data.error_code) {
          case 0:
            // 创建新文档 | 新增数据
            let mPdoc = await MobilePhoneModel.create({ mobilePhone, clientIp, curDate, sendCount: 1 });
            console.log(mPdoc)
            return { randomNum, code: 200, msg: '验证码发送成功' };
          case 10012:
            return { randomNum, code: 5000, msg: '没有免费短信了' };
          default:
            return { randomNum, code: 4000, msg: '未知错误' };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 用户账号处理：注册 & 登录
   * @param {Object} 
   * @param {Boolean} handleFlag 处理标识 true: 注册, false: 登录
   */
  async accountHandle({ userName, password, mobilePhone }, handleFlag = true) {
    try {
      let userDoc = await UserModel.findOne({ mobilePhone });
      if (!userDoc) {
        let userEntity = new UserModel({ userName, password, mobilePhone });
        // 保存到数据库中
        let user = await userEntity.save();
        return user;
      } else {
        if (userDoc.mobilePhone === mobilePhone) return { code: 1, msg: '账号号已存在, 可直接登录' };
      }
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = new userService();