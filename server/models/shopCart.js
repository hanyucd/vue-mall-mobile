const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 购物车数据模型
const ShopCartSchema = new Schema({
  userId: String, // 用户 ID
  goodsId: String, // 商品 ID
  goods_name: String, // 商品名称
  image_path: String, // 商品图片
  present_price: Number, // 商品价格
  mall_price: Number, // 总价
  buy_count: { type: Number, default: 1 }, // 购买数量
  checked: { type: Boolean, default: false }, // 是否选中
  createAt: { type: Number, default: +new Date() } // 创建时间
});

module.exports = mongoose.model('ShopCart', ShopCartSchema);