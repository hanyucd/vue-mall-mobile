const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 商品数据模型
const GoodsSchema = new Schema({
  id: { type: String, unique: true },
  shop_id: String,
  sub_id: String,
  name: String,
  present_price: Number,
  orl_price: Number,
  amount: Number,
  detail: String,
  create_time: String,
  update_time: String,
  image: String,
  image_path: String,
  goods_serlal_number: String
});

module.exports = mongoose.model('Good', GoodsSchema);
