const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 地址管理数据模型
const AddressManageSchema = new Schema({
  userId: String, // 用户 ID
  name: String, // 收货人姓名
  tel: String, // 收货人电话
  province: String, // 省份
  city: String, // 城市
  county: String, // 区县
  address_detail: String, // 详细地址
  area_code: String, // 地区编码
  is_default: Boolean, // 是否为默认地址
  total_address: String, // 总地址
  createAt: { type: Number, default: +new Date() } // 创建时间
});

module.exports = mongoose.model('AddressManage', AddressManageSchema);