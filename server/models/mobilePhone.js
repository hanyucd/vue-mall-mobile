const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobilePhoneSchema = new Schema({
  mobilePhone: Number, // 手机号
  ip: String, // 当前联网 ip
  sendCount: Number, // 发送次数
  currentDate: String, // 当前日期
  timestamp: { type: String, default: +new Date() }, // 短信发送的时间戳
});

module.exports = mongoose.model('MobilePhone', mobilePhoneSchema);