const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobilePhoneSchema = new Schema({
  mobilePhone: Number, // 手机号
  clientIp: String, // 客户端 ip
  sendCount: Number, // 发送次数
  curDate: String, // 当前日期
  sendTimestamp: { type: String, default: +new Date() }, // 短信发送的时间戳
});

module.exports = mongoose.model('MobilePhone', mobilePhoneSchema);