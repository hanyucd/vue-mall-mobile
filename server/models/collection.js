const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  userId: String, // 用户 ID
  goodsId: String, // 商品 ID
  goods_name: String, // 商品名称
  image_path: String, // 商品图片
  present_price: Number, // 商品价格
  createAt: { type: Number, default: +new Date() } // 创建时间
});

module.exports = mongoose.model('Collection', CollectionSchema);